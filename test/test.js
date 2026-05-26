const fs = require("fs");

// test: el archivo index.html existe
if (!fs.existsSync("./index.html")) {
  console.error("FALLO: index.html no existe");
  process.exit(1);
}

// test: el archivo contiene la palabra "Hola"
const contenido = fs.readFileSync("./index.html", "utf8");
if (!contenido.includes("Hola")) {
  console.error("FALLO: index.html no contiene la palabra 'Hola'");
  process.exit(1);
}


console.log("OK: index.html existe y contiene 'Hola'");

//node test/test.js
