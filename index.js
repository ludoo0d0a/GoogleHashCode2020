import * as cTable from 'console.table'
import * as io from './io.js'
import * as score from './score.js'

var run = function(name) {
    var lines = io.readFile(name+'.txt');

    const [nbooks, libraries, maxdays] = lines[0].split(' ').map(Number);
    const libs = [];
    const scores = lines[1].split(' ').map(Number);
    for (let l = 0; l < libraries; l++) {
        const l1 = lines[2+l*2].split(' ').map(Number);
        const l2 = lines[3+l*2].split(' ').map(Number);
        const lib = {
            id : l,
            // n books per library
            nbooks : l1[0],
            // time ti sgnup
            signup : l1[1],
            _signup : l1[1],
            // ships per day
            ships_day : l1[2],
            progress: 0,
            books_sent: [],
            books : l2
        }
        libs.push(lib)
    }
    // console.log(JSON.stringify(libs));

    let orderedLibs = libs;
    // TODO

    const r = score.sumScore(orderedLibs, scores, maxdays);

    const rlines = score.saveOutput(r.libs_signed);
    io.saveFile(name+'.out', rlines);

    console.log('%s : score=%d', name, r.score);
    return r.score;
};

// run('a_example');

function runAll(){
    let score = 0;
    score += run('a_example');
    score += run('b_read_on');   
    score += run('c_incunabula');   
    score += run('d_tough_choices');   
    score += run('e_so_many_books');   
    score += run('f_libraries_of_the_world');   
    console.log('Score total : %d', score);
}
runAll();