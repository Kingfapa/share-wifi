const { wlan } = require('./share-wifi')
wlan.running().then(output => {
    console.log(output);
})