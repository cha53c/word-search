import Grid from "./grid";


const wordLocations = [[0, 1, 2], [2, 5, 8]];
const rows = 3, columns = 3;
const words = ["fox"];
const removeDuplicates = (array) => [...new Set(array)];
const flatten = (array) => array.reduce((prev, curr) => prev.concat(curr))
const locationIndexes = removeDuplicates(flatten(wordLocations));


const gridSetup = {
    getWords: () => words,
    getGrid: () => Grid.createBlankGrid(rows, columns).populateWords(words).fillBlanks().grid,
    getWordLocations: () => wordLocations,
};

export default gridSetup;