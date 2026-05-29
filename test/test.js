const fs = require("fs");

// Leer la especificación
const spec = fs.readFileSync("SPEC.md", "utf8");
const requisitos = spec
  .split("\n")
  .filter(line => line.trim().startsWith("-"))
  .map(line => line.trim().replace("- ", ""));

console.log(`Se encontraron ${requisitos.length} requisitos en SPEC.md\n`);

let hayFallos = false;

requisitos.forEach(requisito => {
  if (requisito === "debe existir el archivo index.html") {
    if (!fs.existsSync("index.html")) {
      console.error(`❌ FALLO: ${requisito}`);
      hayFallos = true;
    } else {
      console.log(`✅ OK: ${requisito}`);
    }
  } else if (requisito.startsWith("debe contener la palabra")) {
    const palabra = requisito.split("la palabra ")[1];
    const contenido = fs.readFileSync("index.html", "utf8");
    if (!contenido.includes(palabra)) {
      console.error(`❌ FALLO: ${requisito}`);
      hayFallos = true;
    } else {
      console.log(`✅ OK: ${requisito}`);
    }
  }
});

if (hayFallos) {
  console.error("\n❌ Algunos requisitos no se cumplen");
  process.exit(1);
} else {
  console.log("\n✅ Todos los requisitos se cumplen");
}

//node test/test.js

//agregar que error es cuando se deploya tipo que test falla