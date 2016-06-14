var Xorc = function(salt){
    var randomMax = 100,
        randomMin = -100;
    
    var saltInt = parseInt(salt);
    if ( salt ) {
        if ( !saltInt ) {
            throw new Error('it is not a Number');
        }
        this.salt = saltInt;
    }
    else {
        this.salt = Math.round(Math.random()*(randomMax-randomMin)+randomMin);
    }
}

Xorc.prototype.encrypt = function(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
        result += String.fromCharCode( this.salt ^ str.charCodeAt(i) );
        
    }
    return result;
}

Xorc.prototype.decrypt = function(hash) {
    var result = '';
    for (var i=0; i<hash.length; i++) {
        result += String.fromCharCode( this.salt ^ hash.charCodeAt(i) );
    }
    return result;
}

var x = new Xorc();
var domains = ["sohu.com", "mrwii.com", "localhost"];
var domain = "";
var xe = new Array();
var xd = new Array();

for (var i = 0; i < domains.length; i++)
{
  host = domains[i];
  domain += host;
  if (i < domains.length-1)
    domain += " - ";
  var e = x.encrypt(host);
  var d = x.decrypt(e);
  //console.log("encrypt",e);
  //console.log("decrypt",d);
  xe.push(e);
  xd.push(d);
}
console.log("salt",x.salt);
console.log("xe",xe);
console.log("xd",xd);

//input = btoa(domains[i]);

$("#domain").text(domain);
$("#encrypt").text("["+xe.join(", ")+"]");
$("#decrypt").text("["+xd.join(", ")+"]");

//window.location.hostname