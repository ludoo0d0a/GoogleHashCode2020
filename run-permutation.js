import combineWithoutRepetitions from './sets/combinations/combineWithoutRepetitions.js';
import permutateWithoutRepetitions from './sets/permutations/permutateWithoutRepetitions.js';
import permutateWithoutRepetitions2 from './sets/permutations/permutateWithoutRepetitions2.js';
import fs from 'fs';
import * as cTable from 'console.table'

var run = function() {
    let r = combineWithoutRepetitions(['A', 'B', 'C'], 2)
    console.table(r)
};
run();

var content = fs.readFileSync('data/a_example.in', 'utf8');
var lines = content.split('\n');
// maximum number of pizza slices to order
// number of different types of pizza
const [maxslices, pizza_types] = lines[0].split(' ').map(Number);
const slices = lines[1].split(' ').map(Number).sort((a,b) => b-a);
let rc = combineWithoutRepetitions(slices, slices.length)
console.table(rc)

function sum(p, c) {
    return p + c;
}

function sumArray(r){
    const s = r.reduce(sum)[0];
    console.table('sum='+s, r);
    return s;
}
// let rp = permutateWithoutRepetitions(slices)
// console.log('%d permutations:', rp.length)
// console.table(rp)
const stopConditionFn = function(smallerPermutations){
    if (sumArray(smallerPermutations)==maxslices){
        // stop iterate now
        return true;
    }
    return false;
}
let rp = permutateWithoutRepetitions2(slices, stopConditionFn)
console.log('%d permutations:', rp.length)
console.table(rp)