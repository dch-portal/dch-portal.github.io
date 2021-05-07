function generarPDF() {
    var pdf = document.getElementById("pdf");

    html2pdf()
    .set({
        filename: 'CatalogoProductos.pdf'
    })
    .from(pdf)
    .save();
    
}
