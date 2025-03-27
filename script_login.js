const botonRegistrarse = document.querySelector("#botonRegistro");
const botonIniciarSesion = document.querySelector("#botonInicioSesion");

botonRegistrarse.addEventListener("click",registrarUsuario);
botonIniciarSesion.addEventListener("click",iniciarSesionF);

let para = document.createElement("p");
para.style.fontSize = "10px";

function registrarUsuario(){//Cuando se le da a registrar usuario

    const nombreRegistroUsuario = document.querySelector("#registroUsuario");
    const nombreRegistroCorreo = document.querySelector("#registroCorreo");
    const nombreRegistroContrasena = document.querySelector("#registroContrasena");

    if(nombreRegistroUsuario.value === "" || nombreRegistroCorreo.value === "" || nombreRegistroContrasena.value === ""){ //Si los campos están vacios pedir llenarlos
        
        para.textContent = "*Llene todos los campos";
        para.style.color = "red";

        if(botonRegistrarse.contains(para)){
            //Si ya lo pusiste una vez, no hagas nada
        }else{
            botonRegistrarse.append(para);
        }

    }else{//Si los campos tienen datos

        if(!nombreRegistroCorreo.value.includes("@")){//Si no tiene el @ el correo
            para.textContent = "*Introduzca un correo valido";
            para.style.color = "red";
            botonRegistrarse.append(para);
        }else{//                                        Si todo está bien, registrar al usuario
            function regisExito(){
                document.getElementById('chk').checked = false;
                para.remove();
            }
            para.textContent = "Registrado con éxito!";
            para.style.color = "#00FF00";

            if(!botonRegistrarse.contains(para)){//Ponerle el texto de "Registrado con éxito", si no estaba
                botonRegistrarse.append(para);
            }else{
                para.remove();
             botonRegistrarse.append(para);
            }

            localStorage.setItem('usuario',nombreRegistroUsuario.value);
            localStorage.setItem('correo',nombreRegistroCorreo.value);
            localStorage.setItem('contrasena',nombreRegistroContrasena.value);//Guardar los datos
            setTimeout(regisExito,1250);//Regresar a "Iniciar sesion"
        }
    }

}

function iniciarSesionF(){//Cuando se le da al botón de iniciar sesión
    
    const LoginCorreo = document.querySelector("#loginCorreo");
    const loginContrasena = document.querySelector("#loginContrasena");

    if(LoginCorreo.value === "" && loginContrasena.value === ""){//Si los campos están vacíos, pedir que se llenen
        para.textContent = "Llene todos los campos";
        para.style.color = "red";
        botonIniciarSesion.append(para);
    }else if(!loginCorreo.value.includes("@")){//Si los campos no están vacíos pero el correo es inválido
        para.textContent = "*Introduzca un correo valido";
        para.style.color = "red";
        botonIniciarSesion.append(para);
    }else if(LoginCorreo.value !== localStorage.getItem('correo') || loginContrasena.value !== localStorage.getItem('contrasena')){//Si el correo es válido, los campos no están vacíos
        para.textContent = "Usuario o Contraseña incorrectos";                                                                  //  pero no son correctos
        para.style.color = "red";
        document.getElementById("botonInicioSesion").append(para);
    }else{                                                                      //Si todo está bien, pasar a la pantalla
        window.location.href = "formulario_appLocura.html"

    }

}