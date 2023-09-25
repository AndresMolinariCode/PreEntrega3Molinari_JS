# PreEntrega2Molinari

---------->Uso Simulador "Carrito de Compra"<----------
Para utitlizar el simulador de "Carrito de Compra" se debe ir al menu "Suplementos-->Proteínas"
Luego se deben añadir productos al carrito seleccionando la cantidad y haciendo click en "Agregar al carrito" ,
para luego ir al botón de finalizar compra(Si no se agregan productos, se pedira que agregue productos al carrito de compras), que hara la simulación de una compra online donde:
-Deberá ingresar un nombre
-Seleccionar el medio de pago de la compra (en caso de compra con tarjeta, se deberá seleccionar las cuotas)
-Luego se mostrará un detalle de la compra con el monto
-Por último saltará un mensaje si la compra fue realizada con éxito y el carro de compras quedará vacio.

---------->Se agrega para la PreEntrega3<----------
Para utitlizar el botón "Más Opciones" se debe ir al menu "Suplementos-->Proteínas" y hacer click sobre el bóton "Mas Opciones" ubicado a la izquierda del botón "Finalizar Compra". Al hacer click se motraran las siguientes opciones:
1. consultarCatalogo:
   - Esta función muestra un mensaje emergente con el catálogo completo de productos.
   - Recorre el catálogo de productos y utiliza el método `mostrarInfo()` de cada objeto `Producto` para obtener la información detallada de cada producto (nombre, descripción y precio).
   - Finalmente, muestra una ventana emergente con la información detallada de todos los productos del catálogo.

2. consultarCatalogoAlfabeticamente:
   - Esta función muestra un mensaje emergente con el catálogo completo de productos, ordenados alfabéticamente por el nombre del producto.
   - Realiza una copia del catálogo de productos original y la almacena en `catalogoOrdenado` para no modificar el original.
   - Utiliza el método `sort` para ordenar el catálogo en orden alfabético según el campo `title` (nombre) de los productos.
   - Luego, recorre el catálogo ordenado y utiliza el método `mostrarInfo()` de cada objeto `Producto` para obtener la información detallada de cada producto (nombre, descripción y precio).
   - Finalmente, muestra una ventana emergente con la información detallada de todos los productos del catálogo ordenados alfabéticamente.

3. buscarPorNombre:
   - Esta función permite al usuario buscar productos en el catálogo por nombre.
   - Solicita al usuario que ingrese un texto de búsqueda.
   - Valida que el texto no esté vacío ni contenga caracteres no alfabéticos.
   - Filtra los productos cuyo nombre (en minúsculas) contiene el texto de búsqueda (también en minúsculas).
   - Muestra una ventana emergente con los productos encontrados que coinciden con el texto de búsqueda, incluyendo su información detallada (nombre, descripción y precio).

4. buscarPorPrecio:
   - Esta función permite al usuario buscar productos en el catálogo por precio máximo.
   - Solicita al usuario que ingrese el precio máximo que está dispuesto a pagar.
   - Valida que el valor ingresado sea un número válido mayor o igual a cero.
   - Filtra los productos cuyo precio es menor o igual al precio ingresado.
   - Muestra una ventana emergente con los productos encontrados que cumplen con el límite de precio, incluyendo su información detallada (nombre, descripción y precio).

5. listarProductosMenorMayorPrecio:
   - Esta función muestra un mensaje emergente con el catálogo completo de productos, ordenados por precio de menor a mayor.
   - Realiza una copia del catálogo de productos original y la almacena en `catalogoOrdenado` para no modificar el original.
   - Utiliza el método `sort` para ordenar el catálogo en orden ascendente según el precio de los productos.
   - Luego, recorre el catálogo ordenado y utiliza el método `mostrarInfo()` de cada objeto `Producto` para obtener la información detallada de cada producto (nombre, descripción y precio).
   - Finalmente, muestra una ventana emergente con la información detallada de todos los productos del catálogo ordenados por precio de menor a mayor.

6. listarProductosMayorMenorPrecio
   - Esta función muestra un mensaje emergente con el catálogo completo de productos, ordenados por precio de mayor a menor.
   - Realiza una copia del catálogo de productos original y la almacena en `catalogoOrdenado` para no modificar el original.
   - Utiliza el método `sort` para ordenar el catálogo en orden descendente según el precio de los productos.
   - Luego, recorre el catálogo ordenado y utiliza el método `mostrarInfo()` de cada objeto `Producto` para obtener la información detallada de cada producto (nombre, descripción y precio).
   - Finalmente, muestra una ventana emergente con la información detallada de todos los productos del catálogo ordenados por precio de mayor a menor.# PreEntrega3Molinari
