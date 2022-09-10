




function cargarBase(){

    function Product(title,descr,precio){
        this.title = title;
        this.descr = descr;
        this.precio = precio;
    }

    var titleCapturar = document.getElementById('productTitle').value;
    var descriptionCapturar = document.getElementById('productDescription').value;
    var urlCapturar = document.getElementById('price').value;

    nuevoProducto = new Product(titleCapturar,descriptionCapturar,urlCapturar);
    console.log(nuevoProducto);
    agregar();

}

var baseDatos = [];

function agregar(){
    baseDatos.push(nuevoProducto);
    console.log(baseDatos);
    document.getElementById("tabla").innerHTML += '<tbody><td>'+nuevoProducto.title+'</td><td>'+nuevoProducto.descr+'</td><td>'+nuevoProducto.precio+'</td></tbody>'

};
function Export() {
    html2canvas(document.getElementById('tabla'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("Base_de_datos.pdf");
        }
    });
}
    
     

