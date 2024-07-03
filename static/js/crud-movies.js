class Movie{

    constructor(id_movie, id_user, title, release_date, gender, director, actors, rating ,banner){
        this.id_movie=id_movie;
        this.id_user=id_user;
        this.title=title;
        this.release_date=release_date;
        this.gender=gender;
        this.director=director;
        this.actors=actors;
        this.rating=rating;
        this.banner=banner
    }
}


function showMovies(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let movies = JSON.parse(localStorage.getItem('movies')) || [];

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyMovies = document.querySelector('#list-table-movies tbody');
    // const tbodyMovies = document.getElementById('#tbody-table-movies');
    //limpio el contenido de la tabla
    tbodyMovies.innerHTML = '';
    movies.forEach(movie => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${movie.title}</td>
                        <td>${movie.gender}</td>
                        <td>${movie.director}</td>
                        <td>${movie.actors}</td>
                        <td>${movie.rating}</td>
                        <td>${movie.release_date}</td>
                        <td>
                            <img src="${movie.banner}" alt="${movie.title}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updateMovie(${movie.id_movie})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deleteMovie(${movie.id_movie})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyMovies.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function saveMovie(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-movie');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-movie');
    const inputIdUser = document.querySelector('#id-user');
    const inputTitle = document.querySelector('#id-title');
    const inputGender = document.querySelector('#id-gender');
    const inputDirector = document.querySelector('#id-director');
    const inputActors = document.querySelector('#id-actors');
    const inputRating = document.querySelector('#id-rating');
    const inputReleaseDate = document.querySelector('#id-release-date');
    const inputBanner = document.querySelector('#id-banner');

    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputTitle.value.trim() !== ''){
        //Busca en localstorage el item movies, si no existe asigna el array vacio.
        let movies = JSON.parse(localStorage.getItem('movies')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del array de movies el objeto a editar
            const movieFind = movies.find(movie => movie.id_movie == inputId.value);
            //Si existe actualizo el objeto
            if (movieFind) {
              movieFind.id_user = inputIdUser.value;
              movieFind.title = inputTitle.value;
              movieFind.gender = inputGender.value;
              movieFind.director = inputDirector.value;
              movieFind.actors = inputActors.value;
              movieFind.rating = inputRating.value;
              movieFind.release_date = inputReleaseDate.value;
              movieFind.banner = inputBanner.value;
            }
        }else{
            let newMovie = new Movie(
                movies.length+1,
                inputIdUser.value,
                inputTitle.value,
                inputGender.value,
                inputDirector.value,
                inputActors.value,
                inputRating.value,
                inputReleaseDate.value,
                inputBanner.value,
            );
            movies.push(newMovie);
         }

        //Se actualiza el array de peliculas en el localstorage
        localStorage.setItem('movies',JSON.stringify(movies));
        showMovies();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            title: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa el campo Titulo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar una pelicula
 * de acuedo al id de la pelicula
 * @param {number} movieId id movie que se va a actualizar
 */
function updateMovie(movieId){
    let movies = JSON.parse(localStorage.getItem('movies'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let movieToUpdate = movies.find(movie => movie.id_movie===movieId);
    if(movieToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-movie');
        const inputTitle = document.querySelector('#id-title');
        const inputDirector = document.querySelector('#id-director');
        const inputRating = document.querySelector('#id-rating');
        const inputReleaseDate = document.querySelector('#id-release-date');
        const inputBanner = document.querySelector('#id-banner');
        //Se cargan los inputs con los valores de la pelicula encontrada
        inputId.value = movieToUpdate.id_movie;
        inputTitle.value = movieToUpdate.title;
        inputDirector.value = movieToUpdate.director;
        inputRating.value = movieToUpdate.rating;
        inputReleaseDate.value = movieToUpdate.release_date;
        inputBanner.value = movieToUpdate.banner;
    }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} movieId id movie que se va a eliminar
 */
function deleteMovie(movieId){
    let movies = JSON.parse(localStorage.getItem('movies'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let movieToDelete = movies.find(movie => movie.id_movie===movieId);
    if(movieToDelete){
        //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
        movies = movies.filter(movie => movie.id_movie !== movieToDelete.id_movie);
        //se actualiza el localstorage
        localStorage.setItem('movies',JSON.stringify(movies));
        showMovies();
        Swal.fire({
            title: 'Exito!',
            text: 'La pelicula fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveMovie = document.querySelector('#btn-save-movie');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click',saveMovie);
    showMovies();
});