var btn1 = document.getElementById("btn1");

btn1.addEventListener('click', ingreso)
function ingreso() {
    var email1 = document.getElementById("email1").value;
    var clave1 = document.getElementById("clave1").value;

    firebase.auth().signInWithEmailAndPassword(email1, clave1)
        .then((userCredential) => {
            var user = userCredential.user;
            document.getElementById("email1").value = "";
            document.getElementById("clave1").value = "";
            M.toast({ html: "Haz iniciado sesion con exito!" })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            M.toast({html: error.message})
        });
}
function comprobar() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            mostrar(user);
            console.log("****************");
            console.log(user.emailVerified);
            console.log("****************");
            var uid = user.uid;
            var emailVerified = user.emailVerified;

        } else {
            console.log("no existe un usuario activo");

        }
    });

}
comprobar();
function cerrarSesion() {
    firebase.auth().signOut()
        .then(function () {
            location.reload(1000);
            console.log("Saliendo..."); 
            M.toast({html:"Haz cerrado sesion con exito!"})

        })
        .catch(function (error) {
            console.log(error);
           
        })

}
function mostrar(user) {
    var user = user;
    var buttons = document.getElementById("buttons");
    var button = document.getElementById("button");
    var usuarios = document.getElementById("usuarios");

    if (user.emailVerified) {

        usuarios.innerHTML = `
        <div class="col l10 offset-l1">

           <button class="btn red darken-2 left" style="background: url(img/black-felt.png); font-family: 'Sriracha', cursive;  border-radius: 25px">Usuario: ${user.email}</button>
           
        </div>
        
        `;
        

        buttons.innerHTML = `
        
        <div class="col l10 offset-l1" >
            <a href="Add.html"><button class="btn blue darken-2 left" style="background: url(img/black-felt.png); margin-right: 10px; font-family: 'Sriracha', cursive; border-radius: 25px" >Ingresar al sistema</button></a>

            
                
           

        </div>
        

        
        
        `;
        button.innerHTML = `
        <div class="col l10 offset-l1">

           <button class="btn blue darken-2 left" style="background: url(img/black-felt.png);margin-left: 10px; font-family: 'Sriracha', cursive; border-radius: 25px" onclick="cerrarSesion()">Cerrar</button>

        </div>

        `;
    }
}