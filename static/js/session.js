/*
 revisa la si se ha logueado el usuario 
 cambia el botón de login
 agrega un manejador de eventos para deslogueo
*/


// Obtener el valor actual de 'user_name' en sessionStorage
let userName = sessionStorage.getItem('CAC_username');

// Obtener el elemento <a> por su ID
const loginButton = document.getElementById('loginButton');

function ajustatLoginButton(){
    // Verifica si el valor de 'user_name' es 'desconocido'
    if (userName !== 'desconocido' && userName!==null) {
        // Modifica el contenido del botón
        loginButton.innerHTML = `
            <span class="login-text">
                ${userName}
            </span>
            <i class="fas fa-sign-out-alt"></i>
        `
        // Cambia el color de fondo del botón a verde
        loginButton.style.backgroundColor = 'green';
        //loginButton.style.color = 'white';
    } else {
        // Revierte al contenido original si no es 'desconocido'
        loginButton.innerHTML = `
            <i class="fas fa-sign-in-alt"></i>
            <span class="login-text">
                Iniciar sesión
            </span>
        `;
        loginButton.style.backgroundColor = '';
    }
}

// Función para borrar 'user_name' de sessionStorage
function borrarUserName(event) {
    if (userName !== 'desconocido' && userName!==null) { 
        sessionStorage.removeItem('CAC_username');
        userName = null
        console.log('user_name borrado de sessionStorage');
        event.preventDefault();
        ajustatLoginButton();
    }
}

// Agrega un event listener para escuchar el clic en el botón de login
loginButton.addEventListener('click', borrarUserName);

// Agrega un event listener para escuchar cuando la página se carga o recarga
window.onload = ajustatLoginButton;