const bcrypt = require("bcrypt");

async function testPassword() {
  // La contraseña en texto plano que usarás para la prueba
  const passwordInput = "123123"; // Contraseña que usas en el login

  // La contraseña encriptada que obtuviste de tu base de datos
  const hashedPasswordFromDB =
    "$2b$10$I/fDBS4GE1yp9ewno/qMlOH2PiccY3oiej4LJX.eS5kr6l3IfWJ3y"; // Reemplaza con el valor real de tu base de datos

  // Compara la contraseña ingresada con la almacenada en la base de datos
  const match = await bcrypt.compare(passwordInput, hashedPasswordFromDB);

  // Muestra el resultado en la consola
  console.log("Password match:", match ? "Success" : "Failure");
}

// Ejecuta la función de prueba
testPassword().catch((error) => {
  console.error("Error:", error);
});
