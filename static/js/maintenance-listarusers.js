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

async function listarusuarios() {
    //obtener usuarios
    var usuarios = await fetchData(BASEURL+'/api/usersmaintenance/list/', 'GET');
    // Obtener el contenedor donde se añadirán los usuarios
    var container = document.getElementById('usersContainer');
    container.innerHTML = '';

    // Iterar sobre los usuarios y crear labels y botón de papelera para cada uno
    usuarios.forEach(function(usuario) {
    var userDiv = document.createElement('div');
    userDiv.className = 'user-div';
    container.appendChild(userDiv);

    // Mostrar solo los campos específicos como labels
    var fieldsToShow = ['id_user', 'first_name', 'last_name', 'email'];
    let uid = ''
    fieldsToShow.forEach(function(field) {
          var label = document.createElement('label');
          label.className = 'user-label';
          if (field === 'id_user') {
            label.textContent = ' - ' + usuario[field].toString().padStart(4, '0');
            uid = usuario.id_user;
            }
          else {label.textContent = ' - ' + usuario[field];}
        userDiv.appendChild(label);
    });

    // Agregar botón de papelera
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.id = uid;
    deleteButton.onclick = function() {
                      // Mostrar cuadro de confirmación usando SweetAlert
                      Swal.fire({
                        title: 'Confirmación',
                        text: `¿Seguro que desea eliminar al usuario ${uid} ?`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Llamar a delete_user solo si el usuario confirma
                            delete_user(uid);
                        }
                      });
      };
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    userDiv.appendChild(deleteButton);
    });
    };

    async function delete_user(id) {
      //borrado asíncrono
      //id = {id_user:id};
      var usuarios = await fetchData(BASEURL+`/api/usersmaintenance/delete/${id}`, 'DELETE');
      listarusuarios();
    }

console.log('1')
document.addEventListener('DOMContentLoaded', listarusuarios());