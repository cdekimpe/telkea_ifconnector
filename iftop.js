// Imports
const config = require('./config.json');
const child = require('child_process');
const { Elastic } = require('./elastic');
const { Datafile } = require('./datafile');

exports.Iftop = class {

    constructor() {
        this.connections = [];
        this.datafile = new Datafile();
        this.execute = child.exec('iftop -i ' + config.iftop.interface + ' -t -n -s ' + config.iftop.duration + ' > ' + this.file.file)
        this.execute.on('close', this.close);
    }

    intern() {

    }

    close(code) {

        if(code != 0) {
            console.error('iftop has stopped unexpectidly on code : ' + code);
            process.exit(code);
        }

        console.log(this.datafile.getConnections());
        process.exit(0);

        // Send to Elastic search
        const elastic = new Elastic(this);

        // Delete raw data?
        if (!config.data.keep)
            this.file.remove();
    }

};

