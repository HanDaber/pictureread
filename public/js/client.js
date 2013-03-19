// Initialize:
Handlebars.registerHelper("each_i", function ( array, fn ) {

    var buffer = "";
    
    for (var i = 0, j = array.length; i < j; i++) {
    
        var item = array[i];
 
        // stick an index property onto the item, starting with 1
        item.index = i+1;
 
        // show the inside of the block
        buffer += fn.fn(item);
    }
 
    // return the finished buffer
    return buffer;
 
});

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
    	alert.addClass('alert alert-error').text('Invalid email...').fadeIn();
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

$.get('/stories/json', function ( data ) {

    console.log('got dayta ' + data)
    
    var fragment = $('<div>'),
        story_data = {
            stories: data
        };

    var source = $('#story-template').html() || '<script></script>';

    var template = Handlebars.compile( source );

    var html = template( story_data );

    $('#stories').append( html ).find('.loading').remove();
});

$('#save_story').on('click', function ( event ) {

    event.preventDefault();

    var title = $("input[name=title]").val(),
        frame_1 = $('.frame_1'),
        frame_2 = $('.frame_2'),
        frame_3 = $('.frame_3'),
        frames = [];

    var f1 = { 
        // text: frame_1.find("textarea").val() || '',
        image: frame_1.find("input.image").val() || '',
        thumbnail: frame_1.find("input.thumbnail").val() || ''
    };

    frames.push(f1);

    var f2 = { 
        // text: frame_2.find("textarea").val() || '',
        image: frame_2.find("input.image").val() || '',
        thumbnail: frame_2.find("input.thumbnail").val() || ''
    };

    frames.push(f2);

    var f3 = { 
        // text: frame_3.find("textarea").val() || '',
        image: frame_3.find("input.image").val() || '',
        thumbnail: frame_3.find("input.thumbnail").val() || ''
    };

    frames.push(f3);

    $.post('/stories', { title: title, frames: frames }, function (data, textStatus, jqXHR) {
        
        console.log(data);
        
        if( data ) {

            // $.post('/stories/' + data._id, );
        
            $('#stories').append('' + data);
        }
    });

    $('#story_modal').modal('hide');
});

$('.destroy_story').on('click', function ( event ) {

    event.preventDefault();
});



var frame_links_resize = $('.frames').find('a'),
    story_image_resize = $('#story');

// WINDOW.RESIZE
$(window).resize(function () {

    element_height( frame_links_resize );
    
    // element_height( $('.file_picker') );

    story_background_image( story_image_resize );

});

element_height( frame_links_resize );

story_background_image( story_image_resize );

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

function story_background_image ( s ) {

// can just put backgroung image inline in html
    var image = s.find('input[name=img]').val(),
        frame = s.find('#frame'),
        p, w;

    frame.css('background', 'url(\'' + image + '\') no-repeat center');

    if( typeof( frame.position() ) !== 'undefined' ) {

        p = frame.position().top;
        w = $(window).height();

        frame.height(function () {
            return w - p;
        });
    }
}



function disable_drag ( event ) {
    console.log('you should disable dragondrops')
}

function files_saved ( event ) {

    var target = event.target.name;

    var target_element = $('.' + target + ''),
        file = event.fpfile,
        thumbnail = $('<img>'),
        text = $('<textarea>'),
        image_source = $('<input>'),
        thumb_source = $('<input>'),
        base_url = 'http://pictureread.s3.amazonaws.com/';

    target_element.html('<b>Please wait... </b><img src="/img/loader.gif" />');

    text.attr('name', target + '_text')
        .attr('placeholder', 'Frame Text');

    image_source.addClass('image')
        .attr('type', 'hidden')
        .attr('value', base_url + file.key );

    target_element.addClass('disabled');

    filepicker.convert( file, 
                        { width: 200, height: 200, fit: 'crop' }, 
                        {location: 'S3'},
        
        function( new_file ) {

            console.log('thumbnail key: ' + new_file.key );

            thumb_source.addClass('thumbnail')
                .attr('type', 'hidden')
                .attr('value', base_url + new_file.key );

            thumbnail.attr('src', base_url + new_file.key )
                .attr('width', '100%');

            target_element.html('');

            target_element.append(thumbnail);

            // target_element.append(text);
            
            target_element.append(thumb_source);
            
            target_element.append(image_source);
        }
    );
}





