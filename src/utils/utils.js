const utils = {
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
    toggleLetterSelection: (id, selectedLetters) => {   if (selectedLetters.includes(id)) {
        selectedLetters.pop(id);
    } else {
        selectedLetters.push(id);
    }
    return selectedLetters;}
};

export default utils;