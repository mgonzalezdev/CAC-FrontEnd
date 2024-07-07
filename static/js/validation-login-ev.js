/* import 'node.js';
const express = require('express');
const cors = require('cors');
const app = express();
// Habilitar CORS para todas las rutas
app.use(cors());
*/


// Seleccionar el formulario por su ID
const formRegister = document.querySelector("#formLogin");

// Función para limpiar las validaciones anteriores
const clearValidations = () => {
    // Seleccionar todos los campos de entrada y elementos de error
    const inputs = document.querySelectorAll("input");
    const errorElements = document.querySelectorAll(".error");

    // Iterar sobre los campos de entrada y elementos de error y limpiarlos
    inputs.forEach(input => {
        input.classList.remove('error');
        // Verificar si el elemento hermano siguiente existe antes de acceder a su propiedad textContent
        // No todos los inputs tienen a continuacion un div class error.
        const nextSibling = input.nextElementSibling;
        if (nextSibling !== null) {
            nextSibling.textContent = '';
        }
    });

    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });
    
}
// Función para validar el formulario
const validarFormulario = (event) => {
    // Prevenir el comportamiento predeterminado de envío del formulario
    event.preventDefault();
    // Limpiar las validaciones anteriores
    clearValidations();

    // Obtener referencias a los campos del formulario
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    let validation = true;
    // Validar el campo email
    if(!email.value.trim()){
        // alert("Los campos Nombre, Apellido, Email y Password son obligatorios")
        document.querySelector("#error-email").textContent='Debe completar el campo Email';
        email.classList.add('error')
        validation=false;
    } else {var vemail = email.value.trim()};
    // Validar el campo password
    if(!password.value.trim()){
        // alert("Los campos Nombre, Apellido, Email y Password son obligatorios")
        document.querySelector("#error-password").textContent='Debe completar el campo contraseña';
        password.classList.add('error')
        validation=false;
    }else if(password.value.length < 6 || password.value.length > 12){
        document.querySelector("#error-password").textContent ='La contraseña debe contener entre 6 y 12 caracteres';
        password.classList.add('error')
        validation=false;
    }else {var vpassword = password.value.trim()}

    // Si no hay errores de validación, enviar el formulario
    if(validation){
        //check_user() en la librería check-user verifica la existencia del usuario en base de datos 
        // no es una función así que no resuleva bien el fetch porque no puede hacerce asíncrona
        // el trabajo de validación de usuario y respuestas debe hacerse en el check-user lib 
        check_user(vemail, vpassword);
    }
}

formRegister.addEventListener('submit',validarFormulario);