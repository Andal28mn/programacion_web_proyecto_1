// Obtener elementos del DOM
const carritoContainer = document.querySelector('.carrito-container');
const carrito = document.querySelector('.carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const imgCarrito = document.getElementById('img-carrito');
const listaCarrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
const vaciarCarrito = document.getElementById('vaciar-carrito');
const totalCarrito = document.createElement('div');
totalCarrito.classList.add('total-carrito');

// Arreglo para almacenar los productos del carrito
let productosCarrito = [];

// Función para abrir el carrito
const abrirCarrito = () => {
  carritoContainer.classList.remove('hidden');
  carritoContainer.classList.add('open');
};

// Función para cerrar el carrito
const cerrarCarritoModal = () => {
  carritoContainer.classList.add('hidden');
  carritoContainer.classList.remove('open');
};

// Agregar evento click al ícono del carrito para abrirlo
imgCarrito.addEventListener('click', abrirCarrito);

// Agregar evento click al botón de cerrar carrito
cerrarCarrito.addEventListener('click', cerrarCarritoModal);

// Función para agregar un producto al carrito
const agregarAlCarrito = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const producto = e.target.parentElement.parentElement;
    const infoProducto = {
      imagen: producto.querySelector('img').src,
      titulo: producto.querySelector('h3').textContent,
      precio: parseFloat(producto.querySelector('.precio').textContent.replace('$', '')),
      id: e.target.getAttribute('data-id')
    };

    // Verificar si el producto ya está en el carrito
    const existeProducto = productosCarrito.some(producto => producto.id === infoProducto.id);

    if (existeProducto) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      productosCarrito = productosCarrito.map(producto => {
        if (producto.id === infoProducto.id) {
          producto.cantidad++;
          return producto;
        } else {
          return producto;
        }
      });
    } else {
      // Si el producto no está en el carrito, lo agregamos
      infoProducto.cantidad = 1;
      productosCarrito = [...productosCarrito, infoProducto];
    }

    // Abrir el carrito
    abrirCarrito();

    // Actualizar el carrito en la interfaz
    actualizarCarrito();
  }
};

// Función para actualizar el carrito en la interfaz
const actualizarCarrito = () => {
  listaCarrito.innerHTML = '';
  productosCarrito.forEach(producto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="50"></td>
      <td>${producto.titulo}</td>
      <td>$${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td><button class="eliminar-producto" data-id="${producto.id}">Eliminar</button></td>
    `;
    listaCarrito.appendChild(fila);
  });

  // Actualizar el total del carrito
  const total = productosCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
  carrito.appendChild(totalCarrito);

  // Agregar evento click a los botones de "Eliminar"
  const eliminarButtons = document.querySelectorAll('.eliminar-producto');
  eliminarButtons.forEach(button => {
    button.addEventListener('click', eliminarProducto);
  });
};

// Función para eliminar un producto del carrito
const eliminarProducto = (e) => {
  const idProducto = e.target.getAttribute('data-id');
  productosCarrito = productosCarrito.filter(producto => producto.id !== idProducto);
  actualizarCarrito();
};

// Agregar evento click a los botones de "Agregar al carrito"
const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
agregarCarritoButtons.forEach(button => {
  button.addEventListener('click', agregarAlCarrito);
});

// Función para vaciar el carrito
const vaciarCarritoCompleto = () => {
  productosCarrito = [];
  actualizarCarrito();
};

// Agregar evento click al botón de "Vaciar carrito"
vaciarCarrito.addEventListener('click', vaciarCarritoCompleto);

// Ocultar el carrito al cargar la página
carritoContainer.classList.add('hidden');

// Obtener todos los elementos .box que están ocultos
const boxesOcultas = document.querySelectorAll('.box[style="display: none;"]');

// Función para mostrar las tarjetas de los productos del 9 al 12
function mostrarMasProductos() {
  // Obtener las primeras 4 tarjetas ocultas
  const boxesAMostrar = Array.from(boxesOcultas).slice(0, 4);

  // Mostrar las tarjetas
  boxesAMostrar.forEach(box => {
    box.style.display = 'block';
  });

  // Si se han mostrado todas las tarjetas ocultas, ocultar el botón "Cargar más"
  if (boxesOcultas.length <= 4) {
    document.getElementById('load-more').style.display = 'none';
  }
}

// Agregar evento click al botón "Cargar más"
const loadMoreBtn = document.getElementById('load-more');
loadMoreBtn.addEventListener('click', mostrarMasProductos);

