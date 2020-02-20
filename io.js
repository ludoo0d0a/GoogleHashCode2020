import fs from 'fs';

export function saveFile(name, out){
    // let out = [];
    // out.push(rs.sum)
    // out.push(rs.s.join(' '))
    fs.writeFileSync('out/'+name, out.join('\n'))
}

export function readFile(name){
    var content = fs.readFileSync('data/'+name, 'utf8');
    var lines = content.split('\n');
    return lines;
}
