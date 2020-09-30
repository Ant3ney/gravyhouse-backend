var whitelist = require("../config/whitelist");
var orgin = "null";
var getCorsOrgin = (host) => {
    if(whitelist.includes(host)){
		orgin = host;
    }
    
    return orgin;
}

module.exports = getCorsOrgin;