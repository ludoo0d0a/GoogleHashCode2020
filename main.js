import combineWithoutRepetitions from './combinations/combineWithoutRepetitions.js';
import fs from 'fs';
import * as cTable from 'console.table'

var content = fs.readFileSync('data/a_example.in', 'utf8');
var lines = content.split('\n');
// maximum number of pizza slices to order
// number of different types of pizza
const [maxslices, pizza_types] = lines[0].split(' ').map(Number);
const slices = lines[1].split(' ').map(Number).sort((a,b) => b-a);
console.log(slices);
const r = { slices }

var run = function() {
    let r = permute(slices, 0);
    console.table(r)
};

function permute(S, i) {
    let sum = S[i];
    for (let j = i+1; j < S.length; j++) {
        const el = S[j];
        sum +=
    }
}

run();