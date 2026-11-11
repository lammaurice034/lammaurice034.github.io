import * as utils from "./utils.js";

document.addEventListener("DOMContentLoaded", function() {
    document.body.style.backgroundImage = "url('tiling/tiling" + utils.randInt(1,5) + ".png')";
});  