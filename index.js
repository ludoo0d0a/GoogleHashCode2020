import * as cTable from 'console.table'
import * as io from './io.js'
import * as score from './score.js'
import * as utils from './utils.js'

function rnd(){
    return Math.random()<0.5;
}
function sum1(a){
    // return a.ships_day * a.max_score / a.signup 
    return a.nbooks * a.ships_day * a.max_score / Math.pow(a.signup, 2)
}
var run = function(name) {
    var lines = io.readFile(name+'.txt');

    const [nbooks, libraries, maxdays] = lines[0].split(' ').map(Number);
    const libs = [];
    const scores = lines[1].split(' ').map(Number);
    for (let l = 0; l < libraries; l++) {
        const l1 = lines[2+l*2].split(' ').map(Number);
        const l2 = lines[3+l*2].split(' ').map(Number);

        // books / high score first
        // const _l2 = l2.slice(0)
        l2.sort((a,b) => scores[b]-scores[a]);
        // utils.shuffle(l2);
        // l2.sort((b,a) => scores[b]-scores[a]);

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

        // in maxdays, with ships per day, score in range for this lib :
        const n_first_books = lib.books.slice(0,maxdays * lib.ships_day)
        lib.max_score = score.computeScore(n_first_books, scores);

        libs.push(lib)
    }

    libs.sort((a,b) => {
        return sum1(b) - sum1(a);

        // let s = a.signup-b.signup;
        // if (s===0){
        //     // s = b.ships_day - a.ships_day;
        //     s = b.max_score-a.max_score;
        // }
        // return s;
    });
    // utils.shuffle(libs);
    // libs.sort((b,a) => a.signup-b.signup);

    const r = score.sumScore(libs, scores, maxdays);

    const rlines = score.saveOutput(r.libs_signed);
    io.saveFile(name+'.out', rlines);

    console.log('%s : score=%d', name, r.score);
    return r.score;
};

const test_one = false;

function runAll(){
    let score = 0;
    score += run('a_example');
    score += run('b_read_on');   
    score += run('c_incunabula');   
    score += run('d_tough_choices');   
    score += run('e_so_many_books');   
    score += run('f_libraries_of_the_world');   
    console.log('Score total : %d', score);
    return score;
}

if (test_one){
    // run('a_example');
    // run('b_read_on');
    run('c_incunabula');
}else{
    runAll();

    // for (let index = 0; index < 10; index++) {
    //     const score = runAll();
    //     if (score > 21000000){
    //         break;
    //     }
    // }
}