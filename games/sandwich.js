import * as utils from "/utils.js";
import { minContentHeight } from "/template.js";
var root = getComputedStyle(document.documentElement);

var g;
window.page_init = function(){
    g = utils.imgGetGraphics(document.getElementById("mainCanvas"));
    tick();
    setInterval(tick, 1000); //updates per 1000ms i.e. 1s
    var observer = new ResizeObserver(function(){resize();});    
    observer.observe(document.getElementById("pageContent"));
    resize();
}

function tick(){
    
}

function resize(){
    var mainCanvas = document.getElementById("mainCanvas");
    mainCanvas.width = titleCanvas.getBoundingClientRect().width;
    mainCanvas.height = titleCanvas.getBoundingClientRect().height;
    utils.clear(g);

}