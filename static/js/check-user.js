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

// función para recuperar recuperar usuario 
// si hay correspondencia entre correoo y pass con la base de datos de usuario devuelve
// first_name y last_name distintos de 'desconocido' (lo hace el back)
async function check_user(email, password) {
    let data = {
        email: email,
        password: password
        }
    
    var user = await fetchData(BASEURL+'/api/user_login/', 'POST', data);

    // procesar el evento con los datos resueltos
    if (user.first_name != 'desconocido')
        {
        sessionStorage.setItem('CAC_username', user.first_name);
        // Vuelve a la página anterior después de enviar el formulario
            Swal.fire({
                icon: 'success',
                title: 'Ingreso',
                text: 'Bienvenido '+ user.first_name,
                showConfirmButton: true, 
                timer: 2000 // Tiempo en milisegundos (2 segundos)
            });
            setTimeout(function() {
                window.history.back();
            }, 2000); 
        }
    else {
            //avisa que no que no va a ser che
            sessionStorage.setItem('CAC_username', 'desconocido');
            Swal.fire({
            icon: 'error',
            title: 'Ingreso',
            text: 'Clave o correo inválidos',
            showConfirmButton: true, 
            });
        }
}
