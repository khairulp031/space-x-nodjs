const exitKey = ["out", "quit", "exit", "q", "e", "o"];
const color = require('./colors');
const cleaningInput = (input) => {
    input = input.trim();
    input = input.replace(/\s\s+/g, ' ');
    if (input && input.split(" ").length > 3) return false;
    return input;
}
const padWithZeroes = (number, length = 2) => {
    var s = '' + number;
    while (s.length < length) {
        s = '0' + s;
    }
    return s;
}
const getDateInput = (input) => {
    input = input.split("st").join("");
    input = input.split("nd").join("");
    input = input.split("rd").join("");
    input = input.split("th").join("");
    if (!isNaN(Date.parse(input))) {
        let date = new Date(Date.parse(input));
        if (input.split(" ").length > 2
            || input.split("-").length > 2
            || input.split("/").length > 2) {
            return `${date.getFullYear()}-${padWithZeroes(date.getMonth() + 1)}-${padWithZeroes(date.getDate())}`;
        } else if (
            input.split(" ").length === 2
            || input.split("-").length === 2
            || input.split("/").length === 2
        ) {
            return `${date.getFullYear()}-${padWithZeroes(date.getMonth() + 1)}`;
        } else {
            return `${date.getFullYear()}`;
        }
    } else {
        console.log(`${color.FgRed}%s${color.Reset}`, "Please type a valid command.")
        console.log("");
    }
    return "";
}
const parse = (input) => {
    input = cleaningInput(`${input}`);
    if (!input) return "";

    if (input && !exitKey.includes(input.toLowerCase())) {
        input = getDateInput(input);
    }
    return input;
}

module.exports = {
    parse,
    exitKey,
}