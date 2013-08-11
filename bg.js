//mass update button key shortcut, shift click checkbox selection
//scroll to bottom function
/*jQuery extension for selecting text*/
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
function iSearch(result) {
    //insert the text into the search box
		$("#intellisearchval").val(result);
    //proc the search box
		var intellisearchlength = $("#intellisearchval").val().length;
        if (intellisearchlength>2) {
        $.post("search.php", { intellisearch: "true", value: $("#intellisearchval").val() },
          function(data){
            $("#searchresults").html(data);
            $("#searchresults").slideDown("slow");
          });
        }
    //select the text for easy copying
		$(this).selectText();
}

jQuery(document).ready(function($) {
  //If the user actually does use the checkbox, don't activate the "check/uncheck" event
  if(window.location.host === 'billing.buycpanel.com') {
  window.onkeyup=function(e) {
  
  if($("*:focus").length === 0 ) {
	if(e.keyCode === 65) {
		$("[value='Accept Order']").trigger('click');
	} else 	if(e.keyCode === 67) {
		$("[value='Cancel Order']").trigger('click');
	} else 	if(e.keyCode === 68) {
		$("[value='Delete Order']").trigger('click');
		$("[value='Delete Selected Items']").trigger('click');
	} else 	if(e.keyCode === 73) {
		$("[value='Invoice Selected Items']").trigger('click');
	} else 	if(e.keyCode === 65) {
		$("[value='Accept Order']").trigger('click');
	} else if(e.keyCode === 81) {
		$("html, body").animate({ scrollTop: 0 }, "fast");
	} else if (e.keyCode === 87) {
		$("html, body").animate({ scrollTop: $(document).height() }, "fast");
	}
  }
  }
  $("[type='checkbox']").click(function(e) {
	   e.stopPropagation();
  });  
  $("<style>table.datatable tr:hover td {background-color: rgb(200,200,200); !important}</style>").appendTo('head');
  //bind onto each table row to do the automatic checking/unchecking
  //TODO: http://24ways.org/2011/your-jquery-now-with-less-suck/ could use event delegation as mentioned in this article
  $("table").on('click', 'tr',function() {
    var cb = $(this).children().first().children().first();
    if (cb.is(":checked")) {
    cb.prop('checked',false);
    } else {
    cb.prop('checked',true);
    }
    });
	
  //don't do the check/uncheck if the user specifically clicks a link
  $("table").on('click', "tr a", function(e) {
  	e.stopPropagation();
  });
  //insert the clone of the delete and invoice
  if ($("[name=inv]").length > 0) {
    $(".form").first().before('<p align="center"> <input type="submit" name="inv" value="Invoice Selected Items" class="button"> <input type="submit" name="del" value="Delete Selected Items" class="button"></p>');
  }
//magic for the automatic selection and insertion into the intelligence search
//TODO: limit the scope of the .each with a prior selector to the table
$('a').each(function(){
var href = $(this).prop('href')
//regex for IP's (any are allowed, even bogus ones) http://www.regular-expressions.info/examples.html
var re = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
//check if the HREF of the anchor is a valid IP
var result = re.exec(href)
if ( result != null) {
	$(this).click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		iSearch.call(this, result[0]);
	});
}
});
} else {
document.body.innerHTML += '<script>window.confirm = function(){return true;}</script>';
}
});
