$(document).ready(function() {
    // Inicializar el carrusel con las opciones deseadas
    $('#carouselExampleIndicators').carousel({
        interval: 2000, // Intervalo entre cada cambio de diapositiva en milisegundos
        keyboard: true, // Permitir el control del carrusel mediante el teclado
        pause: "hover", // Pausar el carrusel al pasar el ratón por encima
        ride: "carousel", // Autoplay del carrusel después de que el usuario manualmente cambie la primera diapositiva
        wrap: true // Permite al carrusel continuar en bucle de manera continua
    });

    // Escuchar el evento 'slide' del carrusel
    $('#carouselExampleIndicators').on('slide.bs.carousel', function () {
        // Acciones a realizar cuando se inicia una transición de diapositiva
        console.log('Cambiando de diapositiva...');
    });

    // Escuchar el evento 'slid' del carrusel
    $('#carouselExampleIndicators').on('slid.bs.carousel', function () {
        // Acciones a realizar después de que finaliza la transición de diapositiva
        console.log('Cambio de diapositiva completado.');
    });
});
