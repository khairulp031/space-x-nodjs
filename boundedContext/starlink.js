const request = require('request');
const color = require('./colors');
const filterKey = 'LAUNCH_DATE';

const getStarLink = () => {
    return new Promise((resolve) => {
        request.get({
            url: 'https://api.spacexdata.com/v4/starlink',
        }, async (err, httpResponse, body) => {
            resolve(body);
        });
    });
}
const reduceByDayMonthYear = (object, element) => {
    if (element.spaceTrack
        && element.spaceTrack[filterKey]
        && element.spaceTrack[filterKey].length) {
        const date = element.spaceTrack[filterKey];
        if (!object[date]) {
            object[date] = [];
        }
        object[date].push(element);
    }
    return object;
};
const reduceByMonthYear = (object, element) => {
    if (element.spaceTrack
        && element.spaceTrack[filterKey]
        && element.spaceTrack[filterKey].length) {
        const date = element.spaceTrack[filterKey];
        let monthYear = date.split("-");
        monthYear = `${monthYear[0]}-${monthYear[1]}`;        
        if (!object[monthYear]) {
            object[monthYear] = [];
        }
        object[monthYear].push(element);
    }
    return object;
};
const reduceByYear = (object, element) => {
    if (element.spaceTrack
        && element.spaceTrack[filterKey]
        && element.spaceTrack[filterKey].length) {
        const date = element.spaceTrack[filterKey];
        let year = date.split("-");
        year = `${year[0]}`;
        if (!object[year]) {
            object[year] = [];
        }
        object[year].push(element);
    }
    return object;
};
const createIndex = (data) => {
    let array = [];
    try {
        array = JSON.parse(data);
    } catch (e) {
        array = [];
    }
    console.log(
        `${color.FgGreen}%s${color.Reset}`,
        'Data collected, there are',
        `${color.FgBlue}`,
        `${array.length}`,
        `${color.FgGreen}`,
        'records.'
    );

    const ByYear = array.reduce(reduceByYear, {});
    const ByMonthYear = array.reduce(reduceByMonthYear, {});
    const ByDayMonthYear = array.reduce(reduceByDayMonthYear, {});

    console.log(
        `${color.FgGreen}%s${color.Reset}`,
        'There are ',
        `${color.FgBlue}`,
        `${Object.keys(ByYear).length}`,
        `${color.FgGreen}`,
        ' indexes group by Year.'
    );
    console.log(
        `${color.FgGreen}%s${color.Reset}`,
        'There are ',
        `${color.FgBlue}`,
        `${Object.keys(ByMonthYear).length}`,
        `${color.FgGreen}`,
        'indexes group by Month and Year.'
    );
    console.log(
        `${color.FgGreen}%s${color.Reset}`,
        'There are ',
        `${color.FgBlue}`,
        `${Object.keys(ByDayMonthYear).length}`,
        `${color.FgGreen}`,
        'indexes group by Day and Month and Year.'
    );
    console.log(`${color.Reset}`, '');
    return { ByYear, ByMonthYear, ByDayMonthYear };
}

module.exports = {
    getStarLink,
    createIndex,
    reduceByDayMonthYear,
    reduceByMonthYear,
    reduceByYear
}