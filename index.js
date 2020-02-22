import * as cTable from 'console.table'
import * as io from './io.js'
import * as score from './score.js'
import * as utils from './utils.js'

const STEP = 0.5;
const START = -2; // -2;
const END = 2; // 2;
const DEFAULT_OPTS = {
        max_score:1,
        nbooks:1,
        ships_day:1,
        signup:2
    }
var runLast = function(name) {
    let opts = DEFAULT_OPTS;
    // opts = io.readJson('options/'+name+'.json')
    if (!opts){ opts = DEFAULT_OPTS }
    const score = runOpts(name, opts);
    console.log('%s : score=%d', name, score);
    return score;
}
var runHack = function(name) {
    let opts = {
        max_score:-2,
        nbooks:-2,
        ships_day:-2,
        signup:-2
    }
    let max_opts;
    let max_score = 0;
    for (let i = START; i < END; i+=STEP) {
        opts.max_score=i
        io.log('i='+i)
        for (let j = START; j < END; j+=STEP) {
            opts.nbooks=j
            io.log(name+'i='+i+' j='+j)
            for (let k = START; k < END; k+=STEP) {
                opts.ships_day=k
                io.log(name+'i='+i+' j='+j+' k='+k)
                for (let l = START; l < END; l+=STEP) {
                    opts.signup=l
                    // io.log(name+'    l='+l)
                    let score = runOpts(name, opts)
                    if (score>max_score){
                        //save opts + score
                        max_opts = Object.assign({}, opts);
                        max_score = score;
                        max_opts._score=max_score;
                        console.log('New max score : '+score)
                        console.log('    opts : '+JSON.stringify(max_opts))
                    }
                }
            }
        }
    }

    // re-run to get files
    let _score = runOpts(name, max_opts)

    console.log(' ==== '+name);
    console.log('Final Max score : '+max_score)
    console.log('opts : '+JSON.stringify(max_opts))
    io.saveAsjson('options/'+name+'.json', max_opts)
    return max_score;    
}

var runOpts = function(name, opts) {
    function diffsum1(a,b){
        return sum1(b) - sum1(a)
    }
    function sum1(a){
        // return a.ships_day * a.max_score / a.signup 
        // return a.max_score * a.nbooks * a.ships_day / Math.pow(a.signup, 2)
        return Math.pow(a.max_score, opts.max_score) * Math.pow(a.nbooks, opts.nbooks) * Math.pow(a.ships_day, opts.ships_day) * Math.pow(a.signup, opts.signup)
    }
    function diffsum2(a,b){
        let s = a.signup-b.signup;
        if (s===0){
            // s = b.ships_day - a.ships_day;
            s = b.max_score-a.max_score;
        }
        return s;
    }
    const diffsum=diffsum1;

    var lines = io.readFile(name+'.txt');

    const [nbooks, libraries, maxdays] = lines[0].split(' ').map(Number);
    const libs = [];
    const scores = lines[1].split(' ').map(Number);
    for (let l = 0; l < libraries; l++) {
        const l1 = lines[2+l*2].split(' ').map(Number);
        const l2 = lines[3+l*2].split(' ').map(Number);
        // books / high score first
        l2.sort((a,b) => scores[b]-scores[a]);
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
        score.computeMaxScore(lib, scores, maxdays);
        libs.push(lib)
    }

    libs.sort(diffsum);
    const r = score.sumScore(libs, scores, maxdays);
    const rlines = score.saveOutput(r.libs_signed);
    io.saveFile(name+'.out', rlines);

    // console.log('%s : score=%d', name, r.score);
    return r.score;
};

const test_one = true; // one single run
const try_hack = true; // hack brute force ?

const run = try_hack ? runHack : runLast; // Use brute force

function runAll(){
    let score = 0;
    score += run('a_example');   // 21
    score += run('b_read_on');   // 5822900
    score += run('c_incunabula');    // 5645747
    score += run('d_tough_choices');   // 4815395 
    score += run('e_so_many_books');   // 4180700
    score += run('f_libraries_of_the_world');   // 5288138
    console.log('Score total : %d', score);
    return score;
}

if (test_one){
    // run('a_example'); 
    // run('b_read_on'); 
    // run('c_incunabula');
    run('d_tough_choices'); 
}else{
    runAll();

    // for (let index = 0; index < 10; index++) {
    //     const score = runAll();
    //     if (score > 21000000){
    //         break;
    //     }
    // }
}