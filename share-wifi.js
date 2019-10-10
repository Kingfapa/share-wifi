const Shell = require('node-powershell');

module.exports = {
    test: function () {
        const ps = new Shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });

        ps.addCommand('echo node-powershell');
        ps.invoke()
            .then(output => {
                console.log(output);
            })
            .catch(err => {
                console.log(err);
            });
    }

}
