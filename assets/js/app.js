$(document).ready(function() {
  init_check_hash();
  init_text_wait();
  init_active_nav();
  init_back_to_top();
  init_plugins();
  init_btn_open_content();
  init_nav_event();
  init_modal_optional();
  init_form_validation();
});

function init_modal_optional() {
  if ($('.ajax_link').length > 0) {
    $('.ajax_link').click(function(e) {
      var html = $(this).attr("href");
      $('#modal').html("").load(html);
      $('#modal').modal('show');
      return false;
    });
  }
}


function init_plugins() {
  $('[data-toggle=tooltip]').tooltip();
  $("#navigation").autofix_anything({
    onlyInContainer: true
  });
}

function init_back_to_top() {
  $('#backtotop').click(function() {
    $("html,body").animate({
      scrollTop: $('#wrapper').offset().top
    }, 600, function() {
    });
    return false;
  });
}

function init_btn_open_content() {
  $('#open-content').click(function() {
    $(this).toggleClass('disabled');

    if ($(this).hasClass('disabled')) {
      $('.img-arrow, #main-content').fadeIn();
      $('.navigation-list a[href="#about"]').tab('show')
      $("html,body").animate({
        scrollTop: $('#main-content').offset().top
      }, 600, function() {
      });
    } else {
      $("html,body").animate({
        scrollTop: $('#wrapper').offset().top
      }, 600, function() {
        $('.img-arrow, #main-content').fadeOut();
        $('#open-content').text('About Me');
      });
    }
  });
}

function init_nav_event() {
  $('.navigation-list a').click(function(e) {
    $(this).tab('show');
    $('#open-content').text($(this).text());
    $("html,body").animate({
      scrollTop: $('#main-content').offset().top
    }, 600, function() {
    });
    if ($(this).data('menu') == "contact") {
      init_gmap();
    }
    location.hash = $(this).attr('href');
    return false;
  });
}

function init_active_nav() {
  $('.navigation-list li').click(function() {
    $('.navigation-list li').removeClass('active');
    $(this).addClass('active');
  });
}

function init_text_wait() {
  $('#wait-page').fadeOut("slow", function() {
    $('#wrapper').fadeIn("slow");
  });
}

function init_check_hash() {
  if (window.location.hash) {
    var pages = ["#about", "#resume", "#portfolio", "#blog", "#contact"]
    if ($.inArray(window.location.hash, pages) > -1) {
      $('.navigation-list a[href="' + window.location.hash + '"]').tab('show');
      $('#open-content').text($('.navigation-list a[href="' + window.location.hash + '"]').text()).addClass('disabled');
      $('.img-arrow, #main-content').fadeIn(function() {
        $("html,body").animate({
          scrollTop: $('#main-content').offset().top
        }, 600, function() {
        });
      });
      if (window.location.hash == "#contact") {
        init_gmap();
      }
    }
  }
}


function init_gmap() {
  $('.map-area #map').remove();
  $('.map-area').append('<div id="map"></div>');
  setTimeout(function() {
    $('#map').gmap3({
      action: 'init',
      marker: {
        address: "Vancouver, BC",
        options: {
          icon: new google.maps.MarkerImage("./assets/images/marker.png")
        }
      },
      map: {
        options: {
          zoom: 10,
          scrollwheel: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          draggable: false
        }
      }
    });
  }, 500);
}

$(window).load(function() {
  $('.imgWrapper img').animate({opacity: '1.0'}, 1000, function() {
    $(this).css('filter', 'none');
  });
});

function init_form_validation(){
  $('form button').click(function(e){
    //alert($('#NameForm').val());
    e.preventDefault();
    form_validation();
  });


}

function form_validation(){
  var name = $('#NameForm').val(),
      email = $('#EmailForm').val(),
      msg = $('#MessageForm').val();
  if(name =='' || email =='' || msg ==''){
    var ahtml = '<div class="alert alert-danger"> <strong>Warning!</strong> Please at least give me your <b>name, email and message</b> </div>';
    $('form').append(ahtml);
    $('.alert-danger').fadeOut(2000,function(){
      $('.alert-danger').remove();
      $('form button').removeClass("disabled");

    });
    $('form button').addClass("disabled");

  }
  else{
      email_ajax();

}

function email_ajax() {
  var data = {
    name: $("#NameForm").val(),
    company : $("#CompanyForm").val(),
    email : $("#EmailForm").val(),
    phone : $("#PhoneForm").val(),
    msg : $("#MessageForm").val()
};

  $.ajax({
    url: "email.php",
    type: "post",
    //dataType:"json",
    data: data,
    error: function (jqXHR, textStatus, errorThrown) {

      alert("fail!");
      console.log(textStatus, errorThrown);
    },
    success: function (result) {
      console.log(result);
      if (result == "success") {
        var bhtml = '<div class="alert alert-success" role="alert"><strong>THANK YOU!</strong> I will get back to you ASAP</div>';
        $('form').append(bhtml);
        $('.alert-success').fadeOut(10000, function () {
          $('.alert-success').remove();
          $('form button').removeClass("disabled");

        });
        $('form button').addClass("disabled");
      }
      else if(result == "fail!") alert("holy cow! my website has gone wrong!");
      else{
        alert ("no idea what's going on here");
      }

      //return result;
    }
  })
}}

function printPage(){
  w=window.open('assets/resume.pdf');
}