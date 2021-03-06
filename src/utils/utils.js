const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
const MATCHED = 'matched';
const CANDIDATE = 'candidate';
const AVAILABLE = 'available';

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
    letterStatus: (number, selectedLetters, matchedLetters) => {
        const selected = selectedLetters.includes(number);
        const matched = matchedLetters.includes(number);
        if (selected) {
            return CANDIDATE
        }
        if (matched && !selected) {
            return MATCHED;
        }
        return AVAILABLE
    },
    randomLetter: () => alphabet[Math.floor(Math.random() * alphabet.length)],
    integerDivision: (numerator, denominator) => Math.floor(numerator/denominator),
    //TODO write unit tests
    shuffle: (unshuffled) => unshuffled
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value),
};


export default utils;