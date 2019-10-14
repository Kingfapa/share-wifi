const { wlan } = require('./wifi');
var wifi = require("node-wifi");

async function hej() {
    console.log(await wlan.running());
    
}

hej();