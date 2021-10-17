const request = require('request');

const transform = async (launch) =>
    new Promise(async (resolve) => {
        launch.failures = launch.failures.map(failure => failure.reason)
        resolve(launch)
    })
const reduceNoFailure = (array, launch) => {
    if (launch.failures && launch.failures.length) array.push(launch);
    return array;
};
const getAllFailures = (data) => Promise.all(data.launches.reduce(reduceNoFailure, []).map(launch => transform(launch)))

const getFailedLaunches = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) return resolve('"id" is required argument');
        request.post({
            url: 'https://api.spacexdata.com/v4/launchpads/query',
            json: {
                query: {
                    _id: `${id}`
                },
                options: {
                    select: "_id name launches",
                    populate: [
                        {
                            path: "launches",
                            model: "Launch",
                            select: "-_id name failures"
                        }
                    ]
                }
            }
        }, async (err, httpResponse, body) => {
            if (body && body.totalDocs) {
                body = body.docs[0];
                return resolve({
                    launchpad: body.name,
                    all_failures: await getAllFailures(body)
                });
            }
            resolve(body);
        });
    });
}

module.exports = {
    getFailedLaunches
}