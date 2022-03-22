var boton = document.getElementById("btn_calcula");
	var inputs = ['cprimero','csegundo','ctercero','ccuarto','cquinto','csexto','cseptimo','minimo','maximo','avance'] ;
	var span = ['primeralertaerror','segundoalertaerror','terceralertaerror','cuartoalertaerror','quintoalertaerror','sextoalertaerror','septimoalertaerror','minimoalertaerror','maximoalertaerror','avancealertaerror']
	var val_campos = [];

	//Parámetros para graficar
	var lienzo = document.getElementById('canvas');
	var etiquetas = new Array();
	var valores = new Array();

	//Parámetros de la ecuación manuales
	/*
	var a = 1.1;
	var b = 2.3;
	var d = 1.8;
	var e = 1.1;
	var f = 2.3;
	var g = 1.8;
	var h = 1.1;

	var xmin = -3;
	var xmax = 3;
	var xavance = 0.1;
	*/

	
	var a = 0;
	var b = 0;
	var d = 0;
	var e = 0;
	var f = 0;
	var g = 0;
	var h = 0;

	var xmin = 0;
	var xmax = 0;
	var xavance = 0;
	
	//llamado de la funcion que dibuja el grafico con libreria

	var count = 0;
	var listaX = []
	var listaY = [] 

	var xpuntoscorte = []
	var cont_cantidad_pc = 0;
	var Ciclos = 100; //Número de veces que hará la operación de aproximación


	boton.addEventListener('click',() => {    
    	obtenerValores();  
	});

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

            //escribirResultado();

			 a = parseFloat(val_campos[0]);
			 b = parseFloat(val_campos[1]);
			 d = parseFloat(val_campos[2]);
			 e = parseFloat(val_campos[3]);
			 f = parseFloat(val_campos[4]);
			 g = parseFloat(val_campos[5]);
			 h = parseFloat(val_campos[6]);
			 xmin = parseFloat(val_campos[7]);
			 xmax = parseFloat(val_campos[8]);
			 xavance = parseFloat(val_campos[9]);
			console.log("Viendo la funcion calculaPuntosCorte" + a + " " +  b +  " " + xmin + " " + d + " " + e + " " + f + " " + g + " " + h + " " + xmin + " " + xmax + " " + xavance);
			calculaPuntosCorte(a,b,xmin,d,e,f,g,h);
			
            return true;
        }
	}


	function calculaPuntosCorte(a,b,xmin,d,e,f,g,h){
		//document.write("<br><br><table border='1'>");
		//document.write("<tr><td>" + "X" + "</td><td>" + "Y" + "</td></tr>");
		console.log("El valor de x es: " + typeof(xmin) +" el valor de xmax es de: " + typeof(xmax) + " y el valor de xavance es: " + typeof(xavance) );
		for (var x=xmin; x<=xmax; x+=xavance){
			//console.log("Entrando al for");
			var valor_antes_y = 0;
			var valor_antes_x = 0;
			//Aquí va su ecuación
			//var y = (Math.sin(a*x+b)+Math.sqrt(Math.abs(d*d-e*x*x)))/(Math.sqrt(Math.abs(a+f+g*x*h)))+Math.cos(x)/(x*x*x+a+b*x*x);
			var y = ecuacion(a,b,x,d,e,f,g,h);
			//console.log(y);
			
			//Imprime los puntos X, Y
			//document.write("<tr><td>" + x + "</td><td>" + y + "</td></tr>");
			
			//Ponen su algoritmo de validar puntos de corte
			listaX.push(x);
			listaY.push(y);
			var obj_count = count;
			//console.log("el contador (obj_count) vale al principio "+ typeof(obj_count));
			//console.log("el contador (count) "+ typeof(count));
			if(obj_count > 0){
				//console.log("Es mayr que cero");
				obj_count = obj_count -1;
				// Empiezo la validacion del codigo
				cambio = false;    
				if (y > 0){
					console.log("Aqui entra cuando y es mayor que cero");
					valor_antes_y = listaY[obj_count];
					//console.log("El valor actual de Y es: " + y + "Y el valor antes de Y es igual a: " + valor_antes_y);
					valor_antes_x = listaX[obj_count];
					if(valor_antes_y < 0){
						//console.log("Holi -> El valor actual de X es: " + x + " y el valor antes de X es igual a: " + valor_antes_x);
						cambio = true;
						cont_cantidad_pc += 1;
						
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
						//console.log("El valor actual de X es: " + x + " y el valor antes de X es igual a: " + valor_antes_x);
						cambio = true;
						cont_cantidad_pc += 1;
							if(cambio){	
								xpuntoscorte.push(valor_antes_x, x);
								ejecucionBiseccion(x,valor_antes_x,Ciclos);
								}	
					} 
				}
			}
			//Hacen el gráfico
			console.log("el valor de x es: " + x)
			etiquetas.push(x.toFixed(2));
			valores.push(y);	
			count += 1;

		}
		//document.write("</table><br>");
		console.log("La cantidad de puntos de corte son: "    + cont_cantidad_pc + " ");
		document.getElementById("demo").innerHTML = "La cantidad de puntos de corte son: " + cont_cantidad_pc;
		dibujarGgrafico(etiquetas,valores);
	}

	
	

	// ********************************** BISECCION  **************************************

	var uno = a ;
	var dos = b ;
	var cuatro = d ;
	var cinco = e ;
	var seis = f ;
	var siete = g ;
	var ocho = h ;

	//Algoritmo de bisección
	//var Xinicial = 1;
	//var Xinicial = xpuntoscorte[0];
	//var Xfinal = xpuntoscorte[1];
	//var Xfinal = 2;

	function ejecucionBiseccion(Xinicial, Xfinal, Ciclos){

		
		//Verifica que entre Xinicial y Xfinal exista un corte s(llamado de la funcion biseccion)
		if (ecuacion( uno,dos,Xinicial,cuatro,cinco,seis,siete,ocho  ) * ecuacion( uno,dos,Xfinal,cuatro,cinco,seis,siete,ocho  ) > 0){
			console.log("No hay punto de corte en los puntos dados");
		}else{
			//Si hay intersección, entonces llama a la función de Bisección
			var Xresultado = Biseccion(Xinicial, Xfinal, Ciclos);
			console.log("Punto de corte exacto en: " + Xresultado + " ");

			var table = document.getElementById("customers");
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(-1);
			cell1.innerHTML = Xresultado;

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

	// ***************************** FIN PROCESO BISECCION  ******************************

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