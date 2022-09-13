




function cargarBase(){

    function Product(title,description,price){
        this.title = title;
        this.description = description;
        this.price = price;
    }

    var titleCapture = document.getElementById('productTitle').value;
    var descriptionCapture = document.getElementById('productDescription').value;
    var priceCapture = document.getElementById('price').value;

    newProduct = new Product(titleCapture,descriptionCapture,priceCapture);
    console.log(newProduct);
    add();

}

var dataBase = [];

function add(){
    dataBase.push(newProduct);
    console.log(dataBase);
    document.getElementById("tabla").innerHTML += '<tbody><td>'+nuevoProducto.title+'</td><td>'+nuevoProducto.description+'</td><td>'+nuevoProducto.price+'</td></tbody>'

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
    
     

