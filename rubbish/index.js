import * as utils from "/utils.js";
import { minContentHeight } from "/template.js";
var root = getComputedStyle(document.documentElement);

window.page_init = function(){
    tick();
    setInterval(tick, 1000); //updates per 1000ms i.e. 1s
}

function tick(){
    
}
