# PreEntrega3Molinari

---------->Uso Simulador "Carrito de Compra"<----------
Para utitlizar el simulador de "Carrito de Compra" se debe ir al menu "Suplementos-->Proteínas"

---------->Se agrega para la PreEntrega3<----------

### 1. Mostrar el Catálogo de Productos

La función `mostrarCatalogoDOM(array)` se encarga de mostrar el catálogo de productos en el sitio web. Esta función toma un arreglo de productos como argumento y muestra cada producto en tarjetas dentro de un contenedor en la página web.

### 2. Ordenar Productos 

- Para ordenar los productos de mayor a menor precio, selecciona "Mayor Precio" en el menú desplegable de orden.
- Para ordenar los productos de menor a mayor precio, selecciona "Menor Precio" en el menú desplegable de orden.
- Para ordenar alfabéticamente por nombre de producto, selecciona "Orden Alfabético" en el menú desplegable de orden.

### 3. Buscar Productos

Utiliza el campo de búsqueda en la página web para buscar productos en el catálogo. La función `buscarInfo(buscado, array)` busca productos cuyos nombres o descripciones coincidan parcialmente con el término de búsqueda ingresado. Los resultados se mostrarán en tiempo real a medida que escribas en el campo de búsqueda.

### 4. Agregar Productos al Carrito

- Para agregar productos al carrito, selecciona la cantidad deseada utilizando los botones "+" y "-" junto al campo de cantidad en la tarjeta del producto y luego haz clic en el botón "Agregar".
- Los productos se agregarán al carrito y se guardarán en el almacenamiento local del navegador para que puedas verlos más tarde.
- El botón del carrito en la parte superior derecha de la página mostrará la cantidad de productos en tu carrito.

### 5. Ver y Administrar el Carrito

- Haz clic en el botón del carrito en la parte superior derecha de la página para ver los productos que has agregado.
- En el carrito, puedes ver los productos, la cantidad y el precio total.
- Puedes eliminar productos del carrito haciendo clic en el ícono de la papelera junto al producto.
- El precio total de la compra se mostrará en la parte inferior del carrito.

### 6. Finalizar la Compra

- Cuando estés listo para finalizar tu compra, haz clic en el botón "Finalizar Compra".
- Esto eliminará los productos del carrito y reiniciará el carrito.

### 7. Agregar un Nuevo Producto (Acceso Administrativo)

- Haz clic en el botón "Suplementos/Administrar Stock" en el menú.
- Para agregar un nuevo producto, inicia sesión como administrador (User: admin/Password: admin).
- Completa los campos con la información del nuevo producto, como nombre, descripción y precio.
- Haz clic en el botón "Guardar Suplemento" para agregar el nuevo producto al catálogo.
- El nuevo producto se mostrará en el catálogo y estará disponible para los usuarios.