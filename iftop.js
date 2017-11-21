// Imports
const config = require('./config.json');
const child = require('child_process');
const { Elastic } = require('./elastic');
const { File } = require('./file');

exports.Iftop = class {

    constructor() {
        this.connections = [];
        this.file = new File(config.data.keep);
        this.execute = child.exec('iftop -i ' + config.iftop.interface + ' -t -n -s 40 > ' + this.file.file)
        this.execute.on('close', this.close);
    }

    model() {

    }

    intern() {

    }

    close(code) {

        if(code != 0) {
            console.error('iftop has stopped unexpectidly on code : ' + code);
            process.exit(code);
        }
        console.log(this.file.getConnections());

        // Send to Elastic search
        const elastic = new Elastic(this);

        // Delete raw data?
        if (!config.data.keep)
            this.file.remove();
    }

};

