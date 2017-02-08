$(function () {
    //hide thank you
    $('.survey__thank-you').hide();

    // I only have one form on the page but you can be more specific if need be.
    var $form = $('form');

    if ( $form.length > 0 ) {
        $('form input[type="submit"]').on('click', function ( event ) {
            if ( event ) event.preventDefault();
            // validate_input() is a validation function I wrote, you'll have to substitute this with your own.
            if ( validate_input() ) { register($form); }
        });
    }
});

function validate_input() {
	if($('#name').val() === '' || $('#email').val() === ''){
		alert('Please fill all mandatory fields (e-mail and Name) correctly ');
		return false;
	}
	if(!isValidEmailAddress($('#email').val())){
		alert('Sorry, e-mail is not valid :)');
		return false;
	}
	return true;
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            if (data.result != "success") {
                $('.survey__woops').hide();
                $('.survey__thank-you').hide();
                $('form').hide();
                // Something went wrong, do something to notify the user. maybe alert(data.msg);
            } else {
                $('.survey__thank-you').show();
                $('form').hide();
                // It worked, carry on...
            }
        }
    });
}