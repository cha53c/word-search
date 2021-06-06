import utils from "./utils";

const populateGridUtils = {
    currentRow: (position, columns) => (utils.integerDivision(position, columns) + 1),
    // TODO shuffle
    getRandomLocations: size => utils.shuffle([...Array(size).keys()]),
}

export default populateGridUtils;