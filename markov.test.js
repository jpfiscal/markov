const markov = require('./markov.js');
let markovTxt
beforeAll(function(){
    markovTxt = new markov.MarkovMachine('The cat in the hat');
});

test('Test length of makeText output', function(){
    const smallTxt = markovTxt.makeText(3).split(/[ \r\n]+/);
    expect(smallTxt.length).toBeLessThanOrEqual(3);
});