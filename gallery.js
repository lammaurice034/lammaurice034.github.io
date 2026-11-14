import * as utils from "/utils.js";
import { minContentHeight } from "/template.js";
var root = getComputedStyle(document.documentElement);

var list = "x";
window.page_init = function(){
    utils.xhr_fetch("./imglist.txt", function(err, txt){
        if(err){return;}
        console.log(txt);
        list = txt.split(/\r?\n/).filter(function(line){return line.trim()!==""});
        console.log(list);
    });
}

