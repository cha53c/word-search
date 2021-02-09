import utils from "./utils";

const wordLocations = [[0, 1, 2], [2, 5, 8]];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
const locationIndexes = removeDuplicates(flatten(wordLocations));
let grid;
const gridUtils = {
    populateGrid: () => new Array(9)
        .fill('-')
        .map((e, i) => locationIndexes.includes(i) ? e : utils.randomLetter())

}

export default gridUtils;