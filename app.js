// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC8opUCemrtjtveEfuYfu6YwIZc8SXd2lc",
    authDomain: "usuarios-72650.firebaseapp.com",
    projectId: "usuarios-72650"
});

var db = firebase.firestore();

function agregar() {
    var titulo = document.getElementById("titulo").value;
    var tipo = document.getElementById("tipo").value;
    var descripcion = document.getElementById("descripcion").value;
    db.collection("datos").add({
        title: titulo,
        type: tipo,
        description: descripcion
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("titulo").value = '';
            document.getElementById("tipo").value = '';
            document.getElementById("descripcion").value = '';
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
            <td class="center">${doc.data().title}</td>
            <td>${doc.data().type}</td>
            <td>${doc.data().description}</td>
            <td><button class="btn red darken-2" style="border-radius: 20px; font-family: 'Sriracha', cursive; background: url(img/black-felt.png);" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn yellow darken-2" style="border-radius: 20px; font-family: 'Sriracha', cursive; background: url(img/black-felt.png);" onclick="editar('${doc.id}','${doc.data().title}','${doc.data().type}','${doc.data().description}')"><i class="material-icons">person</i></button></td>
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

    document.getElementById('titulo').value = titulo;
    document.getElementById('tipo').value = tipo;
    document.getElementById('descripcion').value = descripcion;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar'
    boton.onclick = function () {
        var washingtonRef = db.collection("datos").doc(id);
        // Set the "capital" field of the city 'DC'
        var titulo = document.getElementById('titulo').value;
        var tipo = document.getElementById('tipo').value;
        var descripcion = document.getElementById('descripcion').value;
        return washingtonRef.update({
            title: titulo,
            type: tipo,
            description: descripcion
        })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Agregar'
                document.getElementById('titulo').value = '';
                document.getElementById('tipo').value = '';
                document.getElementById('descripcion').value = '';
               
               
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

}

