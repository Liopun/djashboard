(function($) {
  "use strict";

// Options for Message
//----------------------------------------------
var options = {
  'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
  'btn-success': '<i class="fa fa-check"></i>',
  'btn-error': '<i class="fa fa-remove"></i>',
  'msg-success': 'All Good! Redirecting...',
  'msg-error': 'Wrong login credentials!',
  'useAJAX': true,
};

// Login Form
//----------------------------------------------
// Validation
$("#login-form").validate({
  rules: {
    lg_username: "required",
    lg_password: "required",
  },
  errorClass: "form-invalid"
});

// Form Submission
$("#login-form").submit(function(event) {
  remove_loading($(this));
  
  if(options['useAJAX'] == true)
  {
    // Dummy AJAX request (Replace this with your AJAX code)
    // If you don't want to use AJAX, remove this
    event.preventDefault();
    login_submit_form($(this));
  
    // Cancel the normal submission.
    // If you don't want to use AJAX, remove this
    return false;
  }
});

// Register Form
//----------------------------------------------
// Validation
$("#register-form").validate({
  rules: {
    reg_username: "required",
    reg_password: {
      required: true,
      minlength: 5
    },
     reg_password_confirm: {
      required: true,
      minlength: 5,
      equalTo: "#register-form [name=reg_password]"
    },
    reg_email: {
      required: true,
      email: true
    },
    reg_agree: "required",
  },
  errorClass: "form-invalid",
  errorPlacement: function( label, element ) {
    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
      element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
    }
    else {
      label.insertAfter( element ); // standard behaviour
    }
  }
});

// Form Submission
$("#register-form").submit(function() {
  remove_loading($(this));
  
  if(options['useAJAX'] == true)
  {
    // Dummy AJAX request (Replace this with your AJAX code)
    // If you don't want to use AJAX, remove this
    event.preventDefault();
    register_submit_form($(this));
  
    // Cancel the normal submission.
    // If you don't want to use AJAX, remove this
    return false;
  }
});

// Forgot Password Form
//----------------------------------------------
// Validation
$("#forgot-password-form").validate({
  rules: {
    fp_email: "required",
  },
  errorClass: "form-invalid"
});

// Form Submission
$("#forgot-password-form").submit(function() {
  remove_loading($(this));
  
  if(options['useAJAX'] == true)
  {
    // Dummy AJAX request (Replace this with your AJAX code)
    // If you don't want to use AJAX, remove this
    dummy_submit_form($(this));
  
    // Cancel the normal submission.
    // If you don't want to use AJAX, remove this
    return false;
  }
});

// Loading
//----------------------------------------------
function remove_loading($form)
{
  $form.find('[type=submit]').removeClass('error success');
  $form.find('.login-form-main-message').removeClass('show error success').html('');
}

function form_loading($form)
{
  $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
}

function form_success($form, $msg)
{
  $form.find('[type=submit]').addClass('success').html(options['btn-success']);
  $form.find('.login-form-main-message').addClass('show success').html($msg);
  
  console.warn("GOT HEREEEEEE")
}

function form_failed($form, $msg)
{
  $form.find('[type=submit]').addClass('error').html(options['btn-error']);
  $form.find('.login-form-main-message').addClass('show error').html($msg);
}

// Dummy Submit Form (Remove this)
//----------------------------------------------
// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
function register_submit_form($form) {
  if($form.valid()) {
    form_loading($form);

    $.ajax({
      method:"POST",
      url:"",
      data : {
        'reg_username': $('#reg_username').val(),
        'reg_password': $('#reg_password').val(),
        'reg_password_confirm': $('#reg_password_confirm').val(),
        'reg_email': $('#reg_email').val(),
        'reg_firstname': $('#reg_firstname').val(),
        'reg_lastname': $('#reg_lastname').val(),
        'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()
      },
    }).done(function(data) {
      if (data.output) {
        form_success($form, data.message);
        window.location.href = "/accounts/login";
      } else {
        form_failed($form, data.message);
      }
    });
  }
}
function login_submit_form($form)
{
  if($form.valid())
  {
    form_loading($form);

    $.ajax({
      method:"POST",
      url:"",
      data : {
        'lg_username': $('#lg_username').val(),
        'lg_password': $('#lg_password').val(),
        'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()
      },
      // method: "POST",
      // url: "",
      // headers: {'X-CSRFToken': $("input[name=csrfmiddlewaretoken]").val()},
      // contentType: "application/json",
      // dataType: 'json',
      // data: {
      //   lg_username: $('#lg_username').val(),
      //   lg_password: $('#lg_password').val(),
      // }
    }).done(function(data) {
      if (data.output) {
        form_success($form, data.message);
        window.location.href = "/dashboard";
      } else {
        form_failed($form, data.message);
      }
    });
    // return false;
  }
}

})(jQuery);
