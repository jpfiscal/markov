/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    //Create an array of unique words in the string
    let uniqueWords = [];
    for (let i=0; i < this.words.length; i++){
      if (!uniqueWords.includes(this.words[i])){
        uniqueWords.push(this.words[i]);
      }
    }
    // console.log(`unique words: ${uniqueWords}`);
    //populate the chain object
    for (let i=0; i < uniqueWords.length; i++){
      let arr = [];
      for (let j=0; j< this.words.length-1; j++){
        if (uniqueWords[i] == this.words[j] && !arr.includes(this.words[j+1])){
          arr.push(this.words[j+1]);
        }
      }
      this.chain[uniqueWords[i]] = arr;
    }
  }
  //Returns random number based on the array
  choice(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let newString = [];
    let keys = Object.keys(this.chain);
    let key = this.choice(keys).toLowerCase();

    while(newString.length < numWords){
      newString.push(key);
      if (this.chain[key].length == 0){
        break;
      }else{
        key = this.choice(this.chain[key]);
      }
    }
    return newString.join(" ");
  }
}

module.exports = {MarkovMachine};