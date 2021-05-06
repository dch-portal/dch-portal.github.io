// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC8opUCemrtjtveEfuYfu6YwIZc8SXd2lc",
    authDomain: "usuarios-72650.firebaseapp.com",
    projectId: "usuarios-72650"
});

var db = firebase.firestore();

function agregar() {
    var producto = document.getElementById("producto").value;
    var tipo = document.getElementById("tipo").value;
    var stock = document.getElementById("stock").value;
    db.collection("datos").add({
        product: producto,
        type: tipo,
        stock: stock
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("producto").value = '';
            document.getElementById("tipo").value = '';
            document.getElementById("stock").value = '';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}
var tabla = document.getElementById("tabla");
db.collection("datos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
            <td class="center">${doc.data().product}</td>
            <td>${doc.data().type}</td>
            <td>${doc.data().stock}</td>
            <td><button class="btn red darken-2" style="border-radius: 20px; font-family: 'Sriracha', cursive; background: url(img/black-felt.png);" onclick="eliminar('${doc.id}')"><i class="material-icons">delete</i></button></td>
            <td clas="right"><button class="btn yellow darken-2" style="border-radius: 20px; font-family: 'Sriracha', cursive; background: url(img/black-felt.png);" onclick="editar('${doc.id}','${doc.data().title}','${doc.data().type}','${doc.data().description}')"><i class="material-icons">edit</i></button></td>
        </tr>
        `
    });
});
function eliminar(id) {
    db.collection("datos").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function editar(id, titulo, tipo, descripcion) {

    document.getElementById('producto').value = producto;
    document.getElementById('tipo').value = tipo;
    document.getElementById('stock').value = stock;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar'
    boton.onclick = function () {
        var washingtonRef = db.collection("datos").doc(id);
        // Set the "capital" field of the city 'DC'
        var titulo = document.getElementById('producto').value;
        var tipo = document.getElementById('tipo').value;
        var descripcion = document.getElementById('stock').value;
        return washingtonRef.update({
            product: titulo,
            type: tipo,
            stock: descripcion
        })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Agregar'
                document.getElementById('producto').value = '';
                document.getElementById('tipo').value = '';
                document.getElementById('stock').value = '';
               
               
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

}

