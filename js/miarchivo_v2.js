//CONSTRUCTOR DE CLASE
class Producto {
    constructor(image ,title, description, price) {
        this.image = image;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    // Método para obtener la información del producto
    mostrarInfo() {
        return `Nombre: ${this.title}\nDescripción: ${this.description}\nPrecio: $${this.price.toFixed(2)}\n`;
    }
}

//INSTACIACION DE LOS ARTÍCULOS DEL CATÁLOGO DE PROTEÍNAS
const prote1 = new Producto('../img/Suplementos/WheyProtein/WheyProtein_1-removebg-preview.png',
                            'Iridium Whey Concentrado',
                            'El concentrado es la proteína ideal para el día a día. De alto valor biológico, es el complemento más importante para quienes buscan aumentar la fuerza y ​​ganar masa muscular.',
                            19.99);

const prote2 = new Producto('../img/Suplementos/WheyProtein/WheyProtein_2-removebg-preview.png',
                            'Universal Ultra Whey Pro',
                            'Sirve para aumentar tu masa muscular. Para crecer es necesario entrenar con sobrecarga, levantar pesas, de esa manera las fibras musculares se dañan durante el entrenamiento y al reestructurase durante el descanso aumentan su tamaño.',
                            24.99);

const prote3 = new Producto('../img/Suplementos/WheyProtein/WheyProtein_3-removebg-preview.png',
                            'Integralmedica Whey Protein',
                            'Promueve el aumento de masa muscular a través del incremento de síntesis proteica. Mantiene balance positivo de nitrógeno, evitando la degradación de músculo.',
                            29.99);

//VERIFICACION DE EXISTENCIA DEL CATALOGO DE PROTEINAS EN EL LOCALSTORAGE
let cart = [];
let catalogoDeProductos = []
if(localStorage.getItem("catalogoDeProductos")){
    //hacer for of de catalogoDeProductos y pasarle new Producto
    for(let producto of JSON.parse(localStorage.getItem("catalogoDeProductos"))){
        let productoStorage = new Producto (producto.image,producto.title,producto.description,producto.price)
        catalogoDeProductos.push(productoStorage)
    }

}else{
   //no existe catalogoDeProductos, por lo que se setea por primera vez
   catalogoDeProductos.push(prote1,prote2,prote3);
   localStorage.setItem("catalogoDeProductos", JSON.stringify(catalogoDeProductos))
}

//SE SETA POR PRIMERA VEZ EL ARRAY DE productosCarrito 
//let productosCarrito = JSON.parse(localStorage.getItem("carrito")) ?? []
let productGrid = document.getElementById('productGrid');
let selectOrden = document.getElementById("selectOrden");
let buscador = document.getElementById("buscador");
let coincidenciasDiv = document.getElementById("coincidenciasDiv");

//FUNCIONES
const maxDescriptionLength = 100; // Número máximo de caracteres para la descripción

function mostrarCatalogoDOM(array){
    //resetear el container
    productGrid.innerHTML = "";

    if(array.length > 0){
        array.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4 mb-4';
        
            // Limitar la descripción a un número máximo de caracteres
            const truncatedDescription = product.description.length > maxDescriptionLength
                ? product.description.slice(0, maxDescriptionLength) + '...'
                : product.description;
        
            productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top product-image mx-auto" alt="${product.title}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${truncatedDescription}</p>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <div class="input-group mb-3">
                        <span class="input-group-text">
                            <button type="button" class="btn btn-sm" onclick="decreaseQuantity(${index})">-</button>
                        </span>
                        <input type="number" class="form-control" value="1" min="1" id="quantity${index}">
                        <span class="input-group-text">
                            <button type="button" class="btn btn-sm" onclick="increaseQuantity(${index})">+</button>
                        </span>
                        <button class="btn btn-warning" onclick="addToCart(${index})">Agregar</button>
                    </div>
                </div>
            </div>
            `;
        
            // Establecer atributos de alto y ancho máximo a la imagen
            const imageElement = productCard.querySelector('.product-image');
            imageElement.setAttribute('style', 'max-width: 300px; max-height: 350px;');
        
            productGrid.appendChild(productCard);
        });
    }    
}

function listarProductosMayorMenorPrecio(array){
    //copiar array: 
    // Copia el catálogo de productos para no modificar el original
    const catalogoOrdenado = [...array];

    // Ordena el catálogo por precio de mayor a menor
    catalogoOrdenado.sort((a, b) => b.price - a.price);
    mostrarCatalogoDOM(catalogoOrdenado);
}

function listarProductosMenorMayorPrecio(array){
    //copiar array: 
    // Copia el catálogo de productos para no modificar el original
    const catalogoOrdenado = [...array];

    // Ordena el catálogo por precio de mayor a menor
    catalogoOrdenado.sort((a, b) => a.price - b.price);
    mostrarCatalogoDOM(catalogoOrdenado);
}

function consultarCatalogoAlfabeticamente(array){
    //copiar array: 
    // Copia el catálogo de productos para no modificar el original
    const catalogoOrdenado = [...array];

    // Ordena el catálogo por precio de mayor a menor
    catalogoOrdenado.sort((a, b) => a.title.localeCompare(b.title));
    mostrarCatalogoDOM(catalogoOrdenado);
}

function buscarInfo(buscado,array){
    //me devuelve un array vacio si no encuentra, sino un array elementos con la coincidencias
    let coincidencias = array.filter(
        (producto) => {
            //includes cualquier coincidencia parcial en el string con includes
            return producto.title.toLowerCase().includes(buscado.toLowerCase()) || producto.description.toLowerCase().includes(buscado.toLowerCase())
        }
    )    
    //ternario para evaluar si coincidencias está vacio
    //ternario, tenemos varias instrucciones encerrar entre parentesis y separar por coma ,
    coincidencias.length > 0 ? (mostrarCatalogoDOM(coincidencias), coincidenciasDiv.innerHTML ="") : (mostrarCatalogoDOM(array), coincidenciasDiv.innerHTML = `<h3>No hay coincidencias con su búsqueda, este es nuestro catálogo completo</h3>`);
}

function addToCart(index) {
    const quantity = parseInt(document.getElementById(`quantity${index}`).value);
    if (quantity > 0) {
        cart.push({
            product: catalogoDeProductos[index],
            quantity
        });
        //alert(`Se agregó ${quantity} ${products[index].title}(s) al carrito`);
        document.getElementById(`quantity${index}`).value = 1;
  
        // Llamar a la función para actualizar el botón de carrito
        actualizarBotonCarrito();
    }
  }

//FUNCIONES AUXILIARES
//Funcion para decrementar las cantidades de unidades a agregar al carrito
function decreaseQuantity(index) {
    const quantityInput = document.getElementById(`quantity${index}`);
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}
//Funcion para aumentar las cantidades de unidades a agregar al carrito
function increaseQuantity(index) {
    const quantityInput = document.getElementById(`quantity${index}`);
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function iniciarSesion() {
    // Obtener los valores de usuario y contraseña ingresados
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Verificar si el usuario y la contraseña son "admin"
    if (usuario === "admin" && contrasena === "admin") {
        // Mostrar el modal idModalAgregarSuplemento
        $('#myModal').modal('hide'); // Cierra el modal de inicio de sesión
        $('#idModalAgregarSuplemento').modal('show'); // Muestra el otro modal
    } else {
        // Mostrar un mensaje de error
        alert("Los datos son incorrectos. Inténtalo de nuevo.");
    }

    document.getElementById("usuario").value = "";
    document.getElementById("contrasena").value = "";
}

function actualizarBotonCarrito() {
    const botonCarrito = document.getElementById('botonCarrito');
    const carritoCantidad = document.getElementById('carritoCantidad');

     // Calcular la suma de las cantidades de los productos en el carrito
     let totalCantidad = 0;
     for (const item of cart) {
         totalCantidad += item.quantity;
     }

    // Verificar si hay productos en el carrito
    if (totalCantidad > 0) {
        // Si hay productos en el carrito, establecer la clase a "btn-danger"
        botonCarrito.classList.remove('btn-secondary');
        botonCarrito.classList.add('btn-danger');
        carritoCantidad.textContent = ' ' + totalCantidad.toString();;
    } else {
        // Si no hay productos en el carrito, establecer la clase a "btn-secondary"
        botonCarrito.classList.remove('btn-danger');
        botonCarrito.classList.add('btn-secondary');
    }

    // Actualizar la cantidad de productos en el carrito    
    //carritoCantidad.textContent = ' ' + cart.length.toString();
}

//EVENTOS DEL PROYECTO
selectOrden.addEventListener("change", () => {
    switch(selectOrden.value){
        case "1":
            listarProductosMayorMenorPrecio(catalogoDeProductos)
        break
        case "2":
            listarProductosMenorMayorPrecio(catalogoDeProductos)
        break
        case "3":
            consultarCatalogoAlfabeticamente(catalogoDeProductos)
        break
        default:
            mostrarCatalogoDOM(catalogoDeProductos)
        break
    }
})

buscador.addEventListener("input", () => {
    buscarInfo(buscador.value,catalogoDeProductos)
})

// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnIniciarSesion").addEventListener("click", iniciarSesion);
});

//CÓDIGO
mostrarCatalogoDOM(catalogoDeProductos);