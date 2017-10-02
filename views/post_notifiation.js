var i = 0;

function notification(message) {
    // are there any active notifications?
    var active = $('body').find('#noteWrap').length;
    //alert(active);
    if (active < 1) {
      i = 0;
    }
    // append alert
    $('body').append("<div class='msg-"+ (++i) +"' id=\"noteWrap\"><div class=\"noteContent\"><p>"+message+"</p></div></div>");

    if (i >= 1) {var r = i * 8-8;}
    $('.msg-'+i).animate({top: 0}, "slow");
    $('.msg-'+i).fadeOut(4000, function(){
      $(this).remove();
    });
    $('.msg-'+i).css("margin-top",(r)+"rem");

    if (i > 4) {
      i = 0;
    }

  }
