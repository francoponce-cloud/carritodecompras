class Carrito {
  // Añadir el producto al carrito
  comprarProducto(e) {
    e.preventDefault(); // parametro e para prevenir la acción por defecto
    if (e.target.classList.contains("agregar-carrito")) {
      // Si se hace click en el boton comprar de nuestro carrito entonces ese valor lo vamos a guardar.
      // Lo que hacemos es almacenar todo ese valor
      const producto = e.target.parentElement.parentElement;
      this.leerDatosProducto(producto);
    }
  }
  leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h4").textContent,
      precio: producto.querySelector(".precio span").textContent,
      id: producto.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };
    this.insertarCarrito(infoProducto);
  }
  insertarCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
    listaPorductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
  }
  eliminarPorducto(e) {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector("a").getAttribute("data-id");
    }
    this.eliminarPorductoLocalStorage(productoID);
  }
  vaciarCarrito(e) {
    e.preventDefault();
    while (listaPorductos.firstChild) {
      listaPorductos.removeChild(listaPorductos.firstChild);
    }
    return false;
  }

  // Guardar los datos en local storage
  guardarProductosLocalStorage(producto) {
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  // Creamos obtener productos porque primero queremos saber si hay o no hay en local storage
  // Si los hay lo agrega despues del ultimo
  obtenerProductosLocalStorage() {
    let productoLS;

    // Comprobación si hay algo en local storage

    if (localStorage.getItem("productos") === null) {
      productoLS = []; // Si no hay nada lo crea en vacio
    } else {
      productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
  }

  eliminarPorductoLocalStorage(productoID) {
    let productosLS; // Declaramos la variable que vamos a usar
    productosLS = this.obtenerProductosLocalStorage(); // Obtenemos los elementos del local storage

    // Ahora lo que hacemos es comprar
    productosLS.forEach(function (productoLS, index) {
      // idex para saber la posición
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1); // borra un elemento en la posición index
      }
    });

    // Ahora lo que hacemos es actualizar

    localStorage.setItem('productos', JSON.stringify(productosLS));
  }

  // Metodo para leer productos en local storage ni bien cargue la pagina

  leerLocalStorage() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      // Reutilizamos código de InsertarCarrito ya que lo que hacemos es que aparezcan los datos en la tabla
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
      listaPorductos.appendChild(row);
    });
  }
}