import * as utils from "/utils.js";
var root = getComputedStyle(document.documentElement);

window.page_init = function(){}

window.conv_dec = function(){
    
}
window.conv_hex = function(){
    
}
window.conv_bin = function(){
    
}
window.conv_eng = function(){
    
}
window.conv_roman = function(){
    
}
window.conv_east = function(){
    
}
window.conv_dev = function(){
    
}
window.conv_ind = function(){
    
}
window.conv_chi = function(){
    
}
window.conv_chi_f = function(){
    
}

var ions = ["million", "billion", "trillion", "quadrillion", "quintillion", "sextilion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion"];
function numToEng(num){
    function conv_0to19(num){
        switch(num){
            case 0: return "zero"; case 1: return "one"; case 2: return "two"; case 3: return "three";
            case 4: return "four"; case 5: return "five"; case 6: return "six"; case 7: return "seven";
            case 8: return "eight"; case 9: return "nine"; case 10: return "ten"; case 11: return "eleven";
            case 12: return "twelve"; case 13: return "thirteen"; case 14: return "fourteen"; case 15: return "fifteen";
            case 16: return "sixteen"; case 17: return "seventeen"; case 18: return "eighteen"; case 19: return "nineteen";
        }
    }
    function conv_20to99(num){
        switch(num){
            case 20: return "twenty"; case 30: return "thirty"; case 40: return "forty"; case 50: return "fifty";
            case 60: return "sixty"; case 70: return "seventy"; case 80: return "eighty"; case 90: return "ninety";
        }
        return conv_20to99(Math.floor(num/10)*10) + "-" + (num%10==0 ? "" : conv_0to19(num%10));
    }
    if(num<100){return num>=20?conv_20to99(num):conv_0to19(num);}
    function conv_100to999(){
        if(num%100==0){return numToEng(Math.floor(num/100)) + " hundred";}
        return numToEng(Math.floor(num/100)) + " hundred and " + numToEng(num%100);
    }
    if(num<1000){return conv_100to999(num);}

    var numStr = [...num.toString()];
    for(var i=numStr.length-3; i>0; i-=3){
        var tmpNum = 0;
        for(var j=0; j<3; j++){
            if(i+j<0){continue;}
            tmpNum+=10**j*Number(numStr[j]);
        }
    }
}