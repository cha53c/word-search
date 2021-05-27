import utils from "./utils";

const populateGridUtils = {
    currentRow: (position, rows) => rows - (utils.integerDivision(position, rows) + 1),
}

export default populateGridUtils;