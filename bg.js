jQuery.fn.selectText = function(){
    var doc = document
        , element = this[0]
        , range, selection
    ;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

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
  $("[type='checkbox']").click(function(e) {
	e.stopPropagation();
  });
  /*$("[name='selectedorders[]']").click(function(e) {
	e.stopPropagation();
  });*/
  $("tr").click(function() {
var cb = $(this).children().first().children().first();
if (cb.is(":checked")) {
cb.prop('checked',false);
} else {
cb.prop('checked',true);
}
});
$("tr a").click(function(e) {
	e.stopPropagation();
})
if ($("[name=inv]").length > 0) {
$(".form").first().before('<p align="center"><input type="button" value="Mass Update Items" class="button" onclick="$(\'#massupdatebox1\').slideToggle()"> <input type="submit" name="inv" value="Invoice Selected Items" class="button"> <input type="submit" name="del" value="Delete Selected Items" class="button"></p>');
$(".form").first().before($('#massupdatebox').clone().attr('id','massupdatebox1'))
}

$('a').each(function(){
var href = $(this).prop('href')
var re = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
var result = re.exec(href)
if ( result != null) {
	$(this).click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$("#intellisearchval").val(result[0]);
		var intellisearchlength = $("#intellisearchval").val().length;
        if (intellisearchlength>2) {
        $.post("search.php", { intellisearch: "true", value: $("#intellisearchval").val() },
          function(data){
            $("#searchresults").html(data);
            $("#searchresults").slideDown("slow");
          });
        }
		$(this).selectText();
	});
}
});
//$.getJSON('http://api.ipinfodb.com/v3/ip-city/?key=1a32751137d22b76a436119186d0821ac81a9f894b2f4dcdc198ee3605ed8263&ip=91.121.201.125&format=json',function(data) {console.log(data) });
//$("body").css("background-color","black");
//console.log($("body"));
//alert('dammit');
});
