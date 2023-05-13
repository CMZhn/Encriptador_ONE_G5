//Declaracion de Variable
const texto_encriptador = document.querySelector(".textarea_encriptador");
const texto_resultado = document.querySelector(".textarea_resultado");
const btn_copiar = document.querySelector(".btn_copiar");
const p_instrucciones = document.querySelector(".instrucciones");
var Matriz_llaves=[["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
var Texto_ingresado="";
var patron=/^[a-z0-9ñ!¡\s]*$/;
const audio = new Audio("./02_Audio/Ingreso_Invalido.mp3");
audio.loop = false;
audio.controls = true;
var Activador_Animacion_Error=0;

//Funcion de validacion de entrada de texto
function Validar_encriptar(Texto_a_validar){
    
    if (patron.test(Texto_a_validar)){
        return true;
    }
   else { return false }
}

function Texto_valido(Verdadero_Falso){
    
    if (Verdadero_Falso){
        texto_encriptador.style.color = "#0A3871";
        texto_encriptador.style.fontWeight = "400";

        p_instrucciones.style.color = "black";
        p_instrucciones.style.background = "#F3F5FC";
        p_instrucciones.style.margin="11px 15px 16px 15px";

        if (innerWidth <= 640){
            p_instrucciones.style.fontSize="12px";
        }else{
            p_instrucciones.style.fontSize="15px";
        }
    }
    else {
        texto_encriptador.style.color = "red";
        texto_encriptador.style.fontWeight = "bold";
  
        p_instrucciones.style.color = "white";
        p_instrucciones.style.background = "rgb(255, 52, 52)";
        p_instrucciones.style.margin="8px 15px 11.5px 15px";

        if (innerWidth <= 640){
            p_instrucciones.style.fontSize="15px";
        }else{
            p_instrucciones.style.fontSize="20px";
        }
        
    }
    
}
// Funcion de Actualizacion de texto encriptador
function Actualizar_Encriptador(){
    if (texto_encriptador.value != Texto_ingresado ||texto_encriptador.value.length==0){

        Restablecer_imagen_texto_resultado()
        btn_copiar.style.visibility = "hidden";
        texto_resultado.value="";

        Texto_valido(Validar_encriptar(texto_encriptador.value))
    }

}

// Funcion de efecto de error
function Animacion_error_Activador(){  
    var ciclo_Animacion = setInterval(Animacion_error, 150);
    setTimeout(function(){clearInterval(ciclo_Animacion);Estilo_ok()}, 600)
}

function Animacion_error(){
    if(Activador_Animacion_Error==0){
        Activador_Animacion_Error=1;
        Estilo_nok();
    } else{
        Activador_Animacion_Error=0;
        Estilo_ok();
    }
}
function Estilo_nok(){
    texto_encriptador.style.border = "red dotted 4px";
    texto_encriptador.style.margin ="3.75px 0 3.75px 1px";
    p_instrucciones.style.transform="scale(1.1)";

}
function Estilo_ok(){
    texto_encriptador.style.border = "none";
    texto_encriptador.style.margin ="7.5px";
    p_instrucciones.style.transform="scale(1)";
}

// Funcion Ocultar imagen de resultado y mostrar boton de copiar
function MostrarOcultar_imgResultado (){
    let TextoResultado=texto_resultado.value
    
    if (TextoResultado.length==0){

        Restablecer_imagen_texto_resultado()
        btn_copiar.style.visibility ="hidden";
   }
   else {
        texto_resultado.style.backgroundImage="none";
        btn_copiar.style.visibility ="visible";
    };
}
 function Restablecer_imagen_texto_resultado(){
    if (innerWidth > 940){
        texto_resultado.style.backgroundImage="url(./01_Imagenes/Fodo_resultado.svg)";
    } else if (innerWidth > 640){
        texto_resultado.style.backgroundImage="url(./01_Imagenes/Fodo_resultado_2.svg)";
    } else if (innerWidth > 375){
        texto_resultado.style.backgroundImage="url(./01_Imagenes/Fodo_resultado_3.svg)";
    } else {texto_resultado.style.backgroundImage="none";}
 }

//Funcion de Encriptado
function Boton_encriptar(){
    Texto_ingresado=texto_encriptador.value;
    Animacion_error_cont=0;

    if (Validar_encriptar(Texto_ingresado)){
        var Texto_encriptado = Encriptar(Texto_ingresado);
        texto_resultado.value = Texto_encriptado;
        MostrarOcultar_imgResultado ()
    }
    else{
        audio.load();
        audio.play();
        Animacion_error_Activador()        
    }
}

function Encriptar(Texto_a_encriptar){
    Texto_a_encriptar=Texto_a_encriptar.toLowerCase();
    for(i=0; i<Matriz_llaves.length; i++){
        if (Texto_a_encriptar.includes(Matriz_llaves[i][0])){
            Texto_a_encriptar=Texto_a_encriptar.replaceAll(Matriz_llaves[i][0],Matriz_llaves[i][1])
        }
    }
    return Texto_a_encriptar
}

//Funcion de Desencriptado
function Boton_desencriptar(){
    Texto_ingresado=texto_encriptador.value

    if (Validar_encriptar(Texto_ingresado)){
        var Texto_no_encriptado = Desencriptar(Texto_ingresado);
        texto_resultado.value = Texto_no_encriptado;
        MostrarOcultar_imgResultado ()
    }
    else{
        audio.load();
        audio.play();
        Animacion_error_Activador()
    }
}

function Desencriptar(Texto_a_desencriptar){
    Texto_a_desencriptar=Texto_a_desencriptar.toLowerCase();
    for(i=0; i<Matriz_llaves.length; i++){
        if (Texto_a_desencriptar.includes(Matriz_llaves[i][1])){
            Texto_a_desencriptar=Texto_a_desencriptar.replaceAll(Matriz_llaves[i][1],Matriz_llaves[i][0])
        }
    }
    return Texto_a_desencriptar
}

//Funcion limpiar
function Boton_limpiar (){
    location.reload()
}

// Funcion copiar
function Boton_copiar (){
     let comtenido_resultado = texto_resultado.value
     if (comtenido_resultado.length>0){
         navigator.clipboard.writeText(comtenido_resultado)
     } 
}