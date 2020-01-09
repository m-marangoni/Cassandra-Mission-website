
//original code credit: Bill Dortch. below code modified and adapted from http://www.javascriptkit.com/script/script2/visitorinfo.shtml

function getCookieVal (offset) {
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie (name) {
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen) {
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return getCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) 
break; 
}
return null;
}
function SetCookie (name, value) {
var argv = SetCookie.arguments;
var argc = SetCookie.arguments.length;
var expires = (2 < argc) ? argv[2] : null;
var path = (3 < argc) ? argv[3] : null;
var domain = (4 < argc) ? argv[4] : null;
var secure = (5 < argc) ? argv[5] : false;
document.cookie = name + "=" + escape (value) +
((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
((path == null) ? "" : ("; path=" + path)) +
((domain == null) ? "" : ("; domain=" + domain)) +
((secure == true) ? "; secure" : "");
}
function DisplayInfo() {
var expdate = new Date();
var visit;
expdate.setTime(expdate.getTime() +  (24 * 60 * 60 * 1000 * 365)); 
if(!(visit = GetCookie("visit"))) 
visit = 0;
visit++;
SetCookie("visit", visit, expdate, "/index.html", null, false);
var message;

if(visit == 1) 
console.log =" Hello, visitor.";
if(visit >= 2)
window.location.replace('/nothing.html'); 
return false;

// message="  nothing to see here";
//   alert("\n"+"Your browser has visited this page               \n"
//             +"                              "+visit+"\n"
//             +"                          time(s)."+"\n"+"\n"
//             +message);
}
function ResetCounts() {
var expdate = new Date();
expdate.setTime(expdate.getTime() +  (24 * 60 * 60 * 1000 * 365)); 
visit = 0;
SetCookie("visit", visit, expdate , "/index.html", null, false);
history.go(0);
}

window.onload=DisplayInfo

