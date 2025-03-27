const botonSubmit = document.getElementById('boton');
const celularBeneficiario = document.querySelector('#celularBeneficiario');
const cedulaBeneficiario = document.querySelector('#cedulaBeneficiario');
const bancoBeneficiario = document.querySelector('#bancoBeneficiario');
const monto = document.querySelector('#monto');
const asunto = document.querySelector('#asunto');
var money = 1000.00;

botonSubmit.addEventListener("click",comprobar);

function comprobar(){//Cuando se le da a Siguiente

    if(celularBeneficiario.value === "" || cedulaBeneficiario.value === "" || bancoBeneficiario.value === "" || monto.value === "" || asunto.value === "" || monto.value === "0"){
        //Verificar que los datos no están vacíos e indicar cuáles están vacíos
        if(celularBeneficiario.value === ""){
            celularBeneficiario.style.border = "1px solid red";
        }else{
            celularBeneficiario.style.border = "1px solid lightgrey";
        }
        if(cedulaBeneficiario.value === ""){
            cedulaBeneficiario.style.border = "1px solid red";
        }else{
            cedulaBeneficiario.style.border = "1px solid lightgrey";
        }
        if(bancoBeneficiario.value === ""){
            bancoBeneficiario.style.border = "1px solid red";
        }else{
            bancoBeneficiario.style.border = "1px solid lightgrey";
        }
        if(monto.value === "" || monto.value === "0"){
            monto.style.border = "1px solid red";
        }else{
            monto.style.border = "1px solid lightgrey";
        }
        if(asunto.value === ""){
            asunto.style.border = "1px solid red";
        }else{
            asunto.style.border = "1px solid lightgrey";
        }
        


    }else{
        celularBeneficiario.style.border = "1px solid lightgrey";
        cedulaBeneficiario.style.border = "1px solid lightgrey";
        bancoBeneficiario.style.border = "1px solid lightgrey";
        monto.style.border = "1px solid lightgrey";
        asunto.style.border = "1px solid lightgrey";//Los datos no están vacíos, ponerlo todo gris

        if(celularBeneficiario.value.length !== 12){            //Verificación de que todos los datos tengan las longitudes correctas
            celularBeneficiario.style.border = "1px solid red";
            return;
        }
        if(cedulaBeneficiario.value.length !== 8){
            cedulaBeneficiario.style.border = "1px solid red";
            return;
        }
        if(monto.value <= 0){
            monto.style.border = "1px solid red";
            return;
        }




        document.querySelector('#overlay').style.display = "block";//Si todo está bien y correcto, ponemos la pantalla en oscuerida y mostramos nuestra ventana popup
        document.querySelector('#confirmacion').style.display = "flex";
        document.querySelector('#confirmacion').style.flexDirection = "column";
        document.querySelector('#confirmacion').style.borderRadius = "30px";

        var comprobarPago = document.createElement("h2");//titulo de la ventana popup y botones
        var botonCancelar = document.createElement("button");
        var botonConfirmar = document.createElement("button");

        var datosDePago = [];

        for(let i=0 ; i<8; i++){
            datosDePago[i] = document.createElement("p");//Creamos los distintos datos de pago
            datosDePago[i].style.margin = "3px";
        }


        datosDePago[0].textContent = `Nro. Celular: `+celularBeneficiario.value;//Rellenamos todos los datos de Pago
        datosDePago[1].textContent = `Nro. Cédula: `+cedulaBeneficiario.value;
        datosDePago[2].textContent = `Banco Destino: `+bancoBeneficiario.value;
        datosDePago[3].textContent = `Monto: `+ parseFloat(monto.value).toLocaleString('de-DE') + ` Bs`;
        datosDePago[4].textContent = `Asunto: `+asunto.value;

        comprobarPago.textContent = "Comprobar Datos";//Estilizamos el titulo de ventana PopUp
        comprobarPago.style.color = "#240046";
        comprobarPago.style.position = "relative";
        comprobarPago.style.margin = "20px";

        botonCancelar.style.color = "#fff";//Estilizamos los botones 
        botonCancelar.style.background = "#240046";
        botonCancelar.style.fontSize = "18px";
        botonCancelar.style.fontWeight = "500";
        botonCancelar.style.border = "none";
        botonCancelar.style.cursor = "pointer";
        botonCancelar.textContent = "Cancelar"
        botonCancelar.style.borderRadius = "10px";
        botonCancelar.style.padding = "5px";
        botonCancelar.style.marginTop = "20px";
        botonConfirmar.style.color = "#fff";
        botonConfirmar.style.background = "#240046";
        botonConfirmar.style.fontSize = "18px";
        botonConfirmar.style.fontWeight = "500";
        botonConfirmar.style.border = "none";
        botonConfirmar.style.cursor = "pointer";
        botonConfirmar.textContent = "Confirmar"
        botonConfirmar.style.borderRadius = "10px";
        botonConfirmar.style.padding = "5px";
        botonConfirmar.style.marginTop = "50px";

        document.querySelector('#confirmacion').appendChild(comprobarPago);//añadimos el titulo y los datos de pago  y los botonesa la ventana popup

        for(let i=0; i<5; i++){
            document.querySelector('#confirmacion').appendChild(datosDePago[i]);
        }

        document.querySelector('#confirmacion').appendChild(botonConfirmar);
        document.querySelector('#confirmacion').appendChild(botonCancelar);

        botonCancelar.addEventListener("click",volver);//Cuando se le de al botón cancelar

        function volver(){
            document.querySelector('#overlay').style.display = "none";//ocultar la el oscurecimiento

            if(document.querySelector('#confirmacion').contains(botonConfirmar)){//remover a los botonessi estaban
                document.querySelector('#confirmacion').removeChild(botonConfirmar);
            }
            if(document.querySelector('#confirmacion').contains(botonCancelar)){
                document.querySelector('#confirmacion').removeChild(botonCancelar);
            }

            document.querySelector('#confirmacion').style.display = "none";//ocultar la ventana popup y remover el titulo
            comprobarPago.remove();

            for(let i=0; i<8; i++){
                datosDePago[i].remove();//remover los datos de pago
            }
        }
        
        
            botonConfirmar.addEventListener("click",continuarPago);//Cuando se le da a Continuar

            function continuarPago(){

                document.querySelector('#confirmacion').style.height = "450px";//Hacer la ventana popup más grande
                    
                if(money <= monto.value){//Si el monto a depositar es mayor o igual al disponible, pago fallido
                    comprobarPago.textContent = "Pago Fallido";
                    datosDePago[0].textContent = "Fondos Insuficientes";

                    document.querySelector('#confirmacion').removeChild(datosDePago[1]);//remover todos los botones y datos
                    document.querySelector('#confirmacion').removeChild(datosDePago[2]);
                    document.querySelector('#confirmacion').removeChild(datosDePago[3]);
                    document.querySelector('#confirmacion').removeChild(datosDePago[4]);
                    botonConfirmar.style.display = "none";
                    botonCancelar.textContent = "Continuar";

                }else{
                    document.querySelector('#confirmacion').removeChild(datosDePago[0]);//En caso de que el monto sea correcto, remover los datos de pago y los botones y pasar a verificacion 2FA
                    document.querySelector('#confirmacion').removeChild(datosDePago[1]);
                    document.querySelector('#confirmacion').removeChild(datosDePago[2]);
                    document.querySelector('#confirmacion').removeChild(datosDePago[3]);
                    document.querySelector('#confirmacion').removeChild(datosDePago[4]);
                    comprobarPago.textContent = "Por favor Introduza el Token de A2F";//Cambiar y reposicionar para reutilzar los elementos
                    comprobarPago.style.marginTop = "2%";
                    comprobarPago.style.top = "0";
                    comprobarPago.style.position= "absolute";
                    comprobarPago.style.textAlign = "center";
                    botonCancelar.remove();
                    botonConfirmar.remove();

                    let inputToken = document.createElement("input");//Crear un botón y un input para cuando se introduzca la A2F
                    let submitToken = [];

                    for(let i=0; i<2;i++){//Estilizar losbotones
                        submitToken[i] = document.createElement("button");
                        submitToken[i].style.color = "#fff";
                        submitToken[i].style.background = "#240046";
                        submitToken[i].style.fontSize = "18px";
                        submitToken[i].style.fontWeight = "500";
                        submitToken[i].style.border = "none";
                        submitToken[i].style.padding = "5px 20px 5px 20px";
                        submitToken[i].style.marginTop = "40px";
                        submitToken[i].style.cursor = "pointer";
                        submitToken[i].style.borderRadius = "40px";
                        submitToken[i].style.transition = "all 0.3 ease";
                        submitToken[i].type = "submit";
                    }
                    submitToken[0].textContent = "Verificar";
                    submitToken[1].textContent = "Cancelar";

                    inputToken.style.height = "10%";//Estilizar el input
                    inputToken.style.width = "80%";
                    inputToken.style.paddingLeft = "20px";
                    inputToken.style.borderRadius = "25px";
                    inputToken.style.outline = "none";
                    inputToken.style.fontSize = "17px";
                    inputToken.style.border = "1px solid lightgrey";
                    inputToken.style.transition = "all 0.3 ease";
                    inputToken.type = "text"
                    inputToken.required = true;



                    document.querySelector('#confirmacion').appendChild(inputToken);
                    document.querySelector('#confirmacion').appendChild(submitToken[0]);                   
                    document.querySelector('#confirmacion').appendChild(submitToken[1]);//Agregar al input y los botones


                    submitToken[0].addEventListener("click",finalizarPago);//Cuando se continua
                    submitToken[1].addEventListener("click",cancelarPago);//Cuando se cancela el pago en la verificacion

                    function cancelarPago(){//Remover el input, los botones, y luego pasar a la cancelación normal
                        inputToken.remove();
                        submitToken[0].remove();
                        submitToken[1].remove();
                        volver();
                    }
                    

                    function finalizarPago(){//Cuando se hace la verificación 2FA

                        if(inputToken.value === ""){//Si no hay nada en el input de la A2F, no hacer nada hasta que tenga un dato
                            inputToken.style.borderColor = "red";

                            return;
                        }


                        document.querySelector('#confirmacion').removeChild(inputToken);//Si se hizo la autenticación, quitar el input y los botones
                        document.querySelector('#confirmacion').removeChild(submitToken[0]);
                        document.querySelector('#confirmacion').removeChild(submitToken[1]);

                        for(let i=0; i<5; i++){
                            document.querySelector('#confirmacion').appendChild(datosDePago[i]); //Volver a poenr los datos de pago
                        }

                        comprobarPago.textContent = "Pago Exitoso";//Reutilizar los elementos

                        money -= monto.value;//Restar el dinero
                                                                                //Aquí reemplazamos los anteriores datos de Pago para poder reacomodarlos en la factura y que se vea más ordenado
                        datosDePago[0].textContent = "Código de Operación: 0000" + parseInt((Math.random() * 9999) +1000);//Generar un numero de transacción
                        let Fecha = new Date();
                        let Hora = new Date();
                        datosDePago[1].textContent = "Fecha: " + Fecha.toLocaleDateString();//Asignar fecha y hora
                        datosDePago[2].textContent = "Hora: " + Fecha.toLocaleTimeString();

                        datosDePago[3].textContent = `Nro. Celular: `+celularBeneficiario.value;//Asignar los datos anteriores que antes cambiamos
                        datosDePago[4].textContent = `Nro. Cédula: `+cedulaBeneficiario.value;
                        datosDePago[5].textContent = `Banco Destino: `+bancoBeneficiario.value;
                        datosDePago[6].textContent = `Monto: `+ parseFloat(monto.value).toLocaleString('de-DE') + ` Bs`;
                        datosDePago[7].textContent = `Asunto: `+asunto.value;

                        celularBeneficiario.value = "";//Poner todos los datos de la aplicación vacíos 
                        cedulaBeneficiario.value = "";
                        bancoBeneficiario.value = "";
                        monto.value = "";
                        asunto.value = "";

                        document.querySelector('#moneymoney').textContent = parseFloat(money).toLocaleString('de-DE');//actualizar el dinero en la aplicación

                        botonCancelar.remove();
                        botonConfirmar.remove();//Quitar los botones para poder poner primero los datos de pago
                    
                        for(let i=5; i<8; i++){
                            document.querySelector('#confirmacion').appendChild(datosDePago[i]); //Poner los datos de pago
                        }

                        document.querySelector('#confirmacion').appendChild(botonCancelar);

                        botonCancelar.textContent = "Continuar"//Reusar el boton Cancelar
                    }

                }

            }

    }

}



document.querySelector('#PagoPorQR').addEventListener("click",verificacionBio);//Cuando se pone el botón de Verificación Biométrica


function verificacionBio(){

    document.querySelector('#overlay').style.display = "block";//Oscurecer la pantalla, poner la ventan popUp y mostrar la linea que hace la animación
    document.querySelector('#confirmacion').style.display = "flex";
    document.querySelector('#confirmacion').style.flexDirection = "column";
    document.querySelector('#confirmacion').style.borderRadius = "30px";
    document.querySelector('#confirmacion').style.height = "300px";
    document.querySelector('#lineaBio').style.display = "block";


    var huella = document.createElement("img");//Crear, estilizar y añadir la imagen de la huella
    huella.src="https://www.svgrepo.com/show/5105/fingerprint.svg"
    huella.style.width = "100px";
    huella.style.height = "100px";
    document.querySelector('#confirmacion').appendChild(huella);


    var Verificacion = document.createElement("h2");//Crear, estilizar y añadir el título de la ventana PopUp
    Verificacion.textContent = "Por favor, verifique su huella...";
    Verificacion.style.fontSize = "20px";
    Verificacion.style.color = "#240046";
    Verificacion.style.top = "0";
    Verificacion.style.marginTop = "10%";
    Verificacion.style.position = "absolute";
    document.querySelector('#confirmacion').appendChild(Verificacion);
    
    setTimeout(pagoPorQr,3000)//Despues de 2,9 segundos, remover la huella y el título, y después de 3, ir a la animación del escáner de QR
    setTimeout(removerCosas,2999);

    function removerCosas(){
        huella.remove();
        Verificacion.remove();
    }


}



function pagoPorQr(){


    document.querySelector('#lineaBio').style.display = "none";//Quitar la linea de Verificación Biométrica
    document.querySelector('#confirmacion').style.height = "400px";//ajustar el tamaño de la ventana popUp y mostrar la linea de la animacion del escáner del qr
    document.querySelector('#qrAnimation').style.display = "block";

    var escaneandoQR = document.createElement("h2");//crear, estilizar y añadir el título de la ventana de escanear QR
    escaneandoQR.textContent = "Escaneando QR...";
    escaneandoQR.style.marginTop = "1.7%"
    escaneandoQR.style.color = "#240046";
    escaneandoQR.style.top = "0";
    escaneandoQR.style.position = "absolute";
    document.querySelector('#confirmacion').appendChild(escaneandoQR);

    setTimeout(llenarQR,3000);//Despues de 3 segundos, llenar los datos después de escanear el QR

    function llenarQR(){

        let bancos = ['BDV BANCO DE VENEZUELA ','BANCARIBE','BANCAMIGA','BANCRECER','BANESCO','MERCANTIL BANCO','BANCO CARONI','BANCO ACTIVO','BANCO PLAZA','BANFANB'];
        let MMD = ['424','426','414','416','412']//Un arreglo de los códigos de Bancos y los códigos de números telefónicos para poder hacerlo aleatorio y bonito
        celularBeneficiario.value = "58"+ MMD[parseInt(Math.random() * 4)] + parseInt(( (Math.random() * 9999999) + 1000000));//Asignar el celular, la cedula y el banco
        cedulaBeneficiario.value = parseInt( (Math.random() * 27000000) + 8000000 );
        bancoBeneficiario.value = bancos[parseInt(Math.random() * 9)];

        document.querySelector('#overlay').style.display = "none";//ocultar la pantalla popUp, el oscurecimiento, la linea de animación del QR y eliminar el título porque la animación ya acabó
        document.querySelector('#confirmacion').style.display = "none";
        document.querySelector('#qrAnimation').style.display = "none";
        escaneandoQR.remove();



    }


}