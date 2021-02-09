import utils from "./utils";
import gridUtils from "./gridUtils";

const wordLocations = [[0, 1, 2], [2, 5, 8]];
const grid = ['F', 'O', 'X', 'I', 'M', 'O', 'G', 'F', 'B'];
// const reduceLocations = (wordLocations) => wordLocations.reduce((prev, curr) => prev.concat(curr));
// const populateGrid = () => new Array(9).fill('-').map( (e,i) => reduceLocations(wordLocations).contains(i) ? e : utils.randomLetter() );

const gridSetup = {
    getWords: () => ["fox", "box"],
    getGrid: () => gridUtils.populateGrid(),
    getWordLocations: () => wordLocations,

};

export default gridSetup;