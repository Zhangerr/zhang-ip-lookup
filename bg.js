jQuery(document).ready(function($) {
/* jQuery selector to match exact text inside an element
*  :containsExact()     - case insensitive
*  :containsExactCase() - case sensitive
*  :containsRegex()     - set by user ( use: $(el).find(':containsRegex(/(red|blue|yellow)/gi)') )
*/
$.extend($.expr[':'],{
  containsExact: function(a,i,m){
    return $.trim(a.innerHTML.toLowerCase()) === m[3].toLowerCase();
  },
  containsExactCase: function(a,i,m){
    return $.trim(a.innerHTML) === m[3];
  },
  containsRegex: function(a,i,m){
    var regreg =  /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/,
    reg = regreg.exec(m[3]);
    return reg ? RegExp(reg[1], reg[2]).test($.trim(a.innerHTML)) : false;
  }
});
  // Code using $ as usual goes here.
$.getJSON('http://api.ipinfodb.com/v3/ip-city/?key=1a32751137d22b76a436119186d0821ac81a9f894b2f4dcdc198ee3605ed8263&ip=91.121.201.125&format=json',function(data) {console.log(data) });
$("body").css("background-color","black");
//console.log($("body"));
//alert('dammit');
});