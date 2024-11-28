// Configurar el token de acceso de Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxjYWxvY2siLCJhIjoiY2x1cTZwbnoxMmhnODJqbGRjeDE4cXZ0MiJ9.Cn6aJu_1JOcP7D4-KxcQUw';

// Crear un nuevo mapa de Mapbox
var map = new mapboxgl.Map({
    container: 'map', // ID del contenedor HTML donde se mostrará el mapa
    style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa (en este caso, "streets-v11" que es el mapa de calles)
    center: [-84.22441831341965, 10.010740411710415], // Coordenadas del centro del mapa (longitud y latitud)
    zoom: 17 // Nivel de zoom inicial del mapa
});

// Crear un marcador personalizado utilizando un elemento HTML
var marker = document.createElement('div');
marker.className = 'marker'; // Clase CSS para el marcador

// Crear un elemento HTML para etiquetar el marcador
var markerLabel = document.createElement('div');
markerLabel.className = 'marker-label'; // Clase CSS para la etiqueta del marcador
markerLabel.textContent = 'Pan Feliz'; // Texto de la etiqueta del marcador

// Adjuntar la etiqueta del marcador al marcador
marker.appendChild(markerLabel);

// Agregar el marcador personalizado al mapa en una ubicación específica
new mapboxgl.Marker(marker)
    .setLngLat([-84.22434318582786, 10.010769760453229]) // Coordenadas del marcador (longitud y latitud)
    .addTo(map); // Agregar el marcador al mapa

   // Espera a que la ventana haya cargado completamente para ejecutar el código
window.addEventListener('load', () => {
    let lon; // Variable para almacenar la longitud
    let lat; // Variable para almacenar la latitud

    // Obtener elementos del DOM para mostrar la información del clima
    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');
    let vientoVelocidad = document.getElementById('viento-velocidad');

    // Verificar si el navegador soporta la geolocalización
    if (navigator.geolocation) {
        // Obtener la posición actual del usuario
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude; // Obtener la longitud
            lat = posicion.coords.latitude; // Obtener la latitud
            
            // ID de la ciudad de San José, Costa Rica (ejemplo)
            const cityId = 3624955;
            const apiKey = '4956d5b3ade697ae7206db98c21ae3f4';
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;

            // Realizar una solicitud a la API del tiempo utilizando Fetch
            fetch(url)
                .then(response => response.json()) // Convertir la respuesta a JSON
                .then(data => {
                    // Obtener y mostrar la temperatura
                    let temp = (data.main.temp - 273.15).toFixed(1);

                    temperaturaValor.textContent = `${temp} °C`;

                    // Obtener y mostrar la descripción del clima
                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    ubicacion.textContent = data.name; // Mostrar la ubicación

                    // Obtener y mostrar la velocidad del viento
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;

                    // Asignar un icono animado dependiendo del clima
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg';
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg';
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg';
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg';
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg';
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg';
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg';
                            break;
                        default:
                            iconoAnimado.src = 'animated/cloudy-day-1.svg';
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        })

    }
})

$(document).ready(function() {
    $('form').submit(function(event) {
        // Lógica de validación
        if (!validarFormulario()) {
            // Muestra mensajes de error al usuario
            alert('Por favor, complete todos los campos requeridos correctamente.');
            event.preventDefault(); // Evita que el formulario se envíe si la validación no pasa
        } else {
            alert('Formulario enviado.');
        }
        // Si la validación pasa, el formulario se enviará normalmente
    });

    function validarFormulario() {
        var nombre = $('#name').val();
        var correo = $('#email').val();
        var mensaje = $('#message').val();
        // Verifica que los campos no estén vacíos
        if (nombre === '' || correo === '' || mensaje === '') {
            return false;
        }
        // Verifica el formato del correo electrónico utilizando una expresión regular simple
        var correoValido = /\S+@\S+\.\S+/;
        if (!correoValido.test(correo)) {
            return false;
        }
        if (mensaje.length === 0 || mensaje.length < 10) {
            return false;
        }
        return true;
    }
});





// Espera a que el documento HTML esté completamente cargado y listo para interactuar
$(document).ready(function(){
    // Función para alternar la visibilidad del formulario al hacer clic en el botón
    $(".contact-button").click(function(){
        $(".contact-form").slideToggle(2000); // Animación de barrido con duración de 2000ms (2 segundos)
    });
});
