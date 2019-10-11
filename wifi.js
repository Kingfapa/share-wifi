const { exec } = require('child_process');
const Shell = require('node-powershell');

let ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
});


module.exports = {
    wlan: {
        running: () => {
            /*exec('echo hej', (err, stdout, stderr) => {
                if (err) return;
                return stdout
                //console.log('stderr:', stderr)
            })*/
            return new Promise((resolve, reject) => {
                ps.addCommand('netsh wlan show hostednetwork')
                
                ps.invoke().then(output => {
                    ps.dispose();
                    resolve(output);
                }).catch(err => {
                    resolve(err);
                    ps.dispose();
                }).finally(_ => {
                    ps.dispose();
                })
                /*exec('netsh wlan show hostednetwork', (err, stdout, stderr) => {
                    if (err) reject(err);
                    console.log(stdout.split('\n')[11])
                    resolve('resolved');
                })*/
            })
        },
        start: () => {
            return 'start'
        },
        stop: () => {
            return 'stop'
        }
    }
}