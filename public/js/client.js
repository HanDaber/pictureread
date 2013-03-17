// Splash Page:

var info_form = $('#info_form'),
	submit_info = info_form.find('a');

var email_pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/);

info_form.submit(function ( ev ) {

    var $this = $(this);

    var input = $this.find("input[name='more_info']"),
    	alert = $this.find('.flash');

    if ( email_pattern.test( input.val() ) ) {
    	input.val('');

    	alert.addClass('alert alert-success').text('Thank you!').fadeIn();
    } else {
    	alert.addClass('alert alert-error').text('Invalid email, try again...').fadeIn();
    }

    setTimeout(function () {
    	alert.fadeOut().removeClass('alert alert-error alert-success');
    }, 2500);

    return false;
});

submit_info.on('click', function ( ev ) {

	ev.preventDefault();

	info_form.submit();
});

$('.banner-image').find('img').addClass('in');

// Stories:

$(window).resize(function () {

    element_height( $('.frames').find('a') );

});

element_height( $('.frames').find('a') );

function element_height ( elem ) {

    var new_height,
        frames = elem,
        width = frames.width(),
        max_width = 200;

    if( $(window).width() >= 481 ) {

        new_height = width < max_width ? width : max_width;

    } else {

        new_height = "10em";
    }

    frames.height(function () {
        return new_height;
    });
}

$('#save_story').on('click', function ( event ) {

    event.preventDefault();

    var title = $("#story_modal").find("input[name=title]").val(),
        body = $("#story_modal").find("textarea[name=body]").val(),
        user = $("#story_modal").find("input[name=user]").val();

    console.log(title, body)

    $.post('/stories', { title: title, body: body, editor: user }, function (data, textStatus, jqXHR) {
        console.log(data);
        if( data ) {
            $('#stories').append('' + data);
        }
    });

    $('#story_modal').modal('hide');
});

$('.destroy_story').on('click', function ( event ) {

    event.preventDefault();
});

function files_saved ( event ) {
    for(var i=0; i<event.fpfiles.length; i++) {
        console.dir('http://pictureread.s3.amazonaws.com/'+event.fpfiles[i].key+'\n');
    }
}