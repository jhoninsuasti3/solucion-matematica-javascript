
var d = document.getElementById("dibujito");
var lienzo = d.getContext("2d");
lienzo.lineWidth = 5

function GraficaRecta(){
    var yinicial = 4;
    var xmaximo = 200;
    var xinicial = 2;
    var avance = 1;
    //var lineas = yecuacion * 2;
    var colorcito = "#8A2BE2";
    //var xfinal = xmaximo - xinicial;
    var xfinal ;
    var line = xinicial;

    for(line ; line < xmaximo; line = line + avance){
        //console.log("Imprimiendo " + line);
        xfinal = line + avance; // Aqui se le agrega una posicion de acuerdo a como avance al xinicial
        //console.log("El xfinal: " + xfinal)
        dibujarLinea(colorcito, xinicial,yinicial, xfinal, yinicial  );
        lienzo.moveTo(xinicial, yinicial);
        lienzo.lineTo(xfinal, yinicial);
    }
    
}

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal)
{
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
    console.log("lienzo.moveTo " + xinicial + " " +yinicial);
    console.log("lienzo.lineTo " + xfinal + " " + yinicial);
}

GraficaRecta();