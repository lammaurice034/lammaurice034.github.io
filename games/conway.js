import * as utils from "/utils.js";

var playing = false;
var pixels = [];
var bornConds = [0,0,0,0,0,0,0,0,0];
var surviveConds = [0,0,0,0,0,0,0,0,0];
var ROWS = 64;
var COLUMNS = 64;
var canvas;
var g;
var gen = 0;
var mousedown = false;
var lastClickedX = -1; var lastClickedY = -1;
var genLabel;
var deadColour = "Black"; var aliveColour = "White";
window.deadColour = deadColour; window.aliveColour = aliveColour;

window.page_init = function(){
    var deadDropdown = document.getElementById("deadColour");
    var aliveDropdown = document.getElementById("aliveColour");
    utils.htmlColours.forEach(function(colour){
        var opt = document.createElement('option');
        opt.value = colour;
        opt.innerHTML = colour;
        opt.style.color = Math.min(...utils.getRGB(colour.replaceAll(" ", ""))) > 128 ? 'black' : 'white';
        opt.style.backgroundColor = colour.replaceAll(" ", "");
        aliveDropdown.appendChild(opt);
        var opt2 = document.createElement('option');
        opt2.value = colour;
        opt2.style.color = Math.min(...utils.getRGB(colour.replaceAll(" ", ""))) > 128 ? 'black' : 'white';
        opt2.style.backgroundColor = colour.replaceAll(" ", "");
        opt2.innerHTML = colour;
        deadDropdown.appendChild(opt2);
    });
    deadDropdown.value = "Black";
    aliveDropdown.value = "White";
    document.getElementById("clearBtn").addEventListener("click", clear);
    canvas = document.getElementById("display");
    genLabel = document.getElementById("genlabel");
    g = utils.imgGetGraphics(canvas);
    canvas.width = COLUMNS;
    canvas.height = ROWS;
    clear();
    canvas.addEventListener('mouseup', function(){
        mousedown = false;
        lastClickedX = -1; lastClickedY = -1;
    });
    canvas.addEventListener('mousedown', function(event){
        mousedown = true;
        var rect = canvas.getBoundingClientRect();
        var x = Math.floor((event.clientX-rect.left)*canvas.width/rect.width);
        var y = Math.floor((event.clientY-rect.top)*canvas.height/rect.height);
        x = Math.min(Math.max(0,x),COLUMNS-1);
        y = Math.min(Math.max(0,y),ROWS-1);
        click(x, y);
        lastClickedX = x; lastClickedY = y;

    });
    canvas.addEventListener('mousemove', function(event){
        if(mousedown){
            var rect = canvas.getBoundingClientRect();
            var x = Math.floor((event.clientX-rect.left)*canvas.width/rect.width);
            var y = Math.floor((event.clientY-rect.top)*canvas.height/rect.height);
            x = Math.min(Math.max(0,x),COLUMNS-1);
            y = Math.min(Math.max(0,y),ROWS-1);
            if(lastClickedX!=x||lastClickedY!=y){click(x, y);}
            lastClickedX = x; lastClickedY = y;
        }
    });
}

function clear(){
    utils.setDrawingColour(g, deadColour);
    gen = 0;
    genLabel.textContent = "Generation: 0";
    console.log("x");
    for(let i=0; i<ROWS; i++){
        pixels[i] = [];
        for(let j=0; j<COLUMNS; j++){
            pixels[i][j] = 0;
        }
    }
    utils.fillRect(g, 0, 0, ROWS, COLUMNS);
}

function readSettings(){
    var bstring = "";
    var sstring = "";
    for(var i=0; i<9; i++){
        bornConds[i] = document.getElementById("b" + i).checked ? 1 : 0;
        surviveConds[i] = document.getElementById("s" + i).checked ? 1 : 0;
        if(bornConds[i]){bstring = bstring+i;}
        if(surviveConds[i]){sstring = sstring+i;}            
    }
    deadColour = document.getElementById("deadColour").value.replaceAll(" ","");
    aliveColour = document.getElementById("aliveColour").value.replaceAll(" ","");
    document.getElementById("rulestring").textContent = "Rulestring: B" +bstring +"/S"+sstring;
}

function play(){
    playing = !playing;
    document.getElementById("playBtn").textContent = playing ? "Pause" : "Play";
    readSettings();
    for(var i=0; i<9; i++){
        document.getElementById("s"+i).disabled = playing;
        document.getElementById("b"+i).disabled = playing;
    }
    document.getElementById("stepBtn").disabled = playing;
    document.getElementById("speed").disabled = playing;
    document.getElementById("aliveColour").disabled = playing;
    document.getElementById("deadColour").disabled = playing;
    if(playing){
        gen=0;
    }
    var timer = setInterval(function(){
        if(!playing){clearInterval(timer);}
        nextGen();
    }, document.getElementById("speed").value);
}

function step(){
    readSettings();
    nextGen();
}

function nextGen(){
    function neighbourCount(i, j){
        var hasDown = i+1<ROWS
        var hasRight = j+1<COLUMNS;
        var hasUp = i-1>=0;
        var hasLeft = j-1>=0;
        var result = 0;
        if(hasDown&&pixels[i+1][j]& 1){result++;}
        if(hasUp&&pixels[i-1][j]& 1){result++;}
        if(hasRight&&pixels[i][j+1]& 1){result++;}
        if(hasLeft&&pixels[i][j-1]& 1){result++;}
        if(hasRight&&hasUp&&pixels[i-1][j+1]& 1){result++;}
        if(hasLeft&&hasDown&&pixels[i+1][j-1]& 1){result++;}
        if(hasLeft&&hasUp&&pixels[i-1][j-1]& 1){result++;}
        if(hasRight&&hasDown&&pixels[i+1][j+1]& 1){result++;}
        return result;
    }
    for(let i=0; i<ROWS; i++){
        for(let j=0; j<COLUMNS; j++){
            if(((pixels[i][j]&1) && surviveConds[neighbourCount(i,j)]) || (!(pixels[i][j]&1) && bornConds[neighbourCount(i,j)])){
                pixels[i][j] |= 2;
            }
        }
    }
    for(let i=0; i<ROWS; i++){
        for(let j=0; j<COLUMNS; j++){
            pixels[i][j] >>= 1;
            if(pixels[i][j]){
                utils.setDrawingColour(g, aliveColour);
            }else{utils.setDrawingColour(g, deadColour);}
            utils.drawPixel(g, {x:j, y:i});
        }
    }
    gen++;
    genLabel.textContent = "Generation: "+gen;
}

function click(x, y){
    pixels[y][x] = pixels[y][x] ? 0 : 1;
    utils.setDrawingColour(g, pixels[y][x] ? aliveColour : deadColour);
    utils.drawPixel(g, {x: x, y: y});
}

window.play=play;
window.step=step;
