const compra = new Carrito(); // Instancia de Carrito para manejar los productos seleccionados

// Función para cargar eventos al cargar la página
function cargarEventos() {
    // Escuchar el evento de carga del documento para ejecutar las funciones necesarias
    document.addEventListener('DOMContentLoaded', () => {
        // Leer los productos almacenados localmente al cargar la página
        leerLocalStorageCompra();
        // Escuchar eventos de clic para eliminar productos
        document.addEventListener('click', eliminarProducto);
        // Escuchar eventos de cambio en la tabla para generar la misma
        document.addEventListener('change', generarTabla);
        // Escuchar eventos de teclado en la tabla para generar la misma
        document.addEventListener('keyup', generarTabla);
        // Escuchar clics en el botón de procesar compra
        procesarCompraBtn.addEventListener('click', procesarCompra);
        // Actualizar el estado del botón de realizar compra al cargar la página
        actualizarEstadoBotonCompra();
    });
}

// Función para leer del almacenamiento local al cargar la página
function leerLocalStorageCompra() {
    // Leer los productos del almacenamiento local y generar la tabla correspondiente
    compra.leerLocalStorage();
    generarTabla(compra.allProducts);
}

// Función para eliminar un producto del carrito
function eliminarProducto(e) {
    // Verificar si el clic se realizó en el botón de eliminar producto
    if (e.target.classList.contains('icon-close')) {
        // Obtener la fila (producto) donde se encuentra el botón
        const row = e.target.closest('tr');
        // Obtener el título del producto desde la fila
        const title = row.querySelector('td:nth-child(2)').innerText;
        // Eliminar el producto del carrito
        compra.eliminarProducto(title);
        // Eliminar la fila de la tabla correspondiente a ese producto
        row.remove();
        // Recalcular y actualizar la tabla
        generarTabla(compra.allProducts);
        // Actualizar el estado del botón de realizar compra
        actualizarEstadoBotonCompra();
    }
}

// Función para generar la tabla de productos en la página de compra
function generarTabla(productosLS) {
    // Seleccionar el cuerpo de la tabla donde se mostrarán los productos
    const tbody = document.querySelector("#lista-compra tbody");
    tbody.innerHTML = ''; // Limpiar el contenido anterior de la tabla

    let subtotal = 0; // Variable para almacenar el subtotal de la compra

    // Iterar sobre cada producto en la lista de productos
    productosLS.forEach(producto => {
        // Crear una nueva fila en la tabla para cada producto
        const row = document.createElement("tr");
        // Llenar la fila con la información del producto
        row.innerHTML = `
            <td><img src="${producto.image}" alt="Producto"></td>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td>${producto.quantity}</td>
            <td>${producto.quantity * parseFloat(producto.price.slice(1))}</td>
            <td><button class="icon-close">Eliminar</button></td>
        `;
        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(row);

        // Calcular el subtotal sumando el precio total de cada producto
        subtotal += producto.quantity * parseFloat(producto.price.slice(1));
    });

    // Calcular el IVA (13% del subtotal)
    const iva = subtotal * 0.13;

    // Calcular el total sumando el subtotal y el IVA
    const total = subtotal + iva;

    // Actualizar los elementos HTML que muestran el subtotal, IVA y total
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('igv').innerText = iva.toFixed(2);
    document.getElementById('total').value = total.toFixed(2); // Actualizar el valor del input del total
}


// Función para actualizar el estado del botón de realizar compra
function actualizarEstadoBotonCompra() {
    // Obtener el botón de realizar compra
    const btnRealizarCompra = document.getElementById('procesar-compra');
    // Deshabilitar el botón si no hay productos en el carrito, habilitarlo si hay productos
    if (compra.allProducts.length === 0) {
        btnRealizarCompra.disabled = true;
    } else {
        btnRealizarCompra.disabled = false;
    }
}

// Cargar eventos al cargar el documento
cargarEventos();

function compraRea(){
    // Obtener los productos del almacenamiento local
    const productosLocalStorage = JSON.parse(localStorage.getItem('productos')) || [];

    // Verificar si hay productos en el carrito
    if (productosLocalStorage.length === 0) {
        // Mostrar un mensaje indicando que no hay productos en el carrito
        alert("Agrega productos al carrito antes de realizar la compra");
    } else {
        // Mostrar un mensaje de agradecimiento por la compra
        alert("¡Compra realizada! ¡Gracias por elegirnos!");

        // Vaciar la tabla de productos en el carrito
        const tbody = document.querySelector("#lista-compra tbody");
        tbody.innerHTML = '';

        // Limpiar el almacenamiento local eliminando todos los productos del carrito
        carrito.guardarLocalStorage([]);

        // Actualizar la interfaz para reflejar los cambios
        showHTML();

        // Desactivar el botón de realizar compra
        const btnRealizarCompra = document.getElementById('procesar-compra');
        btnRealizarCompra.disabled = true;

        // Actualizar el estado del botón de realizar compra
        actualizarEstadoBotonCompra();
    }
}


