import utils from "./utils";

const populateGridUtils = {
    currentRow: (position, rows) => rows - (utils.integerDivision(position, rows) + 1),
    // TODO shuffle
    getRandomLocations: size => utils.shuffle([...Array(size).keys()]),
}

export default populateGridUtils;