const paisesAmerica = [
    { codigo: "AG", nombre: "Antigua y Barbuda" },
    { codigo: "AR", nombre: "Argentina" },
    { codigo: "BS", nombre: "Bahamas" },
    { codigo: "BB", nombre: "Barbados" },
    { codigo: "BZ", nombre: "Belice" },
    { codigo: "BO", nombre: "Bolivia" },
    { codigo: "BR", nombre: "Brasil" },
    { codigo: "CA", nombre: "Canadá" },
    { codigo: "CL", nombre: "Chile" },
    { codigo: "CO", nombre: "Colombia" },
    { codigo: "CR", nombre: "Costa Rica" },
    { codigo: "CU", nombre: "Cuba" },
    { codigo: "DM", nombre: "Dominica" },
    { codigo: "DO", nombre: "República Dominicana" },
    { codigo: "EC", nombre: "Ecuador" },
    { codigo: "SV", nombre: "El Salvador" },
    { codigo: "GD", nombre: "Granada" },
    { codigo: "GT", nombre: "Guatemala" },
    { codigo: "GY", nombre: "Guyana" },
    { codigo: "HT", nombre: "Haití" },
    { codigo: "HN", nombre: "Honduras" },
    { codigo: "JM", nombre: "Jamaica" },
    { codigo: "MX", nombre: "México" },
    { codigo: "NI", nombre: "Nicaragua" },
    { codigo: "PA", nombre: "Panamá" },
    { codigo: "PY", nombre: "Paraguay" },
    { codigo: "PE", nombre: "Perú" },
    { codigo: "PR", nombre: "Puerto Rico" },
    { codigo: "VC", nombre: "San Vicente y las Granadinas" },
    { codigo: "LC", nombre: "Santa Lucía" },
    { codigo: "SR", nombre: "Surinam" },
    { codigo: "TT", nombre: "Trinidad y Tobago" },
    { codigo: "UY", nombre: "Uruguay" },
    { codigo: "VE", nombre: "Venezuela" }
];

function poblarSelect() {
    const selectPaises = document.getElementById('country');

    // Limpiamos el select por si tiene opciones previas
    selectPaises.innerHTML = '';

    // Creamos la opción por defecto
    const optionDefault = document.createElement('option');
    // Selecciona por defecto el pais de acuerdo al código de lenguaje utilizado en el navegador
    def = getNombrePais()
    optionDefault.value = def.codigo;
    optionDefault.textContent = def.nombre;    
    selectPaises.appendChild(optionDefault);

    // Creamos opciones para cada país
    paisesAmerica.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais.codigo; // Asignamos el código ISO-3166-1 alpha-2 como valor
        option.textContent = pais.nombre;
        selectPaises.appendChild(option);
    });
}

function getNombrePais() {
    const lenguaje = navigator.language;
    const codigoPais = lenguaje.split('-')[1].toUpperCase(); // Extract country code
    const desconocido = [{ codigo: "", nombre: "" }]
    const Pais = paisesAmerica.filter(pais => pais.codigo === codigoPais); //|| desconocido; // Handle unknown codes
    return Pais[0]
  }



poblarSelect();