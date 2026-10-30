import * as utils from "/utils.js";
var g;
var colour = {r:64, g:128, b:128, a:1};
var ptrX = 128; var ptrY = 128;

window.page_init = function(){
    var canvas = document.getElementById("canvas");
    g = utils.imgGetGraphics(canvas);
    canvas.addEventListener('click', function(event){
        var rect = canvas.getBoundingClientRect();
        var x = Math.floor((event.clientX-rect.left)*canvas.width/rect.width);
        var y = Math.floor((event.clientY-rect.top)*canvas.height/rect.height);
        x = Math.min(Math.max(0,x), canvas.width-1);
        y = Math.min(Math.max(0,y), canvas.height-1);
        click(x,y);
    });
    utils.fillRect(g, 0,0,256,256);
    document.getElementById("hue").oninput = function(){
        changeThumbColour();
    }
    document.getElementById("hue").onchange = function(){
        refreshSquare(this.value);
        click(ptrX, ptrY);
        updateName();
    }
    document.getElementById("h").onchange = function(){input('hsv')};
    document.getElementById("s").onchange = function(){input('hsv')};
    document.getElementById("v").onchange = function(){input('hsv')};
    document.getElementById("r").onchange = function(){input('rgb')};
    document.getElementById("g").onchange = function(){input('rgb')};
    document.getElementById("b").onchange = function(){input('rgb')};
    click(128, 128);
}

function changeThumbColour(){
    var tmp = document.getElementById("hue");
    var mapped = Math.floor((tmp.value%60)*255/60);
    var str = "";
    switch(Math.floor((tmp.value%360)/60)){
        case 0: str = utils.rgbToStr({r:255, g:mapped, b:0}); break;
        case 1: str = utils.rgbToStr({r:255-mapped, g:255, b:0}); break;
        case 2: str = utils.rgbToStr({r:0, g:255, b:mapped}); break;
        case 3: str = utils.rgbToStr({r:0, g:255-mapped, b:255}); break;
        case 4: str = utils.rgbToStr({r:mapped, g:0, b:255}); break;
        case 5: str = utils.rgbToStr({r:255, g:0, b:255-mapped}); break;
    }
    tmp.style.setProperty("--thumb-color", str);
}

function refreshSquare(h){
    for(var x=0; x<256; x++){
        for(var y=0; y<256; y++){
            utils.setDrawingColour(g, utils.rgbToStr(utils.hsvToRgb({h: h, s: x/255, v:y/255})));
            utils.drawPixel(g, {x:x, y:255-y});
        }
    }
    updateName();
}

function input(using){
    if(using=='hsv'){
        var rgb = utils.hsvToRgb({h: document.getElementById("h").value, s: document.getElementById("s").value/100, v: document.getElementById("v").value/100});
        document.getElementById("r").value = rgb.r;
        document.getElementById("g").value = rgb.g;
        document.getElementById("b").value = rgb.b;
    }else{
        var hsv = utils.rgbToHsv({r: document.getElementById("r").value, g: document.getElementById("g").value, b: document.getElementById("b").value});
        document.getElementById("h").value = hsv.h;
        document.getElementById("s").value = Math.round(100*hsv.s);
        document.getElementById("v").value = Math.round(100*hsv.v);
    }
    document.getElementById("hue").value = document.getElementById("h").value;
    changeThumbColour();
    ptrX = (document.getElementById("s").value/100)*255;
    ptrY = (1 - document.getElementById("v").value/100)*255;
    refreshSquare(document.getElementById("hue").value);
    colour = utils.getPixelColour(g, {x:ptrX, y:ptrY});
    utils.setDrawingColour(g, utils.rgbToStr(colour));
    utils.fillRect(g, ptrX-3, ptrY-3, 7, 7);
    utils.setDrawingColour(g, ptrY>128?'white':'black');
    utils.drawRect(g, ptrX-3, ptrY-3, 7, 7);
    updateName();
}

function click(x, y){
    ptrX = x; ptrY = y;
    refreshSquare(document.getElementById("hue").value);
    colour = utils.getPixelColour(g, {x:ptrX, y:ptrY});
    utils.setDrawingColour(g, utils.rgbToStr(colour));
    utils.fillRect(g, x-3, y-3, 7, 7);
    utils.setDrawingColour(g, y>128?'white':'black');
    utils.drawRect(g, x-3, y-3, 7, 7);
    document.getElementById("h").value = document.getElementById("hue").value%360;
    document.getElementById("s").value = Math.round(100*ptrX/255) 
    document.getElementById("v").value = Math.round(100*(255-ptrY)/255);
    document.getElementById("r").value = colour.r;
    document.getElementById("g").value = colour.g;
    document.getElementById("b").value = colour.b;
    updateName();
}

function updateName(){
    document.getElementById("name").style.backgroundColor = utils.rgbToStr(colour);
    document.getElementById("name").style.color = ptrY>128?'white':'black';
    var idx = 0;
    var dist = 1000;
    for(var i=0; i<utils.htmlColours.length; i++){
        var newColour = utils.htmlColoursRGB[i];
        var newDist = Math.sqrt((newColour.r-colour.r)**2 + (newColour.g-colour.g)**2 + (newColour.b-colour.b)**2);
        if(dist>newDist){
            idx = i; dist = newDist; 
        }
    }
    document.getElementById("name").textContent = utils.htmlColours[idx];
}