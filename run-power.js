import combineWithoutRepetitions from './sets/combinations/combineWithoutRepetitions.js';
import permutateWithoutRepetitions from './sets/permutations/permutateWithoutRepetitions.js';
import permutateWithoutRepetitions2 from './sets/permutations/permutateWithoutRepetitions2.js';
import btwPowerSet from './sets/power-set/btPowerSet.js';
import bwPowerSet from './sets/power-set/bwPowerSet.js';
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

let rp = bwPowerSet(slices)
console.log('%d bwPowerSet:', rp.length)
console.table(rp)

let r = rp.map(s => {
    return {
        s:s, 
        sum:sumArray(s)
    }
})

r  =r.filter(o => o.sum<=maxslices).sort((a,b)=> b.sum - a.sum)
// console.table(r)
console.table(r[0])

let rs = r[0];

let out = [];
out.push(rs.sum)
out.push(rs.s.join(' '))
fs.writeFileSync('out/a.out', out.join('\n'))


function sum(p, c) {
    return p + c;
}

function sumArray(r){
    if (r.length==0) return 0;
    const s = r.reduce(sum);
    // console.table('sum='+s, r);
    return s;
}
