const boton = document.querySelector('#botonEnviar')                    //Todo esto son los distintos elementos
const celularBeneficiario = document.querySelector('#celularBeneficiario');
const cedulaBeneficiario = document.querySelector('#cedulaBeneficiario');
const bancoBeneficiario = document.querySelector('#bancoBeneficiario');
const monto = document.querySelector('#monto');
const respuestaBanco = document.querySelector('#respuestaBanco');
let tiempo = new Date;
let money = 1000;


function actualizarFechaHora(){//Una funcion que actualiza la fecha y la hora en la parte de arriba del mensaje
    let tiempo = new Date;
    document.querySelector('#fecha').textContent = tiempo.toLocaleDateString('es-ES');
    document.querySelector('#hora').textContent = tiempo.toLocaleTimeString();
}
actualizarFechaHora();//La primera vez que entras a la página
setInterval(actualizarFechaHora,1000)//Luego, cada segundo





boton.addEventListener("click",enviar);//Cuando se clickea enviar


function enviar(){

    if(celularBeneficiario.value === "" || cedulaBeneficiario.value === "" || bancoBeneficiario.value === "" || monto.value === "" || monto.value === "0"){//Si los datos son vacíos o el monto es cero
        
        if(celularBeneficiario.value === ""){//Si son vacíos, ponerlos en rojo
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
        


    }else{

        celularBeneficiario.style.border = "1px solid lightgrey";//Aquí ya no son vacíos, así que si están bien hay que ponerlos grises
        cedulaBeneficiario.style.border = "1px solid lightgrey";
        bancoBeneficiario.style.border = "1px solid lightgrey";
        monto.style.border = "1px solid lightgrey";

        if(celularBeneficiario.value.length !== 12){//Aquí se verifican si sus datos son correctos (tienen la longitud adecuada) y si no, se ponen rojos
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

        if(monto.value >= money){//Si el monto es mayor al dinero, entonces mandar mensaje de fondos insuficientes

            
        celularBeneficiario.value="";
        cedulaBeneficiario.value="";
        bancoBeneficiario.value="";
        monto.value="";

        respuestaBanco.style.display = "block";
        respuestaBanco.textContent = "Su fondo es insuficiente para realizar esta transacción.";

        }else{//Si el monto es menor al dinero, es decir, sí se puede hacer, entonces restar el dinero y mandar el mensaje con los datos

        money -= monto.value;
        celularBeneficiario.value="";
        cedulaBeneficiario.value="";
        bancoBeneficiario.value="";
        monto.value="";

        respuestaBanco.style.display = "block";
        respuestaBanco.textContent = "Realizaste un Pago Móvil por " + monto.value + " Bs al " + celularBeneficiario.value + " Ref: 0000" + parseInt((Math.random() * 9999) +1000)
        + " en fecha " + tiempo.toLocaleDateString() + " y hora " + tiempo.toLocaleTimeString() + ".";

        }

    }


}