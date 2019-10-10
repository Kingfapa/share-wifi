const Shell = require('node-powershell');

let ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

module.exports = {
    wlan: {
        running: () => {
            ps.addCommand('netsh wlan show hostednetwork')
            ps.invoke().then(output => {
                ps.dispose();
                return output
            }).catch(err => {
                ps.dispose();
                return err;
            });
             
        },
        start: () => {
            return 'start'
        },
        stop: () => {
            return 'stop'
        }
    }
}

function tst() {
}