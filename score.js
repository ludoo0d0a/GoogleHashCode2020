export function computeMaxScores(libs, scores, maxdays, day, sumbooks){
    libs.forEach(lib => {
        computeMaxScore(lib, scores, maxdays, day, sumbooks);
    })
}
export function sortBooks(books, scores, sumbooks){
    books.sort((a,b) => {
        // Books already counted are moved at the end
        if (sumbooks[a]) return -1
        if (sumbooks[b]) return 1
        return scores[b]-scores[a]
    });
}
export function computeMaxScore(lib, scores, maxdays, day, sumbooks){
    sortBooks(lib.books, scores, sumbooks)
    const next_books = lib.books.slice(0, (maxdays - lib.signup - day) * lib.ships_day)
    lib.max_score = computeScore(next_books, scores);
}
export function computeScore(idbooks, scores){
    let score = 0;  
    idbooks.map(idbook => {
        score+=scores[idbook]
        // score+=scores[Number(idbook)]
    })
    return score;
}
export function sumScore(libs, scores, maxdays, diffsum){
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
                // recompute score + sort for available slots
                // computeMaxScores(libs, scores, maxdays, d, sumbooks)
                // libs.sort(diffsum);
                lib_in_signup = libs.shift();
            }else{
                lib_in_signup = null;
            }

        }
    }

    let score = computeScore(getIds(sumbooks), scores);
    return {
        libs_signed,
        score
    };
}

function getIds(books){
    return Object.keys(books).map(Number);
}

export function saveOutput(libs_signed){
    let lines = [];
    // filter lib empty
    libs_signed=libs_signed.filter(lib => lib.books_sent.length>0);

    lines.push(libs_signed.length);
    libs_signed.forEach(lib => {
        if (lib.books_sent.length>0){
            lines.push(lib.id+' '+lib.books_sent.length);
            lines.push(lib.books_sent.join(' '));
        }
    })
    return lines;
}