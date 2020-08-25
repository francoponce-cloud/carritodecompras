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
}