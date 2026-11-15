import * as utils from "/utils.js";
import { minContentHeight } from "/template.js";
var root = getComputedStyle(document.documentElement);

var list = 1;
window.page_init = function(){
    utils.xhr_fetch("./imglist.txt", function(err, txt){
        if(err){return;}
        list = txt.split(/\r?\n/).filter(function(line){return line.trim()!==""});
        utils.arr_shuffle(list);
        var area = document.getElementById("contentDiv");
        for(let src of list){
            var img = document.createElement("img");
            img.src = src;
            img.onclick = function(){clickHandler(src, true)};
            img.style.cursor = clickHandler(src, false)?'pointer':'cursor';
            area.appendChild(img);
        }
        //document.getElementById("headerDiv").parentElement.style.background = 'linear-gradient(to bottom, var(--accent-bg1), var(--colour-white))';
    });
}

window.clickHandler = function(src, enabled){ // return: only works if enabled=false
    switch(src){
        case "/imgs/badges/github.png": 
            if(!enabled){return true;}
            window.open("https://github.com/lammaurice034/", '_blank').focus();
            break;
        case "/imgs/badges/blackjack.gif": 
            if(!enabled){return true;}
            window.location.href = "/games/blackjack.html";
            break;
        case "/imgs/gallery/rick.png": 
            if(!enabled){return true;}
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank').focus();
            break;
    }
    return false;
}