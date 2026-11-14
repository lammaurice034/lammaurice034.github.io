import * as utils from "/utils.js";
import { minContentHeight } from "/template.js";
var root = getComputedStyle(document.documentElement);

var list = 1;
window.page_init = function(){
    utils.xhr_fetch("./imglist.txt", function(err, txt){
        if(err){return;}
        list = txt.split(/\r?\n/).filter(function(line){return line.trim()!==""});
        utils.arr_shuffle(list);
    });
}

