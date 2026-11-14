import * as utils from "/utils.js";
var root = getComputedStyle(document.documentElement);
var dec; var hex; var bin; var eng; var rom;
var eas; var ind; var chi; var chf;

window.page_init = function(){
    dec = document.getElementById("dec");
    hex = document.getElementById("hex");
    bin = document.getElementById("bin");
    eng = document.getElementById("eng");
    rom = document.getElementById("rom");
    eas = document.getElementById("eas");
    ind = document.getElementById("ind");
    chi = document.getElementById("chi");
    chf = document.getElementById("chf");
    dec.value="1234";
    conv_dec();
}

window.conv_dec = function(){
    dec.value = dec.value.replace(/\D/g,'');
    if(dec.value==""){return;}
    var val = Number(dec.value);
    eng.value = numToEng(val);
    bin.value = utils.baseConv(val, 10, 2);
    hex.value = utils.baseConv(val, 10, 16);
    chi.value = numToChi(val);
    chf.value = chiToChf(chi.value);
    eas.value = numToEast(val);
    rom.value = numToRoman(val);
    ind.value = numToInd(val);
}
window.conv_hex = function(){
    hex.value = hex.value.toUpperCase();
    hex.value = hex.value.replace(/[^0-9A-F]/g, "");
    if(hex.value==""){return;}
    var val = utils.baseConv(hex.value, 16, 10);
    dec.value = val;
    bin.value = utils.baseConv(val, 10, 2);
    eng.value = numToEng(val);
    chi.value = numToChi(val);
    chf.value = chiToChf(chi.value);
    eas.value = numToEast(val);
    rom.value = numToRoman(val);
    ind.value = numToInd(val);
}
window.conv_bin = function(){
    bin.value = bin.value.toUpperCase();
    bin.value = bin.value.replace(/[^0-1]/g, "");
    if(bin.value==""){return;}
    var val = utils.baseConv(bin.value, 2, 10);
    dec.value = val;
    hex.value = utils.baseConv(val, 10, 16);
    eng.value = numToEng(val);
    chi.value = numToChi(val);
    chf.value = chiToChf(chi.value);
    eas.value = numToEast(val);
    rom.value = numToRoman(val);
    ind.value = numToInd(val);
}
window.conv_eng = function(){
    dec.value = engToNum(eng.value);
    var val = Number(dec.value);
    hex.value = utils.baseConv(val, 10, 16);
    bin.value = utils.baseConv(val, 10, 2);
    chi.value = numToChi(val);
    chf.value = chiToChf(chi.value);
    eas.value = numToEast(val);
    rom.value = numToRoman(val);
    ind.value = numToInd(val);
}
window.conv_roman = function(){
    var val = romanToNum(rom.value);
    eng.value = numToEng(val);
    hex.value = utils.baseConv(val, 10, 16);
    bin.value = utils.baseConv(val, 10, 2);
    chi.value = numToChi(val);
    chf.value = chiToChf(chi.value);
    dec.value = engToNum(eng.value);
    eas.value = numToEast(val);
    ind.value = numToInd(val);
}
window.conv_east = function(){
    var val = eastToNum(eas.value);
    eng.value = numToEng(val);
    hex.value = utils.baseConv(val, 10, 16);
    bin.value = utils.baseConv(val, 10, 2);
    chi.value = numToChi(val);
    chf.value = chiToChf(chi.value);
    dec.value = engToNum(eng.value);
    rom.value = numToRoman(val);
    ind.value = numToInd(val);
}
window.conv_ind = function(){
    var val = indToNum(ind.value);
    eng.value = numToEng(val);
    hex.value = utils.baseConv(val, 10, 16);
    bin.value = utils.baseConv(val, 10, 2);
    chi.value = numToChi(val);
    chf.value = chiToChf(chi.value);
    dec.value = engToNum(eng.value);
    rom.value = numToRoman(val);
    eas.value = numToEast(val);
}
window.conv_chi = function(){
    chf.value = chiToChf(chi.value);
    var val = chiToNum(chi.value);
    dec.value = val;
    hex.value = utils.baseConv(val, 10, 16);
    bin.value = utils.baseConv(val, 10, 2);
    eng.value = numToEng(val);
    eas.value = numToEast(val);
    rom.value = numToRoman(val);
    ind.value = numToInd(val);
}
window.conv_chi_f = function(){
    chi.value = chfToChi(chf.value);
    var val = chiToNum(chi.value);
    dec.value = val;
    hex.value = utils.baseConv(val, 10, 16);
    bin.value = utils.baseConv(val, 10, 2);
    eng.value = numToEng(val);
    eas.value = numToEast(val);
    rom.value = numToRoman(val);
    ind.value = numToInd(val);
}

var ions = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextilion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion"];
var ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
var tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninty"];

function numToEng(num){
    num = num.toString();
    function under1k(num2){
        function under100(num2){
            if(num2<20){return ones[num2];}
            if(num2<100){return tens[Math.floor(num2/10)] + (num2%10==0?"":"-"+ones[num2%10]);}
        }
        if(num2<100){return under100(num2);}
        if(num2%100==0){return ones[Math.floor(num2/100)] + " hundred";}
        return ones[Math.floor(num2/100)] + " hundred and " + under100(num2%100);
    }
    if(num<1000){return under1k(Number(num));}
    var result = "";
    var hasAnd = true;
    for(var i=0; num.length>0&&i<ions.length; i++){
        var tmp = Number(num.substring(Math.max(num.length-3, 0)));
        num = num.substring(0, Math.max(num.length-3, 0));
        if(tmp==0){continue;}
        if(i==0&&Math.floor(tmp/100)==0){hasAnd=false;}
        result = (hasAnd?"":"and ") + under1k(tmp) + " " + ions[i] + " " + result;
        hasAnd = true;
    }
    return result.trim();
}

function engToNum(str){
    str=str.replaceAll("-", " ").trim().toLowerCase();
    if(str=="zero"){return 0;}
    if(str!=""&&ions.includes(str)){
        return 10**(3*ions.indexOf(str));
    }
    var num = 0;
    var tmpNum = 0;
    var undef = false;
    str.split(" ").forEach(function(word){
        if(word!=""){
            if(ions.includes(word)){
                num += tmpNum*10**(3*ions.indexOf(word));
                tmpNum=0;
            }else if(word == "hundred"){
                tmpNum*=100;
            }else{
                switch(word.trim()){
                    case "one": tmpNum+=1; break;
                    case "two": tmpNum+=2; break;
                    case "three": tmpNum+=3; break;
                    case "four": tmpNum+=4; break;
                    case "five": tmpNum+=5; break;
                    case "six": tmpNum+=6; break;
                    case "seven": tmpNum+=7; break;
                    case "eight": tmpNum+=8; break;
                    case "nine": tmpNum+=9; break;
                    case "ten": tmpNum+=10; break;
                    case "eleven": tmpNum+=11; break;
                    case "twelve": tmpNum+=12; break;
                    case "thirteen": tmpNum+=13; break;
                    case "fourteen": tmpNum+=14; break;
                    case "fifteen": tmpNum+=15; break;
                    case "sixteen": tmpNum+=16; break;
                    case "seventeen": tmpNum+=17; break;
                    case "eighteen": tmpNum+=18; break;
                    case "nineteen": tmpNum+=19; break;
                    case "twenty": tmpNum+=20; break;
                    case "thirty": tmpNum+=30; break;
                    case "forty": tmpNum+=40; break;
                    case "fifty": tmpNum+=50; break;
                    case "sixty": tmpNum+=60; break;
                    case "seventy": tmpNum+=70; break;
                    case "eighty": tmpNum+=80; break;
                    case "ninty": tmpNum+=90; break;
                    case "and": case "zero": break;
                    default: undef = true;
                }
            }
        }
    });
    return undef?"undefined":num+tmpNum;
}

var chi_arr = [..."零一二三四五六七八九十百千萬億兆京垓秭壤溝澗正載"];
var chf_arr = [..."零壹貳叄肆伍陸柒捌玖拾佰仟萬億兆京垓秭壤溝澗正載"];

function numToChi(num){
    num = num.toString();
    if(num==""){return chi_arr[0];}
    function under10k(num){
        var str = "";
        num = Number(num).toString();
        if(num.length<=2){
            if(Number(num)<=10){return chi_arr[Number(num)];}
            if(Number(num)<20){return chi_arr[Number(10)]+chi_arr[Number(num%10)];}
        }
        var lastWasZero = false;
        for(var i=num.length-1; i>=0; i--){
            str = (num.charAt(i)==0&&(lastWasZero||i==num.length-1)?"":chi_arr[Number(num.charAt(i))])
            + (num.charAt(i)==0?"":["", "十","百","千"][(num.length-i-1)%4]) + str;
            lastWasZero = num.charAt(i)==0;
        }
        return str;
    }
    if(num.length<=4){return under10k(num);}
    var lastHadZero = false;
    var forceZero = false;
    var result = "";
    var counter = 12;
    for(var i=num.length-4; i>=-3; i-=4){
        var tmp = num.substring(Math.max(0,i), i+4);
        if(tmp==0){
            forceZero = true;
            counter++; continue;
        }
        result = (i>0&&tmp<1000&&!lastHadZero?chi_arr[0]:"") + under10k(tmp) +(counter==12?"":chi_arr[counter]) + (!lastHadZero&&forceZero?chi_arr[0]:"") + result;
        counter++;
        lastHadZero = tmp<1000&&!lastHadZero;
        forceZero = false;
    }
    return result;
  }
   
function chiToNum(str){
    var num = 0;
    var tmpStr = "";
    function under10k(str){
        if(str==""){return 0;}
        var tmp = 0;
        var result = 0;
        for(var word of [...str]){
            var idx = chi_arr.indexOf(word);
            if(idx<=9){tmp=idx;}else{
                if(tmp==0&&idx==10){result+=10;}
                else{result+=tmp*10**(idx-9);}
                tmp=0;
            }
        }
        return result+tmp;
    }
    for(var word of [...str]){
        var idx = chi_arr.indexOf(word);
        if(idx<0){return undefined;}
        if(idx<=12){
            tmpStr = tmpStr + word;
        }else{
            var u10k = under10k(tmpStr);
            num += u10k*10**(4*(idx-12));
            tmpStr = "";
        }  
    }
    return num+under10k(tmpStr);
}  

function chiToChf(str){
    var result = "";
    for(var c of str){
        var idx = chi_arr.indexOf(c);
        if(idx==-1){return undefined;}
        result += chf_arr[idx];
    }
    return result;
}
function chfToChi(str){
    str = str.replaceAll(/[弌]/gu, "壹");
    str = str.replaceAll(/[弍贰]/gu, "貳");
    str = str.replaceAll(/[弎叁參]/gu, "叄");
    str = str.replaceAll(/[䦉]/gu, "肆");
    str = str.replaceAll(/[陆]/gu, "陸");
    var result = "";
    for(var c of str){
        var idx = chf_arr.indexOf(c);
        if(idx==-1){return undefined;}
        result += chi_arr[idx];
    }
    return result;
}

function numToEast(num){
    num = num.toString();
    var arr = [..."٠١٢٣٤٥٦٧٨٩"];
    var result = "";
    for(var i=0; i<num.length; i++){
        result += arr[Number(num.charAt(i))];
    }
    return result;
}

function eastToNum(east){
    var arr = [..."٠١٢٣٤٥٦٧٨٩"];
    var result = "";
    for(var i=0; i<east.length; i++){
        result += arr.indexOf(east.charAt(i));
    }
    return Number(result);
}

function romanToNum(str){
    var result = 0;
    str = str.toUpperCase().replaceAll(" ", "");
    function conv(c){
        switch(c.toUpperCase().trim()){
            case "I": return 1; case "V": return 5; case "X": return 10;
            case "L": return 50; case "C": return 100; case "D": return 500; case "M": return 1000;
        }
        return 0;
    }
    var lastDigit = 100000;
    for(var c of [...str]){
        var currentDigit = conv(c);
        if(lastDigit<currentDigit){result+=-lastDigit*2+currentDigit;}
        else{result+=currentDigit;}
        lastDigit=currentDigit;
    }
    return result;
}
function numToRoman(num){
    if(num>=4000){return undefined;}
    function fromDig(d, power10){
        var char1 = 'I'; var char5 = 'V'; var char10 = 'X';
        switch(power10){
            case 1: char1 = 'X'; char5 = 'L'; char10 = 'C'; break;
            case 2: char1 = 'C'; char5 = 'D'; char10 = 'M'; break;
        }
        switch(d){
            case 0: return ""; case 5: return char5;
            case 4: return char1+char5; case 9: return char1+char10;
            default:
                return (d>5?char5:"")+char1.repeat(d%5);
        }
        return undefined;
    }
    var result = "";
    while(num>1000){
        num-=1000;
        result+="M";
    }
    return result + fromDig(Math.floor(num/100)%10,2) + fromDig(Math.floor(num/10)%10,1) + fromDig(Math.floor(num)%10,0);
}

var ind_arr = ["thousand", "lakh", "crore", "arab", "kharab", "neel", "padma"];
function indToNum(str){
    var prevNum = true;
    var tmp = "";
    var arr = [];
    for(var c of [...str]){
        if((isNaN(c)&&!prevNum)||(!isNaN(c)&&prevNum)){
            tmp +=c;
        }else{
            arr.push(tmp); tmp=c;
        }
        prevNum = !isNaN(c);
    }
    if(tmp!=""){arr.push(tmp);}
    var prev = "0";
    var result = 0;
    try{
    for(var word of arr){
        if(ind_arr.indexOf(word.toLowerCase())>-1){
            result += Number(prev)*10**(ind_arr.indexOf(word.toLowerCase())*2+3)
        }else{prev = word;}
    }
    }catch(error){return undefined;}
    if(!isNaN(arr[arr.length-1])){result+=Number(arr[arr.length-1]);}
    return result;
}
function numToInd(num){
    num = num.toString();
    if(num.length<4){return num;}
    var result = num.substring(num.length-3);
    num = num.substring(0, num.length-3);
    for(var i=0; i<ind_arr.length&&num.length>=1; i++){
        result = (num.length>=2?num.substring(num.length-2):num.charAt(0)) + " " + ind_arr[i] + " " + result;
        num = num.substring(0, Math.max(0,num.length-2));
    }
    if(num.length>0){result = num + " shankh " + result;}
    return result;
}