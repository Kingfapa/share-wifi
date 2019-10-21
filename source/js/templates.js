module.exports = {
    adapterTemplate: {
        '<>': 'a',
        'href': '#',
        'class': 'list-group-item list-group-item-action',
        'html': '${Name}'
    },
    netAdapterTemplate: {
        '<>': 'div',
        'class': 'list-group',
        'html': (data) => {
            return ( json2html.transform(data, module.exports.adapterTemplate) );
        },
    }

}