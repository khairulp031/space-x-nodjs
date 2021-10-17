const { getFailedLaunches } = require('./boundedContext/launchpads');
(async () => {
    let data = await getFailedLaunches('5e9e4502f5090995de566f86');
    console.log('Failed Launches', JSON.stringify(data));
})();
