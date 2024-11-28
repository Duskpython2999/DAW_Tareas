// Definición de la clase Carrito que gestiona las operaciones del carrito de compras
class Carrito {
    constructor() {
        this.allProducts = []; // Array para almacenar todos los productos en el carrito
    }

    // Método para agregar un producto al carrito
    agregarProducto(producto) {
        // Verifica si el producto ya existe en el carrito
        const exists = this.allProducts.some(p => p.title === producto.title);
        // Si el producto ya está en el carrito, incrementa la cantidad
        if (exists) {
            this.allProducts.forEach(p => {
                if (p.title === producto.title) {
                    p.quantity++;
                }
            });
        } else {
            // Si el producto no está en el carrito, lo agrega
            this.allProducts.push(producto);
        }
        // Guarda los productos en el almacenamiento local
        this.guardarLocalStorage();
    }

    // Método para eliminar un producto del carrito
    eliminarProducto(title) {
        // Filtra los productos para eliminar el que tiene el título dado
        this.allProducts = this.allProducts.filter(product => product.title !== title);
        // Guarda los productos actualizados en el almacenamiento local
        this.guardarLocalStorage();
    }

    // Método para calcular el total de la compra y el número total de productos en el carrito
    calcularTotal() {
        let total = 0;
        let totalOfProducts = 0;
        // Recorre todos los productos en el carrito
        this.allProducts.forEach(product => {
            // Calcula el subtotal de cada producto y lo suma al total
            total += parseInt(product.quantity * product.price.slice(1));
            // Calcula el número total de productos en el carrito
            totalOfProducts += product.quantity;
        });
        // Retorna el total y el número total de productos
        return { total, totalOfProducts };
    }

    // Método para guardar los productos en el almacenamiento local
    guardarLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(this.allProducts));
    }

    // Método para leer los productos del almacenamiento local al cargar la página
    leerLocalStorage() {
        // Obtiene los productos del almacenamiento local o un array vacío si no hay datos
        const productosLS = JSON.parse(localStorage.getItem('productos')) || [];
        // Actualiza el array de productos en el carrito con los datos del almacenamiento local
        this.allProducts = productosLS;
    }
}


// Creación de una instancia de la clase Carrito para gestionar el carrito de compras
const carrito = new Carrito();

// Selección de elementos del DOM relacionados con el carrito y productos
const btnCart = document.querySelector('.container-cart-icon'); // Botón del carrito
const containerCartProducts = document.querySelector('.container-cart-products'); // Contenedor de productos del carrito
const rowProduct = document.querySelector('.row-product'); // Fila de productos del carrito
const productsList = document.querySelector('.container-items'); // Lista de productos disponibles para agregar al carrito
const valorTotal = document.querySelector('.total-pagar'); // Elemento que muestra el valor total de la compra
const countProducts = document.querySelector('#contador-productos'); // Elemento que muestra la cantidad total de productos en el carrito
const cartEmpty = document.querySelector('.cart-empty'); // Mensaje de carrito vacío
const cartTotal = document.querySelector('.cart-total'); // Total de la compra

// Función para mostrar los productos del carrito en la interfaz
const showHTML = () => {
    // Verifica si el carrito está vacío y ajusta la visibilidad de los elementos en consecuencia
    if (!carrito.allProducts.length) {
        cartEmpty.classList.remove('hidden'); // Muestra el mensaje de carrito vacío
        rowProduct.classList.add('hidden'); // Oculta la fila de productos del carrito
        cartTotal.classList.add('hidden'); // Oculta el total de la compra
    } else {
        cartEmpty.classList.add('hidden'); // Oculta el mensaje de carrito vacío
        rowProduct.classList.remove('hidden'); // Muestra la fila de productos del carrito
        cartTotal.classList.remove('hidden'); // Muestra el total de la compra
    }

    rowProduct.innerHTML = ''; // Vacía la fila de productos del carrito

    // Calcula el total y la cantidad total de productos en el carrito
    const { total, totalOfProducts } = carrito.calcularTotal();

    // Actualiza el valor total y la cantidad total de productos en la interfaz
    valorTotal.innerText = `₡${total}`;
    countProducts.innerText = totalOfProducts;

    // Recorre todos los productos en el carrito y los muestra en la interfaz
    carrito.allProducts.forEach(product => {
        const containerProduct = document.createElement('div'); // Crea un contenedor para cada producto del carrito
        containerProduct.classList.add('cart-product'); // Agrega la clase al contenedor

        // Genera el HTML para mostrar la información del producto en el carrito
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct); // Agrega el producto al carrito en la interfaz
    });

    // Mostrar u ocultar el botón "Finalizar compra"
    const finalizarCompraBtn = document.getElementById("finalizar-compra-btn");
    if (carrito.allProducts.length > 0) {
        finalizarCompraBtn.classList.remove('hidden'); // Muestra el botón "Finalizar compra"
    } else {
        finalizarCompraBtn.classList.add('hidden'); // Oculta el botón "Finalizar compra"
    }
};

// Función para guardar el estado del carrito en el almacenamiento local del navegador
const guardarLocalStorage = () => {
    carrito.guardarLocalStorage();
};

// Función para leer el estado del carrito desde el almacenamiento local del navegador y mostrarlo en la interfaz
const leerLocalStorage = () => {
    carrito.leerLocalStorage();
    showHTML();
};

// Evento click para agregar un producto al carrito cuando se hace clic en el botón "Añadir al carrito"
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.closest('.item');

        // Obtener la información del producto seleccionado
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p.price').textContent,
            image: product.querySelector('img').getAttribute('src'), // Obtener la URL de la imagen
        };

        // Agregar el producto al carrito y actualizar la interfaz
        carrito.agregarProducto(infoProduct);
        showHTML();
    }
});

// Evento que se dispara cuando el contenido HTML se ha cargado completamente
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput'); // Input de búsqueda
    const items = document.querySelectorAll('.item'); // Elementos de la lista de productos

    // Evento input para realizar la búsqueda de productos en tiempo real
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        items.forEach(function (item) {
            const title = item.querySelector('h2').textContent.toLowerCase();
            // Oculta o muestra los productos según el término de búsqueda
            if (title.includes(searchTerm)) {
                item.style.display = 'block'; // Muestra el producto
            } else {
                item.style.display = 'none'; // Oculta el producto
            }
        });
    });
});

// Evento click para eliminar un producto del carrito cuando se hace clic en el icono de eliminar
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        // Eliminar el producto del carrito y actualizar la interfaz
        carrito.eliminarProducto(title);
        showHTML();
    }
});

// Evento click para mostrar u ocultar el carrito cuando se hace clic en el icono del carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Evento que se dispara cuando el contenido HTML y CSS se ha cargado completamente
window.addEventListener('DOMContentLoaded', leerLocalStorage);

// Evento click para redirigir a la página de compra cuando se hace clic en el botón "Finalizar compra"
document.getElementById("finalizar-compra-btn").addEventListener("click", function() {
    window.location.href = "compra.html"; // Redirecciona a la página de compra
});
