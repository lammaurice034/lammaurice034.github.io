/////////////
/* Strings */
/////////////

export function numToDay(num, long=true){
    switch(num){
        case 0: return long? "Sunday":"Sun";
        case 1: return long? "Monday":"Mon";
        case 2: return long? "Tuesday":"Tue";
        case 3: return long? "Wednesday":"Wed";
        case 4: return long? "Thursday":"Thur";
        case 5: return long? "Friday":"Fri";
        case 6: return long? "Saturday":"Sat";
    }
    return "";
}
export function dayToNum(day){
    switch(day.toLowerCase().trim()){
        case "sunday": case "sun": case "su": return 0;
        case "monday": case "mon": case "m": return 1;
        case "tuesday": case "tue": case "tu": return 2;
        case "wednesday": case "wed": case "w": return 3;
        case "thursday": case "thur": case "thu": case "th": return 4;
        case "friday": case "fri": case "f": return 5;
        case "saturday": case "sat": case "sa": return 6;
    }
    return -1;
}
export function numToMonth(num, long=true){
    switch(num){
        case 1: return long? "January":"Jan";
        case 2: return long? "February":"Feb";
        case 3: return long? "March":"Mar";
        case 4: return long? "April":"Apr";
        case 5: return "May";
        case 6: return long? "June":"Jun";
        case 7: return long? "July":"Jul";
        case 8: return long? "August":"Aug";
        case 9: return long? "September":"Sept";
        case 10: return long? "October":"Oct";
        case 11: return long? "November":"Nov";
        case 12: return long? "December":"Dec";
    }
    return "";
}
export function monthToNum(month){
    switch(month.toLowerCase().trim()){
        case "jan": case "january": return 1;
        case "feb": case "february": return 2;
        case "mar": case "march": return 3;
        case "apr": case "april": return 4;
        case "may": return 5;
        case "jun": case "june": return 6;
        case "jul": case "july": return 7;
        case "aug": case "august": return 8;
        case "sep": case "september": return 9;
        case "oct": case "october": return 10;
        case "nov": case "november": return 11;
        case "dec": case "december": return 12;
    }
    return -1;
}

export function stateAbbr(str){
    switch(str.toLowerCase().trim()){
        case "british columbia": return "B. C.";
        case "alberta": return "Alta.";
        case "saskatchewan": return "Sask.";
        case "manitoba": return "Man.";
        case "ontario": return "Ont.";
        case "quebec": return "Que.";
        case "new brunswick": return "N. B.";
        case "newfoundland and labrador": case "newfoundland": return "Nfld.";
        case "prince edward island": return "P. E. I.";
        case "nova scotia": return "N. S.";
        case "northwest territories": case "north-west territories": case "north west territories": return "N. W. T.";
        case "yukon": return "Yuk.";
        case "nunavut": return "Nvt.";
        case "alabama":
            case "alabama": return "Ala.";
            case "alaska": return "Alaska";
            case "arizona": return "Ariz.";
            case "arkansas": return "Ark.";
            case "california": return "Calif.";
            case "colorado": return "Colo.";
            case "connecticut": return "Conn.";
            case "delaware": return "Del.";
            case "florida": return "Fla.";
            case "georgia": return "Ga.";
            case "hawaii": return "Hawaii";
            case "idaho": return "Idaho";
            case "illinois": return "Ill.";
            case "indiana": return "Ind.";
            case "iowa": return "Iowa";
            case "kansas": return "Kan.";
            case "kentucky": return "Ky.";
            case "louisiana": return "La.";
            case "maine": return "Maine";
            case "maryland": return "Md.";
            case "massachusetts": return "Mass.";
            case "michigan": return "Mich.";
            case "minnesota": return "Minn.";
            case "mississippi": return "Miss.";
            case "missouri": return "Mo.";
            case "montana": return "Mont.";
            case "nebraska": return "Neb.";
            case "nevada": return "Nev.";
            case "new hampshire": return "N. H.";
            case "new jersey": return "N. J.";
            case "new mexico": return "N. Mex.";
            case "new york": return "N. Y.";
            case "north carolina": return "N. C.";
            case "north dakota": return "N. Dak.";
            case "ohio": return "Ohio";
            case "oklahoma": return "Okla.";
            case "oregon": return "Ore.";
            case "pennsylvania": return "Penn.";
            case "rhode island": return "R. I.";
            case "south carolina": return "S. C.";
            case "south dakota": return "S. Dak.";
            case "tennessee": return "Tenn.";
            case "texas": return "Tex.";
            case "utah": return "Utah";
            case "vermont": return "Vt.";
            case "virginia": return "Va.";
            case "washington": return "Wash.";
            case "west virginia": return "W. Va.";
            case "wisconsin": return "Wis.";
            case "wyoming": return "Wyo";            
    }
    return str;
}

///////////
/* Maths */
///////////

export function randInt(min, max){ // returns [min, max] inclusive
    return (Math.floor(Math.random()*(max-min+1))) + min;
}

export function dist(point1, point2, L=2){ // L2 dist by default
    if(!isFinite(L)){return Math.max(Math.abs(point1.x-point2.x, point1.y-point2.y));}
    return Math.pow(Math.pow(point1.x-point2.x, L)+Math.pow(point1.y-point2.y,L), 1/L);
}

export function lineAngle(point_origin, point_dest){ // 0 = right, clockwise. goes (-pi, pi] 
    if(point_origin.y == point_dest.y){
        return point_origin.x <= point_dest.x ? 0 : Math.PI;
    }
    if(point_origin.x == point_dest.x){
        return (Math.PI/2) * point_origin.y>point_dest.y? 1: -1;
    }
    var theta = Math.atan(Math.abs(point_origin.x-point_dest.x)/Math.abs(point_origin.y-point_dest.y));
    if(point_origin.x > point_dest.x){theta = Math.PI - theta;}
    if(point_dest.y < point_origin.y){theta *= -1;}
    return theta; 
}

export function getSign(x){return x==0 ? 0 : (x>0 ? 1 : -1);}

////////////////////////////
/* Basic Image processing */
////////////////////////////
// Point: defined as {x, y}
// Shapes: array of points
// Set colour using fillStyle ONLY

export function pixel_translate(point, shiftX, shiftY){
    return {x: point.x + shiftX, y: point.y + shiftY};
}
export function pixel_translate_polar(point, angle, length){ // angle 0=right, go clockwise
    return{
        x: point.x + length*Math.cos(angle),
        y: point.y + length*Math.sin(angle)
    };
}

export function drawPixel(g, point){fillRect(g, Math.floor(point.x), Math.floor(point.y), 1, 1);}
export function drawDot(g, point_origin, diameter, L=2){ // L1 Manhattan, L2 Euclidian, L Inf 
    if(!isFinite(L)){
        fillRect(g, point_origin.x - Math.floor(diameter/2), point_origin.y - Math.floor(diameter/2), diameter, diameter);
    }else{
        for(var x=point_origin.x - Math.floor(diameter/2); x<point_origin.x - Math.floor(diameter/2) + diameter; x++){
            for(var y=point_origin.y - Math.floor(diameter/2); y<point_origin.y - Math.floor(diameter/2) + diameter; y++){
                if(Math.pow(Math.pow(Math.abs(x-point_origin.x),L) + Math.pow(Math.abs(y-point_origin.y),L), 1/L) < diameter/2){
                    drawPixel(g, {x: x, y: y});
                }
            }
        }
    }
}
export function drawImg(dest, src, point, width=null, height=null){
    dest.imageSmoothingEnabled = false;
    if(width==null||height==null){
        dest.drawImage(src, point.x, point.y);
    }else{
        dest.drawImage(src, point.x, point.y, width, height);
    }
}

export function getCroppedImg(src, point1, point2){
    var crop = document.createElement("canvas");
    var w = Math.abs(point1.x-point2.x);
    var h = Math.abs(point1.y-point2.y);
    crop.width = w; crop.height = h;
    crop.imageSmoothingEnabled = false;
    crop.getContext("2d").drawImage(src, point1.x, point1.y, w, h, 0, 0, w, h);
    return crop;
}

export function drawLine(g, point1, point2, width=1){ //bresenham
    if(width<=0){return;}
    if(point1.y == point2.y){
        fillRect(g, Math.min(point1.x, point2.x), point1.y - Math.floor(width/2), Math.abs(point1.x-point2.x)+1, width); 
        return;
    }
    if(point1.x == point2.x){
        fillRect(g, point1.x - Math.floor(width/2), Math.min(point1.y, point2.y), width, Math.abs(point1.y-point2.y)+1); 
        return;
    }
    if(Math.abs(point2.y-point1.y) < Math.abs(point2.x-point1.x)){
        if(point1.x>point2.x){
            drawLineLow(g, point2, point1, width);
        }else{
            drawLineLow(g, point1, point2, width);
        }
    }else{
        if(point1.y>point2.y){
            drawLineHigh(g, point2, point1, width);
        }else{
            drawLineHigh(g, point1, point2, width);
        }
    }
}
function drawLineLow(g, point1, point2, width=1){ //point2.x > point1.x, |m| < 1
    var dx = point2.x-point1.x;
    var dy = point2.y-point1.y;
    var yi = dy < 0 ? -1 : 1;
    dy = Math.abs(dy);
    var D = (2*dy) - dx;
    var y = point1.y;
    for(var x=point1.x; x<=point2.x; x++){
        if(width==1){drawPixel(g, {x:x, y:y});}else{drawDot(g, {x: x, y: y}, width, 2);}
        if(D>0){
            y += yi;
            D += 2*(dy-dx);
        }else{
            D += 2*dy;
        }
    }
}
function drawLineHigh(g, point1, point2, width=1){ //point2.y > point1.y, |m| >= 1
    var dx = point2.x-point1.x;
    var dy = point2.y-point1.y;
    var xi = dx < 0 ? -1 : 1;
    dx = Math.abs(dx);
    var D = (2*dx)-dy;
    var x = point1.x;
    for(var y=point1.y; y<=point2.y; y++){
        if(width==1){drawPixel(g, {x:x, y:y});}else{drawDot(g, {x: x, y: y}, width, 2);}
        if(D>0){
            x += xi;
            D += 2*(dx-dy);
        }else{
            D += 2*dx;
        }
    }
}

export function drawPolygon(g, points, width=1){ // use width=0 to fill
    function isEar(points, idx, clockwise){
        if(points.length<=3){return false;}
        // vertex needs to be convex & clipped triange does not contain other vertices 
        var prev_idx = idx==0 ? points.length-1 : idx-1;
        var next_idx = idx==points.length-1 ? 0 : idx+1;
        // check if inner angle <=180'
        var crossProduct = (points[idx].x-points[prev_idx].x)*(points[next_idx].y-points[idx].y)-(points[idx].y-points[prev_idx].y)*(points[next_idx].x-points[idx].x)
        if((clockwise&&(crossProduct>0))||(!clockwise&&(crossProduct<0))){return false;}
        // test any other vertices are in the triangle
        for(var i=0; i<points.length; i++){
            if(i==idx||i==prev_idx||i==next_idx){continue;}
            if(isInTriangle([points[prev_idx], points[idx], points[next_idx]], points[i])){
                return false;
            }
        }
        return true;
    }

    function fillTriangle(g, point0, point1, point2) {
        var points = [point0, point1, point2];
        var yMin = Math.ceil(Math.min(...points.map(p => p.y)));
        var yMax = Math.floor(Math.max(...points.map(p => p.y)));
        for(var y = yMin; y <= yMax; y++){
            var intersections = [];
            for(var i=0; i<3; i++){
                var a = points[i];
                var b = points[(i + 1) % 3];
                if(a.y !== b.y && y >= Math.min(a.y, b.y) && y < Math.max(a.y, b.y)){
                    var t = (y - a.y) / (b.y - a.y);
                    var x = a.x + t * (b.x - a.x);
                    intersections.push(x);
                }
            }
            if(intersections.length >= 2){
                var xMin = Math.ceil(Math.min(...intersections));
                var xMax = Math.floor(Math.max(...intersections));
                fillRect(g, xMin, y, xMax - xMin + 1, 1);
            }
        }
    }
    
    if(points.length<=1){return;}
    if(points.length==2){
        if(width==0){return;}
        drawLine(g, points[0], points[1], width);
        return;
    }
    if(width>0){ // no fill
        for(var i=0; i<points.length-1; i++){
            drawLine(g, points[i], points[i+1], width);
        }
        drawLine(g, points[0], points[points.length-1], width);
        return;
    }else{ //fill shape
        if(points.length==3){
            if((points[1].x-points[0].x)*(points[2].y-points[1].y)-(points[1].y-points[0].y)*(points[2].x-points[1].x) === 0){return;} // degenerate case: straight line
            // fill triangle
            fillTriangle(g, points[0], points[1], points[2]);
        }else{
            // find a ear, fill, then cut and call recursively
            var ear = -1;
            var shoelace = 0;
            for(var i=0; i<points.length-1; i++){
                shoelace += points[i].x*points[i+1].y - points[i].y*points[i+1].x
            }
            shoelace += points[points.length-1].x*points[0].y - points[points.length-1].y*points[0].x;
            for(var i=0; i<points.length; i++){
                if(isEar(points, i, shoelace<0)){
                    ear = i;
                    drawPolygon(g, [points[i==0?points.length-1:i-1], points[i], points[i==points.length-1?0:i+1]],0);
                    break;
                }
            }
            if(ear===-1){return;}
            drawPolygon(g, arr_remove(points, ear), 0); 
        }
    }
}
export function drawRect(g, x, y, w, h){
    x = Math.floor(x); y = Math.floor(y); w = Math.floor(w); h = Math.floor(h);
    fillRect(g, x, y, w, 1);
    fillRect(g, x, y, 1, h);
    fillRect(g, x+w, y, 1, h);
    fillRect(g, x, y+h, w, 1);
}

export function textSize(g, str){
    var x = g.measureText(str);
    return {width: x.width, height: x.actualBoundingBoxAscent+x.actualBoundingBoxDescent};
}
export function drawStr(g, str, x, y, horizontalAlign=0, verticalAlign=2){
    var textSize = g.measureText(str);
    x -= horizontalAlign/2 * textSize.width;
    y += (2-verticalAlign)/2 * (textSize.actualBoundingBoxAscent+textSize.actualBoundingBoxDescent);
    g.fillText(str, x, y);
}

export function clear(g){
    g.clearRect(0, 0, Math.ceil(g.canvas.width), Math.ceil(g.canvas.width));
}
export function fillRect(g, x, y, w, h){
    g.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}
export function setDrawingColour(g, colour){
    g.fillStyle = colour;
    g.strokeStyle = colour;
}
export function newImg(width, height){
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
export function imgGetGraphics(img){
    return img.getContext("2d");
}

export function isInTriangle(vertices, point){ // include points on the edge
    var centroid = {
        x: (vertices[0].x+vertices[1].x+vertices[2].x)/3,
        y: (vertices[0].y+vertices[1].y+vertices[2].y)/3
    };
    var m0 = (vertices[0].y - vertices[1].y) / (vertices[0].x - vertices[1].x);
    var m1 = (vertices[2].y - vertices[1].y) / (vertices[2].x - vertices[1].x);
    var m2 = (vertices[0].y - vertices[2].y) / (vertices[0].x - vertices[2].x);
    if(isNaN(m0)||isNaN(m1)||isNaN(m2)){return false;} // degen case: two or more points are the same point
    var b0 = vertices[0].y - m0*vertices[0].x;
    var b1 = vertices[1].y - m1*vertices[1].x;
    var b2 = vertices[2].y - m2*vertices[2].x; 
    if((vertices[1].x-vertices[0].x)*(vertices[2].y-vertices[1].y)-(vertices[1].y-vertices[0].y)*(vertices[2].x-vertices[1].x) === 0){
        // case: straight line
        if(!isFinite(m0)){return vertices[0].x==point.x && point.y<=Math.max(vertices[0].y, vertices[1].y, vertices[2].y) && point.y>=Math.min(vertices[0].y, vertices[1].y, vertices[2].y);}
        if(point.y==m0*point.x+b0){return true;}
        return false;
    }
    if(!isFinite(m0)){
        if(getSign(vertices[0].x-point.x) != getSign(vertices[0].x-centroid.x) && getSign(vertices[0].x-point.x)!=0){return false;}
    }else{
        if(getSign(m0*point.x+b0-point.y) != getSign(m0*centroid.x+b0-centroid.y) && getSign(m0*point.x+b0-point.y)!=0){return false;}
    }
    if(!isFinite(m1)){
        if(getSign(vertices[1].x-point.x) != getSign(vertices[1].x-centroid.x) && getSign(vertices[1].x-point.x)!=0){return false;}
    }else{
        if(getSign(m1*point.x+b1-point.y) != getSign(m1*centroid.x+b1-centroid.y) && getSign(m1*point.x+b1-point.y)!=0){return false;}
    }
    if(!isFinite(m2)){
        if(getSign(vertices[2].x-point.x) != getSign(vertices[2].x-centroid.x) && getSign(vertices[2].x-point.x)!=0){return false;}
    }else{
        if(getSign(m2*point.x+b2-point.y) != getSign(m2*centroid.x+b2-centroid.y) && getSign(m2*point.x+b2-point.y)!=0){return false;}
    }
    return true;
}
export function isInSquare(point_topleft, width, height, point){ // include points on the edge
    if(point_topleft.x > point.x){return false;}
    if(point_topleft.y > point.y){return false;}
    if(point_topleft.x + width < point.x){return false;}
    if(point_topleft.y + height < point.y){return false;}
    return true;
}

////////////////////////
/* Drawing more stuff */
////////////////////////

export function draw7segNum(numStr, colour='#000000', height=32, colourOff = "#00000000", spacing=height/16){ // anything that isnt a number will be printed as a space
    height = Math.max(height, 4);
    var thickness = height/8;
    var arr = [...numStr];
    var buffer = Math.max(2, Math.floor(thickness/8));
    var canvas = newImg(arr.length*(height/2+thickness*2+spacing+buffer*2)-spacing, height+thickness+buffer*2);
    var g = imgGetGraphics(canvas);
    function verticalStroke(dx, dy){
        var points = [{x:dx, y:dy+thickness/2}, {x:dx+thickness/2, y:dy}, {x:dx+thickness, y:dy+thickness/2}, {x: dx+thickness, y:dy+height/2-thickness/2}, {x: dx+thickness/2, y:dy+height/2}, {x: dx, y: dy+height/2-thickness/2}];
        drawPolygon(g, points, 0);
    }
    function horizontalStroke(dx, dy){
        var points = [{x:dx, y:dy+thickness/2}, {x:dx+thickness/2, y:dy}, {x:dx+height/2-thickness/2, y: dy}, {x:dx+height/2, y:dy+thickness/2}, {x:dx+height/2-thickness/2, y:dy+thickness}, {x:dx+thickness/2, y:dy+thickness}];
        drawPolygon(g, points, 0);
    }
    
    var x = 0;
    for(var i=0; i<arr.length; i++){
        var num = parseInt(arr[i]);
        if(isNaN(num)){num=10;}
        setDrawingColour(g, sevenSegLookupTable[num][0]==1 ? colour : colourOff);
        horizontalStroke(x+thickness +buffer, 0);
        setDrawingColour(g, sevenSegLookupTable[num][1]==1 ? colour : colourOff)
        verticalStroke(x+height/2+thickness/2 +buffer*2, thickness/2);
        setDrawingColour(g, sevenSegLookupTable[num][2]==1 ? colour : colourOff)
        verticalStroke(x+height/2+thickness/2 +buffer*2, height/2+thickness/2);
        setDrawingColour(g, sevenSegLookupTable[num][3]==1 ? colour : colourOff)
        horizontalStroke(x+thickness +buffer, height);
        setDrawingColour(g, sevenSegLookupTable[num][4]==1 ? colour : colourOff)
        verticalStroke(x+thickness/2, height/2+thickness/2);
        setDrawingColour(g, sevenSegLookupTable[num][5]==1 ? colour : colourOff)
        verticalStroke(x+thickness/2, thickness/2);
        setDrawingColour(g, sevenSegLookupTable[num][6]==1 ? colour : colourOff)
        horizontalStroke(x+thickness +buffer, height/2-thickness/2+thickness/2);
        setDrawingColour(g, sevenSegLookupTable[num][7]==1 ? colour : colourOff)
        x+=height/2+thickness*2+spacing+buffer*2;
    }
    return canvas;
}

////////////
/* Arrays */
////////////

export function arr_remove(arr, idx){
    if(idx>=arr.length||idx<0){return arr;}
    var newArr = Array.from({length: arr.length-1});
    for(var i=0; i<newArr.length; i++){
        newArr[i] = arr[i + (idx<=i?1:0)];
    }
    return newArr;
}

///////////////////
/* Lookup tables */
///////////////////

var sevenSegLookupTable = [
    [1,1,1,1,1,1,0],
    [0,1,1,0,0,0,0],
    [1,1,0,1,1,0,1],
    [1,1,1,1,0,0,1],
    [0,1,1,0,0,1,1],
    [1,0,1,1,0,1,1],
    [1,0,1,1,1,1,1],
    [1,1,1,0,0,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,0,1,1],
    [0,0,0,0,0,0,0]
];

export function xhr_fetch(link, callback, options = {}){
    var xhr = new XMLHttpRequest();
    xhr.open(options.method || "GET", link, true);
    var headers = options.headers || {};
    Object.keys(headers).forEach(function (key){
        xhr.setRequestHeader(key, headers[key]);
    });
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            if((xhr.status>=200&&xhr.status<300) || (xhr.status===0&& link.split("/")[0].toLowerCase()=="file:")){
                callback(null, xhr.responseText);
            }else{
                callback(new Error("XHR Fetch failed: "+xhr.status), null);
            }
        }
    }
    xhr.send(options.body ?? null);
}