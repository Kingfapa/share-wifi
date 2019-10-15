// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { wlan, ethernet, network } = require('./wifi');
let $ = require('jquery');
require('popper.js');
require('bootstrap');

async function hej() {
    //console.log(await wlan.running()); 
    const adapters = await network.getPhysicalAdapters();
    const obj_adapters = JSON.parse(adapters);
    console.log(obj_adapters)
    
}
var el = $('#text');

console.log(el)