var canvas, ctx, flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;
var rango = document.querySelector('#rango')
var t = document.querySelector('#tamano')
var tamaño = rango.value
t.value = rango.value

var x = "black",
y = tamaño;

rango.addEventListener('input', function(){
    y = rango.value
    t.value = rango.value
})

function init() {
canvas = document.getElementById('can');
ctx = canvas.getContext("2d");
/* w = canvas.width;
h = canvas.height; */
ctx.canvas.width = window.innerWidth -15
ctx.canvas.height = window.innerHeight - 150
w = ctx.canvas.width
h = ctx.canvas.height


canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);
}

function color(obj) {
switch (obj.id) {
    case "green":
        x = "green";
        break;
    case "blue":
        x = "blue";
        break;
    case "red":
        x = "red";
        break;
    case "yellow":
        x = "yellow";
        break;
    case "orange":
        x = "orange";
        break;
    case "black":
        x = "black";
        break;
    case "white":
        x = "white";
        break;
}
if (x == "white") y = 14;
//else y = 2;

}

function draw(d) {
ctx.beginPath();
ctx.moveTo(d.prevX, d.prevY);
ctx.lineTo(d.currX, d.currY);
ctx.strokeStyle = d.x;
ctx.lineWidth = d.y;
ctx.stroke();
ctx.closePath();
}

function erase() {
var m = confirm("Want to clear");
if (m) {

    socket.emit('borrar', null, function(resp){
        console.log(resp)
    })
    socket.on('borrar', function(){
        //console.log(datos)
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    })

}
}

function save() {
document.getElementById("canvasimg").style.border = "2px solid";
var dataURL = canvas.toDataURL();
document.getElementById("canvasimg").src = dataURL;
document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
        ctx.beginPath();
        ctx.fillStyle = x;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
        dot_flag = false;
    }
}
if (res == 'up' || res == "out") {
    flag = false;
}
if (res == 'move') {
    if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        let dataObj = {
            prevX: prevX,
            prevY: prevY,
            currX: currX,
            currY: currY,
            x: x,
            y: y
        }

        //Emit = enviar información
        socket.emit('dibujar', dataObj, function(resp){
            console.log('Respuesta server: ', resp)
        })
        draw(dataObj);
    }
}
socket.on('dibujar', function(datos){
    //console.log(datos)
    draw(datos)
})
}

var socket = io()

socket.on('connect', function(){
    console.log('conectado')
})



