import * as utils from "/utils.js";
import { minContentHeight } from "/template.js";

var bet_btn; var stand_btn; var hit_btn; var split_btn; var doubleDown_btn;
var bank_lbl; var maindiv; var handdivs = [];
var cardWidth; var cardHeight;

window.page_init = function(){
    var left = document.getElementById("leftpanel");
    var right = document.getElementById("rightpanel");
    bet_btn = document.getElementById("betbtn");
    stand_btn = document.getElementById("stand");
    hit_btn = document.getElementById("hit");
    split_btn = document.getElementById("split");
    doubleDown_btn = document.getElementById("doubleDown");
    bank_lbl = document.getElementById("bank");
    maindiv = document.getElementById("maindiv");
    cardHeight = utils.emToPx(maindiv, 5); cardWidth = utils.emToPx(maindiv, 3);
    left.style.minHeight = "calc(" + minContentHeight +" - 7.5em)";
    var observer = new ResizeObserver(function(){
        right.style.height = left.offsetHeight + "px";
    });
    observer.observe(left);
    endGame();
    setInterval(tick, 100); //updates per 100ms i.e. 1s
}

function tick(){
    if(toDraw.length>0){ // w/in toDraw: {card: (card), index: 0 if dealer, # of hand of player otherwise, cardPos: position of card in hand}
        var isNewHand = toDraw[0].cardPos == 0; var idx = toDraw[0].index;
        if(isNewHand){
            handdivs.push(document.createElement("div"));
            handdivs[handdivs.length-1].style = "display:flex; align-items:center; margin-bottom: .5em;";
            var tmp = document.createElement("span");
            tmp.textContent = idx==0?"Dealer":("Player's #"+idx);
            tmp.style = "writing-mode: vertical-rl; text-orientation: mixed;";
            handdivs[handdivs.length-1].append(tmp);
            var tmp2 = document.createElement("span");
            tmp2.style="width:3em; display:inline-block; text-align:center;";
            tmp2.id = "lbl"+idx;
            handdivs[handdivs.length-1].append(tmp2);
            maindiv.append(handdivs[handdivs.length-1]);
        }
        var cardX = toDraw[0].cardPos*(cardWidth+5) + utils.emToPx(maindiv, 1.5); var cardY = toDraw[0].index*(cardHeight+5);
        var card = toDraw.shift().card;
        var cardEl = document.createElement("img");
        cardEl.style = "width:" + cardWidth+"px; height:" + cardHeight +"px; border:1px solid black;";
        handdivs[idx].append(cardEl);
        updateLbls();
    }
}

function updateLbls(){
    document.getElementById("lbl0").innerHTML = "?";
    for(var idx=1; idx<=player.length; idx++){
        var issoft = (getMinValue(player[idx-1])==getMaxValue(player[idx-1]))?"":"<br>(Soft)";
        var ptr = handIdx+1==idx?"<br>☞":"";
        console.log(document.getElementById("lbl"+idx));
        document.getElementById("lbl"+idx).innerHTML = getMaxValue(player[idx-1]) + issoft + ptr;
    }
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
var toDraw = [];

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

window.btn_bet = function(){
    document.getElementById("bet").value = Math.min(document.getElementById("bet").max, Math.max(document.getElementById("bet").value, document.getElementById("bet").min)); 
    bet = document.getElementById("bet").value;
    if(bank<bet){
        alert("Insufficient funds - please lower your bet!");
        return;
    }
    newGame();
    setBankText();
}
window.btn_stand = function(){
    updateLbls();
}
window.btn_hit = function(){
    updateLbls();
}
window.split = function(){
    if(bank<bet*(BEGINNING_CARDS-1)){
        alert("Insufficient funds to split!");        
        return;
    }
    setBankText();
    updateLbls();
}
window.doubleDown_btn = function(){
    if(bank<bet){
        alert("Insufficient funds to double down!");
        return;
    }
    setBankText();
    updateLbls();
}

function dealCard(card, to){
    if(to==0){
        dealer.push(card);
    }else{
        player[to-1].push(card);
    }
    toDraw.push({card: card, index: to, cardPos: to==0?(dealer.length-1):(player[to-1].length-1)});
    maindiv.style.minHeight = "calc(" + (player.length+1) + " * (5px + 5em))";
}

function newGame(){
    if(gameStarted){return;}
    if(bet>bank){return;}
    maindiv.replaceChildren();
    while(handdivs.pop()){}
    maindiv.minHeight = "5em";
    document.getElementById("bet").disabled = true;
    bet_btn.disabled = true;
    bank -= bet;
    gameStarted=true;
    hasStood = false;
    handIdx=0;
    while(player.pop() !== undefined){}
    while(dealer.pop() !== undefined){}
    player.push([]);
    for(var i=0; i<BEGINNING_CARDS; i++){
        dealCard(nextCard(), 0);
        dealCard(nextCard(), 1);
    }
    if(getMaxValue(dealer)==BUST || getMaxValue(player[0])>=BUST){ // dealer/player blackjack or player busts right away
        endGame();
        return;
    }
    callback();
    setBankText();
}

function endGame(){
    if(gameStarted){
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
    gameStarted = false;
    document.getElementById("bet").max = bank;
    document.getElementById("bet").disabled = false;
    bet_btn.disabled = false;
    console.log(hit_btn);
    split_btn.disabled = true;
    hit_btn.disabled = true;
    stand_btn.disabled = true;
    doubleDown_btn.disabled = true;
    setBankText();
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
                dealCard(nextCard(), 0);
                callback();
            }else{
                endGame();
                return;
            }            
        }
    }else{ 
        if(player[handIdx].length<BEGINNING_CARDS){
            dealCard(nextCard(), handIdx+1);
            callback();
        }
    }
}

function setBankText(){
    bank_lbl.innerHTML = "<b>Bank</b>: $" + bank.toFixed(2);
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
function split(){
    if(!gameStarted || handIdx>=player.length){return;}
    if(bank<bet*(BEGINNING_CARDS-1)){return;}
    if(canSplit(player[handIdx]) && player[handIdx].length==BEGINNING_CARDS){
        bank -= bet*(BEGINNING_CARDS-1);
        var tmp = player[handIdx].pop();
        player.push([]);
        dealCard(tmp, player.length);
        callback();
    }
}

function hit(){
    if(!gameStarted || handIdx>=player.length){return;}
    dealCard(nextCard(), handIdx+1);
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