
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <style= width= 22rem >
    <img src=${producto.img} alt= "" height= 300px width= 348px >
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Price: ARS $ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Add to Cart <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        //esta funcion ejecuta el agregar el carrito con la id del producto
        agregarAlCarrito(producto.id)
        Toastify({
            text: `${producto.nombre} was added to Cart`,
            className: "info",
            duration: "3000",
            style: {
              background: "linear-gradient(to right, #00003A, #00003A, #00003A,#FF4A21, #FF4A21 )",
              margin: "70px",
              
            }
          }).showToast();
    })
})



//Agregar al carrito
const agregarAlCarrito = (prodId) => {

    //aumentar cantidad
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)//Trabajamos con las ID
        //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
        carrito.push(item)
    }

    actualizarCarrito() 
}
//agregarAlCarrito(1) //Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe&&item.cantidad>1){
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad--
            }
        })
    }
    else{carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos un elemento 
    }
        
    
    
    
    
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = "" //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Price:$${prod.precio}</p>
        <p>items: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
    //empezando en 0.

}
