var canvas;
var context;
var dragging = false;
var painting = false;
var dragStartLocation;
var paintStartLocation;
var snapshot;
var fillBox;


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}



function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke(); // pt a desena
}

function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)); // ca intr-un triunghi dreptunghic
    context.beginPath(); // begins a path, or resets the current path.
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false); // primele 2 reprez coord punctului din centru, 0 start angle, 2 * PI - end angle
  //  context.fill();
    context.closePath();
}



function drawSquare(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}




function drawPentagon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}




// var b1=document.getElementById("b1");
//   b1.onclick=function(){
//     canvas.addEventListener('mousedown', startPosition3); // cand apasam butonul
//     canvas.addEventListener('mouseup', finishedPosition); // cand lasam butonul, painting devine false(se apeleaza metoda)
//     canvas.addEventListener('mousemove', draw3); // cand apasam butonul
//    }



// function drawDraw(event){
//     var x = event.clientX - canvas.getBoundingClientRect().left;
//     var y = event.clientY - canvas.getBoundingClientRect().top;
//     // if(!painting) return;
//     // context.lineWidth = 10;
//     // context.lineCap= "round"; // ne face linia circulara
    

    
//    // context.moveTo(dragStartLocation.x, dragStartLocation.y);


//     // context.lineTo(position.x, position.y); // to start drawing the line, va fi pozitia mouse-ului
//     // context.stroke();




//     // pe urm 2 linii le putem sterge, singura diferenta este ca va deveni mai pixelat fara ele
//     // context.beginPath();
//     // context.moveTo(position.x, position.y); 


//     if(!painting) return;
//     context.lineWidth = 10;
//     context.lineCap= "round"; // ne face linia circulara
//     context.strokeStyle = "black";

//     context.lineTo(x, y); // to start drawing the line, va fi pozitia mouse-ului
//     context.stroke();
//     // pe urm 2 linii le putem sterge, singura diferenta este ca va deveni mai pixelat fara ele
//     // context.beginPath();
//     // context.moveTo(position.x, position.y); 
// }









function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        //drawCircle(position);
        //drawLine(position);
        drawSquare(position, 4, Math.PI / 4); 
        if (fillBox.checked) {
            context.fill();
        } else {
            context.stroke();
        }
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    //drawCircle(position);
    //drawLine(position);
    drawSquare(position, 4, Math.PI / 4); //Math.PI / 4 adica la 45 de grade, acolo se va afla fiecare punct, iar daca ar incepe de la ora 12 atunci primul pct ar fi la 1 jum, al doilea la 4 jum, etc, formand un patrat
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}





function dragStart1(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag1(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawCircle(position);
        if (fillBox.checked) {
            context.fill();
        } else {
            context.stroke();
        }
    }
}

function dragStop1(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawCircle(position);
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}






function dragStart2(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag2(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawLine(position);
    }
}

function dragStop2(event) {
    dragging = false;
     restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawLine(position);
}



function dragStart3(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag3(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        //drawCircle(position);
        //drawLine(position);
        drawPentagon(position, 5, Math.PI / 4);
        if (fillBox.checked) {
            context.fill();
        } else {
            context.stroke();
        }
    }
}

function dragStop3(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    //drawCircle(position);
    //drawLine(position);
    drawPentagon(position, 5, Math.PI / 4);
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}







// 1


// function paintStart3(event) {
//     var position;
//     painting = true;
//     position = getCanvasCoordinates(event);
//     // paintStartLocation = getCanvasCoordinates(event);
//     // takeSnapshot();
//     drawDraw(position);
// }

// function paint3(event) {
//     var position;
   
//     if (painting === true) {
//         restoreSnapshot();
//         position = getCanvasCoordinates(event);
//         //drawCircle(position);
//         //drawLine(position);
//         drawDraw(position);
//     }
// }

// function paintStop3(event) {
//     painting = false;
//     context.beginPath();
//     // restoreSnapshot();
//     // var position = getCanvasCoordinates(event);
//     // drawDraw(position);
// }


function changeLineWidth(event){
    context.lineWidth = this.value;
    event.stopPropagation();
}

function changeFillStyle(event){
    context.fillStyle = this.value;
    event.stopPropagation();
}

function changeStrokeStyle(event){
    context.strokeStyle = this.value;
    event.stopPropagation();
}

function changeBackgroundColor(){
    context.save();
    context.fillStyle = document.getElementById("backgroundColor").value;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function onSave1(){
   
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
    } else {
        const a = document.createElement("a");

        document.body.appendChild(a);
        a.href = canvas.toDataURL();
        a.download = "canvas-image.png";
        a.click();
        document.body.removeChild(a);
    }

}


function onSave2(){
   
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
    } else {
        const a = document.createElement("a");

        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/jpeg", 0.8);
        a.download = "canvas-image.jpg";
        a.click();
        document.body.removeChild(a);
    }

}


    function eraseCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }






function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    var lineWidth = document.getElementById("lineWidth");
    var clearCanvas = document.getElementById("clearCanvas");
    var saveCanvasPng = document.getElementById("saveCanvasPng");
    var saveCanvasJpg = document.getElementById("saveCanvasJpg");
   // var desenCanvas = document.getElementById("desenCanvas");

    fillColor = document.getElementById("fillColor");
    strokeColor = document.getElementById("strokeColor");
    canvasColor = document.getElementById("backgroundColor");
    saveCanvasPng.addEventListener("click", onSave1, false);
    saveCanvasJpg.addEventListener("click", onSave2, false);
    clearCanvas.addEventListener("click", eraseCanvas, false);
   // desenCanvas/addEventListener("click", dCanvas, false);

   
    


  //  document.querySelector('#save').addEventListener('click', onSave);
    
    context.strokeStyle = strokeColor.value;
    context.fillStyle = fillColor.value;
    context.lineWidth = lineWidth.value;
    context.lineCap = 'round';
    fillBox = document.getElementById("fillBox");
//
    canvasColor.addEventListener("input", changeBackgroundColor, false);

    var b1 = document.getElementById("b1");
    b1.onclick = function(){


    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    lineWidth.addEventListener("input", changeLineWidth, false);
    fillColor.addEventListener("input", changeFillStyle, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);
    }

    var b2 = document.getElementById("b2");
    b2.onclick = function(){

        canvas.addEventListener('mousedown', dragStart1, false);
        canvas.addEventListener('mousemove', drag1, false);
        canvas.addEventListener('mouseup', dragStop1, false);
        lineWidth.addEventListener("input", changeLineWidth, false);
        fillColor.addEventListener("input", changeFillStyle, false);
        strokeColor.addEventListener("input", changeStrokeStyle, false);
    }

    var b3 = document.getElementById("b3");
    b3.onclick = function(){

        canvas.addEventListener('mousedown', dragStart2, false);
        canvas.addEventListener('mousemove', drag2, false);
        canvas.addEventListener('mouseup', dragStop2, false);
        lineWidth.addEventListener("input", changeLineWidth, false);
        fillColor.addEventListener("input", changeFillStyle, false);
        strokeColor.addEventListener("input", changeStrokeStyle, false);
    }

    var b4 = document.getElementById("b4");
    b4.onclick = function(){

        canvas.addEventListener('mousedown', dragStart3, false);
        canvas.addEventListener('mousemove', drag3, false);
        canvas.addEventListener('mouseup', dragStop3, false);
        lineWidth.addEventListener("input", changeLineWidth, false);
        fillColor.addEventListener("input", changeFillStyle, false);
        strokeColor.addEventListener("input", changeStrokeStyle, false);
    }
   

    // var b4=document.getElementById("b4");
    // b4.onclick=function(){
    //     canvas.addEventListener('mousedown', paintStart3, false);
    //  //   canvas.addEventListener('mousemove', paint3, false);
    //     canvas.addEventListener('mousemove', drawDraw, false);
    //     canvas.addEventListener('mouseup', paintStop3, false);    
    //     lineWidth.addEventListener("input", changeLineWidth, false);
    //     fillColor.addEventListener("input", changeFillStyle, false);
    //     strokeColor.addEventListener("input", changeStrokeStyle, false);
    // }

    // var b5=document.getElementById("b5");
    // b5.onclick=function(){
    //     saveCanvas.addEventListener("click", onSave, false);
    // }

}

window.addEventListener('load', init, false);