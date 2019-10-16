// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { wlan, ethernet, network } = require('./wifi');
const $ = require('jquery');
const popper = require('popper.js');
const bootstrap = require('bootstrap');

//Start Window Controls
require('./window-control')();

async function hej() {
    //console.log(await wlan.running()); 
    const adapters = await network.getPhysicalAdapters();
    const obj_adapters = JSON.parse(adapters);
    console.log(obj_adapters)
    
}
var el = $('#text');

console.log(el)

$(document).ready(function(){
    $("#msgid").html("This is Hello World by JQuery");
});