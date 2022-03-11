const https = require('https');
const fs = require('fs');
const { text } = require('node:stream/consumers');

const argumento = process.argv.slice(2);

let nombreArchivo = argumento[0];
let extension = argumento[1];
let indicador = argumento[2];
let cantidad = Number(argumento[3]);
let fecha = new Date();
let resultado = '';

https.get('https://mindicador.cl/api', (resp) => {
    let data = '';
    resp.on('data', function (respuestaDatos) {
        data += respuestaDatos;

    })
    resp.on('end', () => {

        let conversorData = JSON.parse(data);
        resultado = Number((cantidad / conversorData[`${indicador}`].valor).toFixed(2));
        conversion(nombreArchivo, extension, fecha, cantidad, indicador, resultado);
    });
    
}).on("error", (err) => {
    console.log("Error: " + err.message);
});

let conversion = (nombreArchivo, extension, fecha, cantidad, indicador, resultado) => {
    fs.writeFile(`${nombreArchivo}.${extension}`, `A la fecha: ${fecha}
        Fue realizada cotización con los siguientes datos:
        Cantidad de pesos a convertir: ${cantidad}
        Convertido a ${indicador} da un total de: ${resultado}`, 'utf8', () => {
            console.log('archivo creado con exito');
        }    
    );
}