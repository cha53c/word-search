const matching = {
    isMatch: (actual, selected) =>
        JSON.stringify([...selected].sort()) === JSON.stringify([...actual].sort()),

};

export default matching;