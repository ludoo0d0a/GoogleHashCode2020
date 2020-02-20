
export function sumScore(libs, scores, maxdays){
    
    let days = Array(maxdays).fill(0);
    let curlib = 0; //lib in signup
    let libs_signed = [];
    let sumbooks = {}; // id des books a compté / eviter duplicates
    for (let d = 0; d < maxdays; d++) {
        let lib_in_signup = libs[curlib];
        if (lib_in_signup){
            // No more library to signup
            --lib_in_signup.signup;
        }else{
            // console.log("No more lib")
        }

        // for a day d
        libs_signed.forEach(lib => {
            // "nbooks":5,"signup":2,"ships_day":2,"books":[0,1,2,3,4]}
            // stack lib.ships_day books for this day

            if (lib.books.length>0){
                for (let b = 0; b < lib.ships_day; b++) {
                    // Remove first
                    if (lib.books.length>0){
                        const book = lib.books.shift();
                        sumbooks[book]=1;
                        lib.books_sent.push(book);
                    }
                }
            }
        })

       if (lib_in_signup && lib_in_signup.signup==0){
            libs_signed.push(lib_in_signup);
            // Go next lib, next tick
            ++curlib;
        }
    }

    // let score = 0;  
    // Object.keys(sumbooks).map(idbook => {
    //     score+=scores[Number(idbook)]
    // })

    let score = computeScore(Object.keys(sumbooks), scores);
    return {
        libs_signed,
        score
    };
}

export function computeScore(idbooks, scores){
    let score = 0;  
    idbooks.map(idbook => {
        score+=scores[Number(idbook)]
    })
    return score;
}

export function saveOutput(libs_signed){
    let lines = [];
    lines.push(libs_signed.length);
    libs_signed.forEach(lib => {
        lines.push(lib.id+' '+lib.books_sent.length);
        lines.push(lib.books_sent.join(' '));
    })
    return lines;
}