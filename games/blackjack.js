import * as utils from "/utils.js";
import { minContentHeight } from "/template.js";

window.page_init = function(){
    var left = document.getElementById("leftpanel");
    var right = document.getElementById("rightpanel");
    left.style.minHeight = "calc(" + minContentHeight +" - 7em)";
    console.log(minContentHeight);
    const observer = new ResizeObserver(function(){
        right.style.height = left.offsetHeight + "px";
    });
    observer.observe(left);
    //tick();
    //setInterval(tick, 1000); //updates per 1000ms i.e. 1s
}

function tick(){
    
}

var BUST = 21;
var BEGINNING_CARDS = 2; 
var HIT_ON_SOFT = true;
var DEALER_STANDON = 17;

var gameStarted = false;
var hasStood = false;
var handIdx = 0;
var bet = 10;
var bank = 1000;
var player = [];
var dealer = [];


function nextCard(){
    // card: {suit, id, [value funcs]}
    var id=utils.randInt(1, 13);
    var funcs = [];
    switch(id){
        case 1:
            funcs = [
                function(val){return val+1;},
                function(val){return val+11;}
            ];
            break;
        case 11: case 12: case 13:
            funcs = [function(val){return val+10;}];
            break;
        case 2: case 3: case 4: case 5: case 6:
        case 7: case 8: case 9: case 10:
            funcs = [function(val){return val+id;}];
            break;
    }
    var suit = utils.randInt(1,4);
    return {suit, id, funcs};
}

function getMinValue(hand){
    var value = 0;
    for(var i=0; i<hand.length; i++){
        var minval = hand[i].funcs[0](value);
        for(var j=1; j<hand[i].funcs.length; j++){
            if(minval > hand[i].funcs[j](value)){
                minval= hand[i].funcs[j](value);
            }
        }
        value = minval;
    }
    return value;
}
function getMaxValue(hand){ // get largest value w/o busting
    function f1(vals, hand2){
        if(hand2.length == 0){return vals;}
        var newvals = [];
        for(var i=0; i<vals.length; i++){
            for(var j=0; j<hand2[0].funcs.length; j++){
                var newval = hand2[0].funcs[j](vals[i]);
                if(newval<=BUST && !newvals.includes(newval)){newvals.push(newval);}
            }
        }
        hand2.shift();
        return f1(newvals, hand2);
    }
    var hand_copy = [...hand];
    var values = f1([0], hand_copy);
    return values.length==0 ? BUST+1 : Math.max(...values);
}

function canSplit(arr){
    if(arr.length<=1){return false;}
    var id = arr[0].id;
    for(var i=1; i<arr.length; i++){
        if(id!=arr[i].id){return false;}
    }
    return true;
}

function newGame(){
    if(gameStarted){return;}
    if(bet>bank){return;}
    bank -= bet;
    gameStarted=true;
    hasStood = false;
    handIdx=0;
    while(player.pop() !== undefined){}
    while(dealer.pop() !== undefined){}
    player.push([]);
    for(var i=0; i<BEGINNING_CARDS; i++){
        player[0].push(nextCard());
        dealer.push(nextCard());
    }
    if(getMaxValue(dealer)==BUST || getMaxValue(player[0])>=BUST){ // dealer/player blackjack or player busts right away
        endGame();
        return;
    }
    callback();
}

function endGame(){
    gameStarted=false;
    if(player.length==1&&player[0].length==BEGINNING_CARDS&&getMaxValue(dealer)==BUST){
        //dealer blackjack
        return;
    }
    if(player.length==1&&player[0].length==BEGINNING_CARDS&&getMaxValue(player[0])==BUST){
        //player blackjack
        bank += 2.5*bet;
        return;
    }
    if(player.length==1&&player[0].length==BEGINNING_CARDS&&getMaxValue(player[0])>BUST){
        //player busts right away
        return;
    }
    for(var i=0; i<player.length; i++){
        if(getMaxValue(player[i])>BUST){continue;}
        if(getMaxValue(dealer)>BUST){bank += 2*bet;}
        if(getMaxValue(dealer)==getMaxValue(player[i])){bank += bet;}
        if(getMaxValue(dealer)<getMaxValue(player[i])){bank += 2*bet;}
    }
}

function callback(){
    if(!gameStarted){return;}
    if(handIdx>=player.length && !hasStood){
        // all busted and/or blackjack
        endGame();
        return;
    }
    if(handIdx>=player.length){ // has at least one hand stood; time for dealer to reveal cards
        if(getMaxValue(dealer)<=BUST){
            if(!(!HIT_ON_SOFT&&getMaxValue(dealer) >= DEALER_STANDON) && !(HIT_ON_SOFT&&getMinValue(dealer) >= DEALER_STANDON)){
                dealer.push(nextCard());
                callback();
            }else{
                endGame();
                return;
            }            
        }
    }else{ 
        if(player[handIdx].length<BEGINNING_CARDS){
            player[handIdx].push(nextCard());
            callback();
        }
    }
}

function split(){
    if(!gameStarted || handIdx>=player.length){return;}
    if(bank<bet*(BEGINNING_CARDS-1)){return;}
    if(canSplit(player[handIdx]) && player[handIdx].length==BEGINNING_CARDS){
        bank -= bet*(BEGINNING_CARDS-1);
        var tmp = player[handIdx].pop();
        player.push([tmp]);
        callback();
    }
}

function hit(){
    if(!gameStarted || handIdx>=player.length){return;}
    player[handIdx].push(nextCard());
    if(getMinValue(player[handIdx])>BUST){
        handIdx++; // busted; go onto next hand if available
    }
    callback();
}
function stand(){
    if(!gameStarted || handIdx>=player.length){return;}
    hasStood = true;
    handIdx++;
    callback();
}