const { exec } = require('child_process');
const Shell = require('node-powershell');

let ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: false,
    inputEncoding: 'utf8',
    outputEncoding: 'utf8'
});
ps.addCommand('[Console]::InputEncoding = [System.Text.Encoding]::UTF8');
ps.addCommand('[Console]::OutputEncoding = [System.Text.Encoding]::UTF8');

module.exports = {
    wlan: {
        running: () => {
            ps.addCommand("netsh wlan show hostednetwork | ConvertTo-Json -Compress");
            return ps.invoke()
                .then(output => {
                    return convertOutput(JSON.parse(output));
                })
                .catch(err => {
                    throw err
                })
                .finally(_ => {
                    ps.dispose();
                })
        },
        start: () => {
            
            ps.addCommand("netsh wlan start hostednetwork");
            return defaultInvoke()
        },
        stop: () => {
            ps.addCommand("netsh wlan stop hostednetwork");
            return defaultInvoke()
        }
    },
    ethernet: {
        connected: () => {
            var network = "Anslutning till lokalt nätverk"
            ps.addCommand('Get-WmiObject -Class win32_networkadapter -filter "netconnectionid = '+ network +'" | select netconnectionid')
            return defaultInvoke();
        }
    },
    network: {
        getPhysicalAdapters: async () => {
            ps.addCommand(`Get-WmiObject -Class win32_networkadapter -Filter "PhysicalAdapter = 'True'" | ConvertTo-Json -Compress`)
            return await defaultInvoke();
        },
        statusConverter: (status) => {
            switch(status) {
                case 2:
                    return 'Connected'
                case 7:
                    return 'Not connected'
                default:
                    return status
            }
        }
    }
}

function jsonInvoke() {
    return ps.invoke()
        .then(output => {
            return JSON.parse(output);
        })
        .catch(err => {
            throw err
        })
        .finally(_ => {
            ps.dispose();
        })
}

function defaultInvoke() {
    return ps.invoke()
        .then(output => {
            return output
        })
        .catch(err => {
            throw err
        })
        .finally(_ => {
            ps.dispose();
        })
}

function convertOutput(array) {
    var filtered = array.filter(function (value, index, arr) {
        return value

    });
    var list = filtered.map(val => {
        return val.replace(/\s\s\s*/gm, ''); ///\s\s\s*/gm
    })

    var hostednetwork = {
        settings: {
            mode: 2,
            ssid: 3,
            max_clients: 4,
            auth: 5,
            encryption: 6
        },
        state: {
            status: 9,
            bssid: 10,
            radiotype: 11,
            channel: 12,
            connected_clients: 13
        }
    }
    for (var prop in hostednetwork) {
        for (var x in hostednetwork[prop]) {
            for (var i = 0; i < list.length; i++) {
                if (hostednetwork[prop][x] == i) {
                    current = list[i];
                    val = current.replace(/^.*?:/gm, '').replace(/\s/gm, '');
                    hostednetwork[prop][x] = val
                }
            }
        }
    }
    return hostednetwork;
}