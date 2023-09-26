//CODIGO PARA MOSTRAR GRILLA DE PRODUCTOS Y AGREGAR PRODUCTOS AL CARRO
//---------------------------------------->INICIO<----------------------------------------
//Uso de constantes
const products = [
  // Aquí se agregan los productos a ser listados  
  {
      image: '../img/Suplementos/WheyProtein/WheyProtein_1-removebg-preview.png',
      title: 'Iridium Whey Concentrado',
      description: 'El concentrado es la proteína ideal para el día a día. De alto valor biológico, es el complemento más importante para quienes buscan aumentar la fuerza y ​​ganar masa muscular.',
      price: 19.99
  },
  {
      image: '../img/Suplementos/WheyProtein/WheyProtein_2-removebg-preview.png',
      title: 'Universal Ultra Whey Pro',
      description: 'Sirve para aumentar tu masa muscular. Para crecer es necesario entrenar con sobrecarga, levantar pesas, de esa manera las fibras musculares se dañan durante el entrenamiento y al reestructurase durante el descanso aumentan su tamaño.',
      price: 24.99
  },
  {
      image: '../img/Suplementos/WheyProtein/WheyProtein_3-removebg-preview.png',
      title: 'Integralmedica Whey Protein Isolate',
      description: 'Promueve el aumento de masa muscular a través del incremento de síntesis proteica. Mantiene balance positivo de nitrógeno, evitando la degradación de músculo.',
      price: 29.99
  },  
];

const productGrid = document.getElementById('productGrid');

// Uso de bucles
const maxDescriptionLength = 100; // Número máximo de caracteres para la descripción

products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.className = 'col-md-4 mb-4';

    // Limitar la descripción a un número máximo de caracteres
    const maxDescriptionLength = 100; // Número máximo de caracteres para la descripción
    const truncatedDescription = product.description.length > maxDescriptionLength
    ? product.description.slice(0, maxDescriptionLength) + '...'
    : product.description;

    productCard.innerHTML = `
    <div class="card">
        <img src="${product.image}" class="card-img-top product-image img-fluid" alt="${product.title}"> <!-- Utiliza la clase "img-fluid" para hacer la imagen responsive -->
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${truncatedDescription}</p>
            <p class="card-text">$${product.price.toFixed(2)}</p>
            <div class="input-group mb-3">
                <input type="number" class="form-control" value="1" min="1" id="quantity${index}">
                <button class="btn btn-primary" onclick="addToCart(${index})">Agregar al carrito</button>
            </div>
        </div>
    </div>
    `;

    productGrid.appendChild(productCard);
});


const cart = [];

//Uso de funciones
function addToCart(index) {
  const quantity = parseInt(document.getElementById(`quantity${index}`).value);
  if (quantity > 0) {
      cart.push({
          product: products[index],
          quantity
      });
      alert(`Se agregó ${quantity} ${products[index].title}(s) al carrito`);
      document.getElementById(`quantity${index}`).value = 1;
  }
}

//---------------------------------------->FIN<----------------------------------------

//CODIGO PARA CUMPLIMIENTO DE REQUISITOS DE PRE ENTREGA
//INICIO CODIGO PARA CUMPLIMIENTO DE REQUISITOS DE PRE ENTREGA

//-->CREACION DE CLASES<--
class Producto {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }

    // Método para obtener la información del producto
    mostrarInfo() {
        return `Nombre: ${this.title}\nDescripción: ${this.description}\nPrecio: $${this.price.toFixed(2)}\n`;
    }
}

//-->CREACION DE VARIABLES<--
// Llamar a la función cargarCatalogo para obtener el catálogo de productos
const catalogoDeProductos = cargarCatalogo();

//-->CREACION DE FUNCIONES<--
// Definir la función cargarCatalogo
function cargarCatalogo() {
    const catalogo = [];

    // Recorrer el arreglo products y crear instancias de Producto
    products.forEach((product) => {
        const producto = new Producto(
            product.title,
            product.description,
            product.price
        );
        catalogo.push(producto);
    });

    return catalogo;
}

function finalizarCompra() {
    ////-->USO DE FUNCIONES DECLARADAS POSTERIORMENTE <--
    const totalCompra = calcularTotalCompra();

    //-->USO DE CONDICIONALES<--
    if (totalCompra <= 0) {
        alert("El total de la compra debe ser mayor a cero. Agrega productos al carrito antes de finalizar la compra.");
        return;
    }
    else{
        ////-->USO DE FUNCIONES DECLARADAS POSTERIORMENTE <--
        const nombreUsuario = pedirNombre();

        //-->USO DE CONDICIONALES<--
        if (nombreUsuario !== null) {
            alert(`Hola, ${nombreUsuario}! Vamos a finalizar la compra.`);

            const medioPagoSeleccionado = solicitarMedioDePago();
        
        if (medioPagoSeleccionado !== null) {
            let mensaje = `Has seleccionado: ${medioPagoSeleccionado}`;

            // Calcular el total de la compra si el pago es efectivo/débito
            if (medioPagoSeleccionado === "Efectivo/Débito") {
                const totalCompra = calcularTotalCompra();
                mensaje += `\nTotal de la compra: $${totalCompra.toFixed(2)}`;
            } else if (medioPagoSeleccionado.startsWith("Tarjeta de Crédito")) {
                const cuotas = obtenerCantidadCuotas(medioPagoSeleccionado);                
                const precioPorCuota = totalCompra / cuotas;
                mensaje += `\nTotal de la compra: $${totalCompra.toFixed(2)}`;
                mensaje += `\nCantidad de cuotas: ${cuotas}`;
                mensaje += `\nPrecio por cuota: $${precioPorCuota.toFixed(2)}`;
            }

                alert(mensaje); 
                alert('Compra finalizada con exito. Gracias por su preferencia!'); 
                cart.length = 0;                   
            }
        } 
    }        
}

//Solcita el nombre al cliente, se valida que no se vacio y que solo tenga letras
function pedirNombre() {
    let nombre = "";
    let valido = false;

    while (!valido) {
        nombre = prompt("Por favor, ingresa tu nombre:");

        if (nombre === null) {
            // El usuario canceló la entrada
            return null;
        }

        // Validar que el nombre no esté vacío y solo contenga letras
        if (nombre.trim() === "") {
            alert("El nombre no puede estar vacío. Por favor, ingresa tu nombre.");
        } else if (!/^[A-Za-zÁ-ÿ\s]+$/.test(nombre)) {
            alert("El nombre solo puede contener letras. Por favor, ingresa un nombre válido.");
        } else {
            valido = true;
        }
    }

    return nombre;
}

//Funcioón que solicita el medio de pago para la compra
function solicitarMedioDePago() {
    let medioPago = "";
    let valido = false;

    while (!valido) {
        medioPago = prompt("Selecciona el medio de pago:\n1 - Efectivo/Débito\n2 - Tarjeta de Crédito");

        if (medioPago === null) {
            // El usuario canceló la entrada
            return null;
        }

        if (medioPago !== "1" && medioPago !== "2") {
            alert("Opción no válida. Por favor, selecciona 1 para Efectivo/Débito o 2 para Tarjeta de Crédito.");
        } else {
            valido = true;
        }
    }

    if (medioPago === "2") {
        let cuotas = "";
        valido = false;

        while (!valido) {
            cuotas = prompt("Selecciona la cantidad de cuotas:\n2, 4, 6 u 12");

            if (cuotas === null) {
                // El usuario canceló la entrada
                return null;
            }

            if (cuotas !== "2" && cuotas !== "4" && cuotas !== "6" && cuotas !== "12") {
                alert("Opción no válida. Por favor, selecciona 2, 4, 6 u 12 para la cantidad de cuotas.");
            } else {
                valido = true;
            }
        }

        return `Tarjeta de Crédito (${cuotas} cuotas)`;
    } else {
        return "Efectivo/Débito";
    }
}

// Función para calcular el total de la compra
function calcularTotalCompra() {
    let total = 0;
    for (const item of cart) {
        total += item.product.price * item.quantity;
    }
    return total;
}

// Función para obtener la cantidad de cuotas
function obtenerCantidadCuotas(medioPagoSeleccionado) {
    let partes = medioPagoSeleccionado.split(" ")
    return parseInt(partes[3].replace("(", ""));    
}

function menu() {
    let salirMenu = false;
    do {
        let opcionIngresada = parseInt(prompt(`Ingrese el número de la opción deseada
            1 - Consultar catálogo
            2 - Consultar catálogo ordenado alfabéticamente por nombre
            3 - Buscar por nombre
            4 - Buscar por precio
            5 - Listar productos de menor a mayor por precio
            6 - Listar productos de mayor a menor por precio            
            0 - Salir del menú`));

        // Validar que la opción ingresada sea un número y esté dentro del rango válido
        if (!isNaN(opcionIngresada) && opcionIngresada >= 0 && opcionIngresada <= 6) {
            switch (opcionIngresada) {
                case 1:
                    consultarCatalogo();
                    break;
                case 2:
                    consultarCatalogoAlfabeticamente();
                    break;
                case 3:
                    buscarPorNombre();
                    break;
                case 4:
                    buscarPorPrecio();
                    break;
                case 5:
                    listarProductosMenorMayorPrecio();
                    break;
                case 6:
                    listarProductosMayorMenorPrecio();
                    break;
                case 0:
                    salirMenu = true;
                    break;
            }
        } else {
            alert("Opción no válida. Por favor, ingrese una opción válida del menú.");
        }
    } while (!salirMenu);
}


function consultarCatalogo() {
    let mensaje = "Catálogo de Productos:\n\n";   

    catalogoDeProductos.forEach((producto) => {
        mensaje += producto.mostrarInfo(); // Llama al método getInfo del producto
        mensaje += "\n";
    });

    alert(mensaje);
}

function buscarPorNombre() {
    let textoBusqueda = "";

    while (textoBusqueda.trim() === "") {
        textoBusqueda = prompt("Ingrese el texto a buscar en el nombre de los productos:");

        if (textoBusqueda === null) {
            return; // El usuario canceló la búsqueda
        }

        if (textoBusqueda.trim() === "") {
            alert("El texto de búsqueda no puede estar vacío. Por favor, ingrese un texto válido.");
        }
    }

    // Filtrar los productos que contienen el texto en su nombre
    const productosEncontrados = catalogoDeProductos.filter((producto) => {
        return producto.title.toLowerCase().includes(textoBusqueda.toLowerCase());
    });

    if (productosEncontrados.length === 0) {
        alert("No se encontraron productos con el texto especificado en el nombre.");
    } else {
        let mensaje = `Productos encontrados con "${textoBusqueda}":\n\n`;

        productosEncontrados.forEach((producto) => {
            mensaje += producto.mostrarInfo(); // Llama al método mostrarInfo del producto
            mensaje += "\n";
        });

        alert(mensaje);
    }
}

function buscarPorPrecio() {
    let precioIngresado = null;

    while (precioIngresado === null || isNaN(precioIngresado) || precioIngresado < 0) {
        const precioTexto = prompt("Ingrese el precio máximo a pagar para buscar productos:");

        if (precioTexto === null) {
            return; // El usuario canceló la búsqueda
        }

        precioIngresado = parseFloat(precioTexto);

        if (isNaN(precioIngresado) || precioIngresado < 0) {
            alert("El precio ingresado no es válido. Por favor, ingrese un valor numérico mayor o igual a cero.");
        }
    }

    // Filtrar los productos cuyo precio sea igual o mayor al precio ingresado
    const productosEncontrados = catalogoDeProductos.filter((producto) => {
        return producto.price <= precioIngresado;
    });

    if (productosEncontrados.length === 0) {
        alert(`No se encontraron productos con precio igual o menor a $${precioIngresado.toFixed(2)}.`);
    } else {
        let mensaje = `Productos encontrados con precio igual o menor a $${precioIngresado.toFixed(2)}:\n\n`;

        productosEncontrados.forEach((producto) => {
            mensaje += producto.mostrarInfo(); // Llama al método mostrarInfo del producto
            mensaje += "\n";
        });

        alert(mensaje);
    }
}

function consultarCatalogoAlfabeticamente() {
    // Copia el catálogo de productos para no modificar el original
    const catalogoOrdenado = [...catalogoDeProductos];

    // Ordena el catálogo alfabéticamente por el campo title
    catalogoOrdenado.sort((a, b) => a.title.localeCompare(b.title));

    let mensaje = "Catálogo de Productos (Ordenado Alfabéticamente):\n\n";

    catalogoOrdenado.forEach((producto) => {
        mensaje += producto.mostrarInfo(); // Llama al método mostrarInfo del producto
        mensaje += "\n";
    });

    alert(mensaje);
}

function listarProductosMenorMayorPrecio() {
    // Copia el catálogo de productos para no modificar el original
    const catalogoOrdenado = [...catalogoDeProductos];

    // Ordena el catálogo por precio de menor a mayor
    catalogoOrdenado.sort((a, b) => a.price - b.price);

    let mensaje = "Catálogo de Productos (Ordenado por Precio de Menor a Mayor):\n\n";

    catalogoOrdenado.forEach((producto) => {
        mensaje += producto.mostrarInfo(); // Llama al método mostrarInfo del producto
        mensaje += "\n";
    });

    alert(mensaje);
}

function listarProductosMayorMenorPrecio() {
    // Copia el catálogo de productos para no modificar el original
    const catalogoOrdenado = [...catalogoDeProductos];

    // Ordena el catálogo por precio de mayor a menor
    catalogoOrdenado.sort((a, b) => b.price - a.price);

    let mensaje = "Catálogo de Productos (Ordenado por Precio de Mayor a Menor):\n\n";

    catalogoOrdenado.forEach((producto) => {
        mensaje += producto.mostrarInfo(); // Llama al método mostrarInfo del producto
        mensaje += "\n";
    });

    alert(mensaje);
}
//FIN CODIGO PARA CUMPLIMIENTO DE REQUISITOS DE PRE ENTREGA

// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los botones
    const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");
    const masOpcionesBtn = document.getElementById("masOpcionesBtn");

    // Agregar evento de clic al botón "Mas Opciones"
    masOpcionesBtn.addEventListener("click", menu);

    // Agregar evento de clic al botón "Finalizar Compra"
    finalizarCompraBtn.addEventListener("click", finalizarCompra);
});