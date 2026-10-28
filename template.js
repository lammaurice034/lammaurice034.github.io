import * as utils from "/utils.js";

// consts
var tilingCount = 5;
var posters = 1;

if(document.addEventListener){
    document.addEventListener("DOMContentLoaded", loadLayout, false);
}else if(window.attachEvent){
    window.attachEvent("onload", loadLayout);
}else{
    window.onload = loadLayout;
}
function loadLayout() {
    utils.xhr_fetch("/template.html", function(err, html){
        if(err){return;}
        document.getElementById("sharedLayout").innerHTML = html;
        init();
    });
}

function init(){
    // spacing and stuff
    var headerHeight = document.getElementById("template_header").getBoundingClientRect().height;
    var footerHeight = document.getElementById("template_footer").getBoundingClientRect().height;
    document.getElementById("headerBuffer").style.height = headerHeight+"px";
    document.getElementById("template_pageLayout").style.minHeight = "calc(100vh - " + (headerHeight+footerHeight) + "px)";
    document.body.style.backgroundImage = "url('/imgs/tiling/tiling" + utils.randInt(1,tilingCount) + ".png')";
    // weather
    var template = document.getElementById("pageTemplate");
    if (template && document.getElementById("pageContent")) {
        var contentClone = template.content.cloneNode(true);
        document.getElementById("pageContent").appendChild(contentClone);
    }
    getWeather(function(str){
        var location = str.split(";")[0].split(",");
        var cityStr = location[0];
        if(location.length>2){cityStr += ", " + utils.stateAbbr(location[1]);}
        document.getElementById("template_city").innerHTML = "<i>"+cityStr+"</i>";
        var weather = str.split(";")[1];
        var temp = parseInt(weather.split("|")[1].substring(0, weather.split("|")[1].length-2));
        document.getElementById("template_weather").innerHTML = temp + weather.split("|")[1].substring(weather.split("|")[1].length-2);
        document.getElementById("template_weatherpic").src = getWeatherImg(weather.split("|")[0]);
    });
    // site nav
    navToPath(window.location.pathname.replace(/\/+$/, "").replace(/\/[^/]*$/, ""));
    // set up links in <a>
    document.querySelectorAll('a[data-url]').forEach(function(a){
        a.href = a.dataset.url;
        a.textContent = a.dataset.url;
        a.target= "_blank";
    });
    // other stuff
    addPoster(document.getElementById("template_sidebar_left"), "/imgs/posters/poster" + utils.randInt(1,posters) + ".gif", "90%");
    tick();
    setInterval(tick, 1000); //updates per 1000ms i.e. 1s
}

export function navToPath(path){
    path = path.replace(/\/+/g, "/");
    function isFile(str) {
        var name = str.split("/").pop();
        if(!name || name === "." || name === ".."){
            return false;
        }
        return name.includes(".");
    }
    
    if(isFile(path)){
        window.location.href = path;
        return;
    }
    var siteNav = document.getElementById("template_nav");
    utils.xhr_fetch("/siteStruct.json", function(err, txt){
        if(!err){
            var json = JSON.parse(txt);
            siteNav.replaceChildren();  
            var htmlString = "";
            var pathString = "MAURICE'S BS > ";
            for(var token of path.split("/")){
                if(isFile(token)){break;}
                if(token.trim() == ""){continue;}
                pathString = pathString + token.toUpperCase() + " > ";
                json = json.contents.find(function(item){return item.name.toUpperCase()==token.toUpperCase()+"/"});
            }
            
            htmlString = htmlString + '<p style="font-family: Times New Roman,serif; font-size: .7em"> ' + pathString +'</p><div style="height: .5em;"></div>';
            htmlString = htmlString + "<div style=\"width:100%\">";
            if(pathString != "MAURICE'S BS > "){
                htmlString = htmlString + '<span style="text-align:left;" onclick="navToPath(\''
                + path.replace(/\/+$/, "").replace(/\/[^/]*$/, "")
                +'\');"> <img src="/imgs/folder.png" style="width:1em; height:1em;">'+"(Up a level)"+"</span>";
            }
            json = json.contents;

            for(var [name, value] of Object.entries(json)){
                htmlString = htmlString + '<div style="height: .0em;"></div>';
                htmlString = htmlString + '<span style="text-align:left;" title="' + value.name.toUpperCase()
                    +'" onclick="navToPath(\''
                    + path + "/" + value.name +
                    '\');"> <img src="/imgs/' + (isFile(value.name) ? "goto":"folder") +'.png" style="width:1em; height:1em;">' 
                    + (value.displayName===undefined ? value.name.toUpperCase() : value.displayName) +"</span>";
            }
            htmlString = htmlString + '</div><span style="text-align:center; width:100%;" onclick="navToPath(\''
                + window.location.pathname.replace(/\/+$/, "").replace(/\/[^/]*$/, "")
                +'\');">'+"(Back to current directory)"+"</span>";

            siteNav.insertAdjacentHTML("beforeend", htmlString);
        }
    })
}
window.navToPath = navToPath;

export function goBack(){
    const referrer = document.referrer;
    if(referrer){
        const previousUrl = new window.URL(referrer);
        if(previousUrl.pathname === '/' || previousUrl.pathname === '/template.html'){return false;}
        if(previousUrl.origin === window.location.origin){
            history.back();
        }
    } return false;  
}
window.goBack = goBack;

function addPoster(parent, imgsrc, width="fit-content", onclick=""){
    var str = "<div class=\"poster\" style=\"place-items:center; display:grid; width:"+ width 
    +"; padding:4px; background-color:#ffe; border:1px solid slategray;\"> <p onclick=\"this.parentElement.remove();\" style=\"cursor:pointer; text-align:right; width:100%; font-size:.75em;\">[X]</p>" +
    "<div style=\"height:4px;\"></div>"+
    "<img src=" + imgsrc + " style=\"width:100%\" onclick=\"" + onclick+ "\"></div>";
    parent.insertAdjacentHTML("beforeend", str);
}

function tick(){
    drawClock();
}

function template_colonise(){
    var pageContent = document.getElementById("pageContent");
    pageContent.replaceChildren();
    pageContent.style = "display:flex; flex-direction:column;";
    pageContent.style.backgroundImage = "url('/imgs/unionjack.png')";
    pageContent.style.backgroundSize = "100% 100%";
    var audio = new Audio('/audio/rulebritainnia.wav');
    audio.loop = true;
    audio.play();
    pageContent.insertAdjacentHTML("beforeend", 
        '<span style="width:100%; text-align:center; font-size:2.5em; font-family: Impact,sans-serif; -webkit-text-stroke: 1px white; color: black; font-weight:900;"> <b>PLEASE EXCUSE THE INTERRUPTION OF YOUR WEBSITE NAVIGATION</b> </span>' + 
        '<span style="flex:1"> </span>' +
        '<span style="width:100%; text-align:center; font-size:2.5em; font-family: Impact,sans-serif; -webkit-text-stroke: 1px white; color: black; font-weight:900;"> <b>THIS FILE HAS BEEN COLONISED</b> </span>' +
        '<span style="width:100%; text-align:center; 1px white; color: black; font-weight:900;"> <b>(Reload page to continue)</b> </span>'
    );
}
window.template_colonise = template_colonise;

function template_mitosis(){
    var pageContent = document.getElementById("template_links_left");
    pageContent.insertAdjacentHTML('beforeend', '<div class = "toplink right"> <span onclick="template_mitosis();" title="Mitosis button"> Mitosis </span> </div>');
}
window.template_mitosis = template_mitosis;

function getWeather(callback){
    utils.xhr_fetch("https://wttr.in/?format=%l;%C|%t", function(err, text){
        if(err){callback(""); return;}
        var match = text.match(/<div class="term-container">([\s\S]*?)<\/div>/);
        callback(match ? match[1].trim() : "");
    });
}

function getWeatherImg(str){
    switch(str.trim().toLowerCase()){
        case "clear":
        case "sunny":
            if(new Date().getHours()>=6&&new Date().getHours()<=18){
                return("/imgs/weather/clear_day.gif");
            }else{
                return("/imgs/weather/clear_night.gif");
            }
        case "partly cloudy":
        case "cloudy":
        case "overcast":
            return("/imgs/weather/cloudy.gif");
        case "mist":
        case "fog":
        case "freezing fog":
            return("/imgs/weather/fog.gif");
        case "patchy rain possible":
        case "Patchy light drizzle":
        case "light drizzle":
        case "light rain":
        case "moderate rain at times":
        case "moderate rain":
        case "heavy rain at times":
        case "heavy rain":
        case "patchy light rain":
        case "light rain shower":
        case "moderate or heavy rain shower":
        case "torrential rain shower":
            return("/imgs/weather/rain.gif");
        case "patchy snow possible":
        case "blowing snow":
        case "blizzard":
        case "patchy light snow":
        case "light snow":
        case "patchy moderate snow":
        case "moderate snow":
        case "patchy heavy snow":
        case "heavy snow":
        case "light snow showers":
        case "moderate or heavy snow showers":
            return("/imgs/weather/snow.gif");
        case "patchy sleet possible":
        case "freezing drizzle":        
        case "patchy freezing drizzle possible":
        case "heavy freezing drizzle":
        case "light freezing rain":
        case "moderate or heavy freezing rain":
        case "light sleet":
        case "moderate or heavy sleet":
        case "ice pellets":
        case "light sleet showers":
        case "moderate or heavy sleet showers":
            return("/imgs/weather/sleet.gif");
        case "thundery outbreaks possible":
        case "patchy light rain with thunder":
        case "moderate or heavy rain with thunder":
        case "patchy light snow with thunder":
        case "moderate or heavy snow with thunder":
            return("/imgs/weather/thunder.gif");
    }
    console.log(str);
    return "";
}

function drawClock(){
    var clock = document.getElementById("template_clock");
    clock.width = clock.getBoundingClientRect().width;
    clock.height = clock.width;
    var ctx = utils.imgGetGraphics(clock);
    utils.clear(ctx);
    utils.setDrawingColour(ctx, 'black');
    var sideLength = Math.tan(Math.PI/12)*clock.width-2;
    var pt = {x: clock.width/2-sideLength/2, y: 2};
    var outlineArr = new Array(12);
    for(var i=0; i<12; i++){
        outlineArr[i] = pt;
        pt = utils.pixel_translate_polar(pt, Math.PI/6*i, sideLength);
    }
    utils.setDrawingColour(ctx, 'white');
    utils.drawPolygon(ctx, outlineArr, 0);
    utils.setDrawingColour(ctx, 'black');
    utils.drawPolygon(ctx, outlineArr, 3);
    var origin = {x: clock.width/2, y: clock.width/2};
    var now = new Date();
    utils.setDrawingColour(ctx, 'red');
    utils.drawLine(ctx, origin, utils.pixel_translate_polar(origin, Math.PI*now.getSeconds()/30-Math.PI/2, clock.width*.4), 1);
    utils.setDrawingColour(ctx, 'green');
    utils.drawLine(ctx, origin, utils.pixel_translate_polar(origin, Math.PI*now.getMinutes()/30-Math.PI/2, clock.width*.38), 3);
    utils.setDrawingColour(ctx, 'mediumblue');
    utils.drawLine(ctx, origin, utils.pixel_translate_polar(origin, Math.PI*now.getMinutes()/30/12 + Math.PI*(now.getHours()%12)/6 -Math.PI/2, clock.width*.23), 4);
    var dayString = utils.numToDay(now.getDay()).substring(0,3).toUpperCase() + " " + (now.getDate()<10?"0":"") + now.getDate();
}


