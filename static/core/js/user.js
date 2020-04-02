(function($) {
  "use strict";

  function user_submit_form($form) {
    $.ajax({
      method:"POST",
      url:"",
      data : {
        'company': $('#lg_company').val(),
        'email': $('#lg_email').val(),
        'firstname': $('#lg_firstname').val(),
        'lastname': $('#lg_lastname').val(),
        'address': $('#lg_address').val(),
        'about': $('#lg_about').val(),
        'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()
      },
    }).done(function(data) {
      window.location.href = "/core/user.html";
    });
  }

  // Form Submission
  $("#user-form").submit(function(event) {
    
    event.preventDefault();
    user_submit_form($(this));
    return false;

  });
  
})(jQuery);
