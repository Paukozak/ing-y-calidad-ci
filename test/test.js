const fs = require("fs"); //importa el modulo fs que permite leer archivos del disco

let hayFallos = false;

function check(condicion, mensaje) {
  if (condicion) {
    console.log(`OK: ${mensaje}`);
  } else {
    console.error(`FALLO: ${mensaje}`);
    hayFallos = true;
  }
}

const existeIndex = fs.existsSync("index.html");
check(existeIndex, "debe existir el archivo index.html");

const contenido = existeIndex ? fs.readFileSync("index.html", "utf8") : "";
check(contenido.includes("Integración"), "debe contener la palabra Integración");
check(contenido.includes("Entrega"), "debe contener la palabra Entrega");

if (hayFallos) {
  console.error("\n❌ Algunos requisitos no se cumplen");
  process.exit(1); //para que github actions sepa que fallo
} else {
  console.log("\n✅ Todos los requisitos se cumplen");
}

//node test/test.js
