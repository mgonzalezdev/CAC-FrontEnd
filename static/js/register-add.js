const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/*
revisa si ya existe el usuario y avisa en ese caso
*/
async function EsNuevoUsuario(email){
    var response = await fetchData(`${BASEURL}/api/user_exists/${email}`, 'GET');
    if (response.exists===true) {
        // Si existe usuario advertir y devolver falso
        Swal.fire({
            icon: 'error',
            title: 'Registro de usuarios',
            text: 'El correo está en uso...ingrese otro',
            showConfirmButton: true, 
            });
        return false;
        } 
        return true;
}

/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function registrar_usuario(data){
    //
    if (await EsNuevoUsuario(data.email)===true){
            var registro = await fetchData(`${BASEURL}/api/users_add/`, 'POST', data);
            
            console.log(JSON.stringify(registro),true,registro.status)
            if (registro.status === 201) {
                    // Si el registro fue exitoso lo loguea y vuelve a la pag anterior
                    first_name = data.first_name;
                    sessionStorage.setItem('CAC_username', first_name);
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro de usuarios',
                        text: 'Bienvenido '+ first_name + ' te has registrado correctamente',
                        showConfirmButton: true, 
                        timer: 3000 // Tiempo en milisegundos (3 segundos)
                    });
                    setTimeout(function() {
                        window.history.back();
                    }, 2000);       
                } else {
                    // Si el código de estado no es 201, maneja el error adecuadamente
                    // avisa que no que no va a ser che
                    sessionStorage.setItem('CAC_username', 'desconocido');
                    Swal.fire({
                    icon: 'error',
                    title: 'Registro de usuarios',
                    text: 'Ha fallado algo en el registro',
                    showConfirmButton: true, 
                    });
            }
        }
    
}
  


// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveMovie = document.querySelector('#btn-save-movie');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click',saveMovie);
    showMovies();
});
  