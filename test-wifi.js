var path = require('path')
var child_process = require('child_process');

function getPowershell() {
    if (this.arch === 'x64' && process.arch === 'ia32')
        return path.join(process.env.windir, 'sysnative/WindowsPowerShell/v1.0/powershell.exe');
    else
        return path.join(process.env.windir, 'System32/WindowsPowerShell/v1.0/powershell.exe');
}





async function exec(args, options = {
    env: {}
}) {
    return new Promise((resolve, reject) => {
        options.env = _.defaultsDeep(options.env, process.env);
        child_process.exec(args, options, (stderr, stdout, code) => {
            if (code) {
                var cmd = Array.isArray(args) ? args.join(' ') : args;
                console.log(cmd + ' returned non zero exit code. Stderr: ' + stderr);
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

function test(args, options = {
    env: {}
}) {
    child_process.exec(args, options, (stderr, stdout, code) => {
        if(code) {
            var cmd = Array.isArray(args) ? args.join(' ') : args;
            console.log(cmd + ' returned non zero exit code. Stderr: ' + stderr);
        } else {
            return stdout;
        }
        
    })
}

console.log(test('netsh wlan show hostednetwork'));