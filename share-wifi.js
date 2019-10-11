const Shell = require('node-powershell');

let ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

module.exports = {
    wlan: {
        running: () => {
            return exec('echo hej', (err, stdout, stderr) => {
                if (err) return;
                return stdout
                //console.log('stderr:', stderr)
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

async function tst() {
    ps.addCommand('netsh wlan show hostednetwork')
    return ps.invoke().then(output => {
        return output
    }).catch(err => {
        return err
    }).finally(output => {
        console.log('Done')
        ps.dispose();
    });
}