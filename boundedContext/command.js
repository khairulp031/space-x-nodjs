const readline = require('readline');
const os = require('os');
const path = require('path');
const color = require('./colors');
const { parse } = require('./parse');

let appDir = path.dirname(require.main.filename);
appDir = appDir.split("/")
appDir = appDir[appDir.length - 1];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const msg = `
Please type exit or quit or out to exit.
Please type your command to query the data.
Example:
starlinks launched in year 2019, just type: 2019
starlinks launched on May 5th 2019, just type: May 5th 2019
starlinks launched in June 2020, just type: June 2020
`;
const msgCommand = `[SpaceX-API:${os.hostname()}:${appDir} ${os.userInfo().username}]>`;

const getInput = () => {
    console.log(`${color.FgGreen}%s${color.Reset}`, msg);
    return new Promise((resolve, reject) => {
        rl.question(msgCommand, (input) => {
            resolve(parse(input));
        });
    });
}

const closeInput = () => rl.close();

module.exports = {
    getInput,
    closeInput
}