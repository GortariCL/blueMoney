const https = require('https');
const fs = require('fs');
const { text } = require('node:stream/consumers');

const argumento = process.argv.slice(2);

let nombreArchivo = argumento[0];
let extension = argumento[1];
let indicador = argumento[2];
let cantidad = Number(argumento[3]);
let fecha = new Date();

https.get('https://mindicador.cl/api', (resp) => {
    let data = '';
    resp.on('data', function (respuestaDatos) {
        data += respuestaDatos;
        // data = data + respuestaDatos;
    })
    resp.on('end', () => {
        //console.log(JSON.parse(data));
        let conversorData = JSON.parse(data);
        let resultado = Number((cantidad / conversorData[`${indicador}`].valor).toFixed(2));

        fs.writeFile(`${nombreArchivo}.${extension}`, `A la fecha: ${fecha}
        Fue realizada cotización con los siguientes datos:
        Cantidad de pesos a convertir: ${cantidad}
        Convertido a ${indicador} da un total de: ${resultado}`, 'utf8', () => {
            console.log('archivo creado con exito');
            }    
        );
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});