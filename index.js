const child_process = require('child_process');
const fs = require('fs');

const argumento = process.argv.slice(2);

let nombreArchivo = argumento[0];
let extension = argumento[1];
let indicador = argumento[2];
let cantidad = Number(argumento[3]);

function cambioMoneda() {
    return new Promise((resolve) => {
        child_process.exec(`node child.js ${nombreArchivo} ${extension} ${indicador} ${cantidad}`, (err, resultado) => {
            resolve(resultado);
        });
    });
}

cambioMoneda().then((resultado) => {
    fs.readFile(`${nombreArchivo}.${extension}`, 'utf8', (err, data) => {
        console.log(data);
    });
});