const utils = {
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
    toggleLetterSelection: (id, selectedLetters) => {
        let updatedSelection = selectedLetters
        if (selectedLetters.includes(id)) {
            updatedSelection = selectedLetters.filter((e) => e !== id);
        } else {
            updatedSelection.push(id);
        }
        return updatedSelection;
    }
};


export default utils;