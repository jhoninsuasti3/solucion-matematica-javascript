var boton = document.getElementById("btn_calcula");
var inputs = ['cprimero','csegundo','ctercero','ccuarto','cquinto','csexto','cseptimo','minimo','maximo','avance'] ;
var span = ['primeralertaerror','segundoalertaerror','terceralertaerror','cuartoalertaerror','quintoalertaerror','sextoalertaerror','septimoalertaerror','minimoalertaerror','maximoalertaerror','avancealertaerror']
var val_campos = [];

// Ejecutando el llamado al flujo del programa
boton.addEventListener('click',() => {    
    obtenerValores();  
});


/*Operando el obtener valores dinamicamente y validando que se diligencien meniante Js*/
// Se hicieron estas validaciones por javascript ya que no necesitaba que se recargue la pagina
// Y aun debo practicar mas con el htmlrequest

function obtenerValores(){
    //Vaciar la lista de arreglos en caso de volverse a ejecutar la funcion 
    val_campos = [];
    validador = false;
        inputs.forEach(function(item, contador){
            console.log("El item a procesar es : "+ item + " su contador es: " + contador);
            identificador = document.getElementById(item);
            inserta  = document.getElementById(item).value;
            nombre  = document.getElementById(item).name;
            id_error =  span[contador]; 
            console.log("Imprimiendo el nombre del id " + id_error) ; 
            if( inserta == null || inserta.length == 0  ) {
                document.getElementById(id_error).style.visibility = 'visible';
                //alert('[ERROR] El campo' + nombre + ' debe tener un valor...');
                identificador.classList.add("invalido");
                return false;
            }else{
                document.getElementById(id_error).style.visibility = 'hidden';
                identificador.classList.remove("invalido");
                console.log("El valor obtenido en el campo " + nombre + " es " + inserta + " y sera insertado");
                val_campos.push(inserta);
                if(contador == 9 && nombre =="avance"){
                    validador = true;
                }
            }
        });
        if(validador){
            escribirResultado();
            return true;
        }
}

function escribirResultado(){
       
        console.log("Escribiendo el resultado");
        //copiado de array a otro
        var arr = val_campos.slice();
        

        
        arr.forEach((item, i) => {
            console.log(item);
            //alert(item)
            //document.getElementById('demo').innerHTML = item;
        });
        

        resultadoEcuacion(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6]);
}
/*

myArray.forEach((value, i) => {
  console.log(value);
});

function operarValores(valor){
    return valorobtenido = document.getElementById(valor).value;
}
*/
function resultadoEcuacion(a,b,c,d,e,f,g){

    console.table(a,b,c,d,e,f,g);
    

    var expresion_una = (Math.sqrt(
                                    (1**a) + ((g * f )/(2)) - (-Math.cos(c * a))
                        ));
    var expresion_dos = (Math.sin(
                                    b*a
                        )
                        );
    var expresion_tres = (Math.sqrt(
                                    (a**(2-d))+e*a
                        ));
    resul_ecuacion =     (((expresion_una)/(expresion_dos))+expresion_tres) ;
    console.log("El resultado de la ecuacion es + " );
    return  resul_ecuacion =  (((expresion_una)/(expresion_dos))+expresion_tres)                               
}

/************************ 
Metodo dos para llamado de funcion por addevent lisetener

buttonRef.addEventListener("click", function() {
    alert("Blah blah...");
}, false);


var logo = document.getElementById("logoheader");

logo.addEventListener('click',() => {    
     hideDivHistorias();
     showDivPagina2();    
});
*/

/* **********************************************************

var texto = document.getElementById("texto_lineas");
var boton = document.getElementById("botoncito");
boton.addEventListener("click", dibujoPorClick );

var d = document.getElementById("dibujito");
var ancho = d.width;
var lienzo = d.getContext("2d");

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujoPorClick()
{
  var lineas = parseInt(texto.value);
  var l = 0;
  var yi, xf;
  var colorcito = "#FAA";
  var espacio = ancho / lineas;

  for(l = 0; l < lineas; l++)
  {
    yi = espacio * l;
    xf = espacio * (l + 1);
    dibujarLinea(colorcito, 0, yi, xf, 300);
    console.log("Linea " + l);
  }

  dibujarLinea(colorcito, 1,1,1,299);
  dibujarLinea(colorcito, 1,299,299,299);
}



*/