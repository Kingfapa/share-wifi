// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

require('./source/js/titlebar');
require('./source/js/libraries');

//json2html
require('node-json2html');

const $ = require('jquery');
const { wlan, ethernet, network } = require('./source/js/wifi');
const templates = require('./source/js/templates') //for json2html

network.getPhysicalAdapters().then(res => {
    const adapters = JSON.parse(res);
    console.log(adapters)
    const parent = $('#main');
    /*let html = `<h1>Choose adapter</h1>
    <div class="list-group">`
    console.log(json2html.transform(adapters, adapterTemplate));
    parent.html(html)*/
    
    const adapter = json2html.transform(adapters, templates.adapterTemplate);
    const list = json2html.transform(adapters, templates.netAdapterTemplate)
    console.log(adapter)
    console.log(list)
})

