/** Command-line tool to generate Markov text. */
const markov = require('./markov.js');
const axios = require('axios');
const fs = require('fs');

if (process.argv[2]=='file'){
    readFile(process.argv[3]);
} else if (process.argv[2] == 'url'){
    readUrl(process.argv[3]);
} else {
    console.error(`Bad request: Please review parameters and try again.`)
}

function readFile(path){
    let contents = fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(`FINAL OUTPUT: ${generateText(data)}`);
        }
    })
}

async function readUrl(url){
    try{
        const response = await axios.get(url);
        // console.log(`response data: ${response.data}`);
        console.log(`FINAL OUTPUT: ${generateText(response.data)}`);
    }catch (err){
        console.error(`Error fetching ${url}: ${err}`)
    }
}

function generateText(data){
    let markovTxt = new markov.MarkovMachine(data)
    return markovTxt.makeText();
}