var boton = document.getElementById("btn_calcula");
var inputs = ['cprimero','csegundo','ctercero','ccuarto','cquinto','csexto','cseptimo','minimo','maximo','avance'] ;
var span = ['primeralertaerror','segundoalertaerror','terceralertaerror','cuartoalertaerror','quintoalertaerror','sextoalertaerror','septimoalertaerror','minimoalertaerror','maximoalertaerror','avancealertaerror']
var val_campos = [];

//Parámetros para graficar
var lienzo = document.getElementById('canvas');
var etiquetas = new Array();
var valores = new Array();


//llamado de la funcion que dibuja el grafico con libreria

var count = 0;
var listaX = []
var listaY = [] 

var xpuntoscorte = []
var Ciclos = 100; //Número de veces que hará la operación de aproximación

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
            //console.log("El item a procesar es : "+ item + " su contador es: " + contador);
            identificador = document.getElementById(item);
            inserta  = document.getElementById(item).value;
            nombre  = document.getElementById(item).name;
            id_error =  span[contador]; 
            //console.log("Imprimiendo el nombre del id " + id_error) ; 
            if( inserta == null || inserta.length == 0  ) {
                document.getElementById(id_error).style.visibility = 'visible';
                //alert('[ERROR] El campo' + nombre + ' debe tener un valor...');
                identificador.classList.add("invalido");
                return false;
            }else{
                document.getElementById(id_error).style.visibility = 'hidden';
                identificador.classList.remove("invalido");
                //console.log("El valor obtenido en el campo " + nombre + " es " + inserta + " y sera insertado");
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

        //console.log(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9]);
        //console.log("Ejemplo de llamado a funcion ecuacion ecuacion(a,b,x,d,e,f,g,h)");
        var ecua = ecuacion(arr[0],arr[1],arr[7],arr[2],arr[3],arr[4],arr[6], arr[6]);
        //Si se quiere con los decimales se debe activar la siguiente linea
        //ecua = ecua.toFixed(2);
        //ecua = Math.round(ecua)

        // Ejemplo de que campos necesita calculaPuntosCorte(a,b,xmin,d,e,f,g,h);
        calculaPuntosCorte(arr[0],arr[1],arr[7],arr[2],arr[3],arr[4],arr[6], arr[6]);
        dibujarGgrafico(etiquetas,valores);
        console.log(ecua);

}

/*  Esta ecuacion es remplazada or otra 
function resultadoEcuacion(a,b,c,d,e,f,g){

    //console.table(a,b,c,d,e,f,g);
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
    return  resul_ecuacion =  (((expresion_una)/(expresion_dos))+expresion_tres)    ;                           
}
*/

function calculaPuntosCorte(a,b,xmin,d,e,f,g,h){

    var xavance = val_campos[9];
    var xmin = val_campos[7];
    var xmax = val_campos[8];

    console.log("El valor de avance es: "  + xavance + " , el valor e xmin es de: " + xmin + " , el valor e xmax es de: " + xmax );
	document.write("<br><br><table border='1'>");
	document.write("<tr><td>" + "X" + "</td><td>" + "Y" + "</td></tr>");
	for (var x=xmin; x<=xmax; x+=xavance){

		var valor_antes_y = 0;
		var valor_antes_x = 0;
		//Aquí va su ecuación
		//var y = (Math.sin(a*x+b)+Math.sqrt(Math.abs(d*d-e*x*x)))/(Math.sqrt(Math.abs(a+f+g*x*h)))+Math.cos(x)/(x*x*x+a+b*x*x);
		var y = ecuacion(a,b,x,d,e,f,g,h);
		//console.log(y);
		
		//Imprime los puntos X, Y
		document.write("<tr><td>" + x + "</td><td>" + y + "</td></tr>");
		
		//Ponen su algoritmo de validar puntos de corte
		listaX.push(x);
		listaY.push(y);
		var obj_count = count;
		//console.log("el contador (obj_count) vale al principio "+ obj_count);
		//console.log("el contador (count) "+ count);
		if(obj_count > 0){
			obj_count = obj_count -1;
			// Empiezo la validacion del codigo
			cambio = false;    
			if (y > 0){
				//console.log("Aqui entra cuando y es mayor que cero");
				valor_antes_y = listaY[obj_count];
				//console.log("El valor actual de Y es: " + y + "Y el valor antes de Y es igual a: " + valor_antes_y);
				valor_antes_x = listaX[obj_count];
				if(valor_antes_y < 0){
					console.log("Holi -> El valor actual de X es: " + x + " y el valor antes de X es igual a: " + valor_antes_x);
					cambio = true;
						if(cambio){	
							xpuntoscorte.push(valor_antes_x, x);
							ejecucionBiseccion(x,valor_antes_x,Ciclos);
							}	
				} 
			}
			if (y < 0){
				//console.log("Estamos en y menos que 0");
				valor_antes_y = listaY[obj_count];
				//console.log("El valor actual de Y es: " + y + "Y el valor antes de Y es igual a: " + valor_antes_y);
				valor_antes_x = listaX[obj_count];
				if(valor_antes_y > 0){
					console.log("El valor actual de X es: " + x + " y el valor antes de X es igual a: " + valor_antes_x);
					cambio = true;
						if(cambio){	
							xpuntoscorte.push(valor_antes_x, x);
							ejecucionBiseccion(x,valor_antes_x,Ciclos);
							}	
				} 
			}
		}
		//Hacen el gráfico
		etiquetas.push(x);
		valores.push(y);	
		count += 1;

	}
	document.write("</table><br>");
}



// ********************************** BISECCION  **************************************

/*
var uno = a ;
var dos = b ;
var cuatro = d ;
var cinco = e ;
var seis = f ;
var siete = g ;
var ocho = h ;
*/


//Algoritmo de bisección
//var Xinicial = 1;
//var Xinicial = xpuntoscorte[0];
//var Xfinal = xpuntoscorte[1];
//var Xfinal = 2;

function ejecucionBiseccion(Xinicial, Xfinal, Ciclos){

	
	//Verifica que entre Xinicial y Xfinal exista un corte s(llamado de la funcion biseccion)
	if (ecuacion( uno,dos,Xinicial,cuatro,cinco,seis,siete,ocho  ) * ecuacion( uno,dos,Xfinal,cuatro,cinco,seis,siete,ocho  ) > 0){
		document.write("No hay punto de corte en los puntos dados");
	}else{
		//Si hay intersección, entonces llama a la función de Bisección
		var Xresultado = Biseccion(Xinicial, Xfinal, Ciclos);
		document.write("Punto de corte en: " + Xresultado + "<br>");
	}
	//Retorna el punto X entre Xinicial y Xfinal que más se aproxime al punto de corte
}





function Biseccion(Xinicial, Xfinal, Ciclos){

	var Xmedio = 0;
	if ( ecuacion(uno,dos,Xinicial,cuatro,cinco,seis,siete,ocho) == 0 ) Xmedio = Xinicial;
	else if (ecuacion( uno,dos,Xfinal,cuatro,cinco,seis,siete,ocho ) ==0) Xmedio = Xfinal;
	else
	for(var cont=1; cont<=Ciclos; cont++){
		Xmedio = (Xinicial + Xfinal) / 2;
		if (ecuacion( uno,dos,Xmedio,cuatro,cinco,seis,siete,ocho   )==0) break;
		else if (ecuacion(  uno,dos,Xinicial,cuatro,cinco,seis,siete,ocho  ) * ecuacion(  uno,dos,Xmedio,cuatro,cinco,seis,siete,ocho  ) < 0) Xfinal =Xmedio;
		else Xinicial = Xmedio;
	}
			return Xmedio;
	}


function ecuacion(a,b,x,d,e,f,g,h){ //En esta función se pone la ecuación
	return (Math.sin(a*x+b)+Math.sqrt(Math.abs(d*d-e*x*x)))/(Math.sqrt(Math.abs(a+f+g*x*h)))+Math.cos(x)/(x*x*x+a+b*x*x);
}


function dibujarGgrafico(etiquetas,valores){

	var grafico = new Chart(lienzo, {
	type: 'line',
	data: {
		labels: etiquetas,
		datasets: [{
			label: 'Gráfico matemático',
			data: valores
		}]
	},
	options: {
		responsive: false,
		plugins: {
			title: {
				display: true,
				text: 'Gráfico Matemático'
			}
		},
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
});
}
