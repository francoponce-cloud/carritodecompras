class Carrito{
    // Añadir el producto al carrito
    comprarProducto(e){
        e.preventDefault(); // parametro e para prevenir la acción por defecto 
        if(e.target.classList.contains('agregar-carrito')){ // Si se hace click en el boton comprar de nuestro carrito entonces ese valor lo vamos a guardar. 
            // Lo que hacemos es almacenar todo ese valor
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h4').textContent,
            precio : producto.querySelector('.precio span').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1
        }
        this.insertarCarrito(infoProducto);
    }
    insertarCarrito(producto){
        const row = document.createElement('tr');
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
    }
    eliminarPorducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
    }
}