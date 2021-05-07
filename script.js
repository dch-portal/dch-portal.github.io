function generarPDF() {
    var pdf = document.getElementById("pdf");

    html2pdf()
    .set({
        margin: 1,
        filename: 'inventario.pdf'
    })
    .from(pdf)
    .save();
    
}
function imprimir() {
    var table = document.getElementById("table");
    window.print(table);
}