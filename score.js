export function computeMaxScores(libs, scores, maxdays){
    libs.forEach(lib => {
        computeMaxScore(lib);
    })
}
export function computeMaxScore(lib, scores, maxdays){
    // const n_first_books = lib.books.slice(0, (maxdays - lib.ships_day) * lib.ships_day)
    const n_first_books = lib.books.slice(0, maxdays * lib.ships_day)
    lib.max_score = computeScore(n_first_books, scores);
}
export function sumScore(libs, scores, maxdays){
    
    let days = Array(maxdays).fill(0);
    let lib_in_signup = libs.shift();
    let libs_signed = [];
    let sumbooks = {}; // id des books a compté / eviter duplicates
    for (let d = 0; d < maxdays; d++) {
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
            if (libs.length>0){
                lib_in_signup = libs.shift();
            }else{
                lib_in_signup = null;
            }

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