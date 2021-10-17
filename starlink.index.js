const clipboardy = require('clipboardy');
const { getStarLink, createIndex } = require('./boundedContext/starlink');
const { getInput, closeInput, } = require('./boundedContext/command');
const { exitKey } = require('./boundedContext/parse');
const color = require('./boundedContext/colors');
(async () => {
    console.log(`${color.FgRed}%s${color.Reset}`, 'Welcome to Starlink satellites SpaceX-API');
    console.log(`${color.FgGreen}%s${color.Reset}`, 'Preparing the data...');
    const data = await getStarLink();
    console.log(`${color.FgGreen}%s${color.Reset}`, 'Creating index...');
    const { ByYear, ByMonthYear, ByDayMonthYear } = createIndex(data);
    console.log(`${color.FgGreen}%s${color.Reset}`, 'Starlink satellites SpaceX data is ready and indexed.');

    let input;
    while (!input || !exitKey.includes(input.toLowerCase())) {
        input = await getInput();
        if (input && !exitKey.includes(input.toLowerCase())) {
            let data;
            if (input.split("-").length > 2) {
                data = ByDayMonthYear[input];
            } else if (input.split("-").length === 2) {
                data = ByMonthYear[input];
            } else {
                data = ByYear[input];
            }
            console.log("");
            if (data && data.length) {
                console.log(`${color.FgGreen}%s${color.Reset}`, JSON.stringify(data));
                clipboardy.writeSync(JSON.stringify(data));
                console.log("");
                console.log(`${color.FgBlue}%s${color.Reset}`, `There are ${data.length} records found.`);
                console.log(`${color.FgGreen}%s${color.Reset}`, `We have copied the data to the clipboard, you can paste the data to http://jsonviewer.stack.hu/.`);
            } else {
                console.log(`${color.FgRed}%s${color.Reset}`, "No data found!");
            }
            console.log("");
        }
        if (input && exitKey.includes(input.toLowerCase())) {
            console.log(`${color.FgRed}%s${color.Reset}`, 'You are about to leave the Starlink satellites SpaceX-API.');
            console.log(`${color.FgBlue}%s${color.Reset}`, 'Thank you very much...');
        }
    }
    closeInput();
})();