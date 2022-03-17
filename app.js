var boton = document.getElementById("btn_calcula");
var inputs = ['cprimero','csegundo','ctercero','ccuarto','cquinto','csexto','cseptimo','minimo','maximo','avance'] ;
var val_campos = [];

// Ejecutando el llamado al flujo del programa

boton.addEventListener('click',() => {    
    obtenerValores();  
});

/*Operando el obtener valores dinamicamente*/ 
function obtenerValores(){
    
        inputs.forEach(function(item){
            console.log(item);
            inserta = valorobtenido = document.getElementById(item).value;
            val_campos.push(inserta);
            //console.log(inserta);
        });
        escribirResultado();
}

function escribirResultado(){
       
        console.log("Escribiendo el resultado");
        val_campos.forEach((item, i) => {
            console.log(i);
            //alert(item)
            var hola = item + 'test' + i;
            document.getElementById('demo').innerHTML = hola;
            //document.getElementById("demo").innerHTML = item;
        });
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
    
    return  resul_ecuacion =     (((expresion_una)/(expresion_dos))+expresion_tres)                               
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