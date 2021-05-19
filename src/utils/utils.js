const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
const utils = {
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
    flatten: array => array.reduce((acc, curr) => acc.concat(curr.location), []),
    removeDuplicates: array => [...new Set(array)],
    toggleLetterSelection: (id, selectedLetters) => {
        let updatedSelection = Array.from(selectedLetters);
        if (selectedLetters.includes(id)) {
            updatedSelection = selectedLetters.filter((e) => e !== id);
        } else {
            updatedSelection.push(id);
        }
        return updatedSelection;
    },
    randomLetter: () => alphabet[Math.floor(Math.random() * alphabet.length)]
};


export default utils;