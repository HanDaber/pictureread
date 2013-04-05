var info_form = $('#info_form'),
    submit_info = info_form.find('a'),
    email_pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/),
    base_url = 'http://pictureread.s3.amazonaws.com/',
    frame_links_resize = $('.frames').find('a'),
    story_image_resize = $('#story'),
    permission = $('input[name=permission]').val(),
    current_frame = $('input[name=frame_id]').val(),
    current_story = $('input[name=story_id]').val(),
    frameimage = $('#frame_image');




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

    console.log('got stories ')
    console.dir(data)
    
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
        image: frame_1.find("input.image").val() || '',
        thumbnail: frame_1.find("input.thumbnail").val() || ''
    };

    frames.push(f1);

    var f2 = { 
        image: frame_2.find("input.image").val() || '',
        thumbnail: frame_2.find("input.thumbnail").val() || ''
    };

    frames.push(f2);

    var f3 = { 
        image: frame_3.find("input.image").val() || '',
        thumbnail: frame_3.find("input.thumbnail").val() || ''
    };

    frames.push(f3);

    $.post('/stories', { title: title, frames: frames }, function ( data, textStatus, jqXHR ) {
        
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


// Frame:
$.get('/stories/' + current_story + '/frames/' + current_frame, function ( resp ) {

    var source = $('#object-template').html() || '<script></script>';

    var template = Handlebars.compile( source );

    var html = template( resp );

    frameimage.append( html );


    $('.interaction-popover').click(function(ev){
    
        ev.preventDefault();
        
        // ev.stopPropagation();

        // $('.interaction-popover').filter(this).find('i').addClass('active')

        $('.interaction-popover').not(this).popover('hide');

    }).popover({

        content: function () {

            var type = $(this).data('type');

            console.dir($(this).data('type'));

            if( type === 'blurb' ) return $(this).data('contents');
            
            else if( type === 'animation' ) return '<img src="' + $(this).data('contents') + '" width="200px" height="200px" />';
            
            else if( type === 'audio' ) return '<audio controls autobuffer preload autoplay><source src="' + $(this).data('contents') + '" type="audio/mpeg"></audio>';
            
            else if( type === 'caption' ) return '<em>' + $(this).data('contents') + '</em><b>______</b>';

            else return 'hmm...';
        },

        html: true,

        // trigger: 'manual',

        placement: function ( tip, elem ) {

            console.log( elem.parentElement )

            return elem.parentElement.offsetTop < 100 ? 'bottom' : 'top';
        }
    });

    if( permission ) {

        $('.remove-object').removeClass('hide').on('dblclick', function ( ev ) {

            var id = $(this).attr('id');

            $.post('/stories/' + current_story + '/' + current_frame + '/objects/remove/', { id: id }, function ( data, status, xhr ) {

                if( data ) {

                    console.log('remove object data ' + data)

                    $(ev.target).parent('.add_object').remove();
                }
            });
        });
    }


    $('.loading').remove();
});


frameimage.on('click', 'img', function(e) {

    $('.interaction-popover').popover('hide');

});

$('.inactive').fadeTo('fast', 0.3);


$('.expand').on('click', 'i', function ( event ) {

    $('.add_object').toggleClass('hidden');

    $(this).toggleClass('active');
});




$('.edit_form').on('submit', function ( event ) {

    event.preventDefault();

    console.log('target:  ' + event.target)

    var val = $(event.target).find('input[name=text]').val(),
        s_id = current_story,
        f_id = current_frame;

    $.post('/stories/frames/' + s_id, { text: val, f_id: f_id }, function ( data, textStatus, jqXHR ) {

        console.log(data)
    });
});



// WINDOW.RESIZE
$(window).resize(function () {

    element_height( frame_links_resize );
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
        thumb_source = $('<input>');

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


    
function toggle( elems, classname ) {

    for(var i = 0, e = elems.length; i < e; i++) {

        elems[i].toggleClass( classname );
    }
}

$('#frame_image img').on('dblclick', function ( event ) {

    var x_frac = ((event.offsetX - 0) / $(event.target).width() * 100),
        y_frac = ((event.offsetY - 10) / $(event.target).height() * 100),
        new_obj;

    if( permission ) {

        new_obj = { icon: '', text: 'click to edit', position: [ x_frac, y_frac ] };

        // console.dir(new_obj)

        // append_object( new_obj );

        make_editable( new_obj );
    }

}).on('hover', function ( event ) {

    if( permission ) {

        $(event.target).css('cursor', 'crosshair');
    }
});





function append_object( obj ) {
    frameimage.append('<div class="add_object temp" style="left:' + obj.position[0] + '%; top:' + obj.position[1] + '%;"><i class="icon-arrow-left"></i><span class="txt">' + obj.title + '</span><a href=""><i class="icon-cancel"></i></a></div>');
}

function make_editable( obj ) {

    $('#object-modal').find('.modal-body center').html(function () {

        var str = '<form id="new-object-form" action="/stories/' + current_story + '/' + current_frame + '/' + obj.position[0] + '/' + obj.position[1] + '" method="post">';

        str += '<input type="text" placeholder="object title" name="title" /><br />';

        str += '<select name="type">';

        str += '<option disabled selected="selected">type of object</option><option>blurb</option><option>animation</option><option>audio</option>';

        // str += '<option>caption</option>';
        
        str += '</select><br />';
        
        str += '<textarea rows="3" placeholder="object text" name="media" class="hide" /><br />';
        
        str += '<div id="object-dragdrop" class="well hide">Drop to upload</div>';

        str += '<input type="submit" value="save" class="btn btn-primary disabled" id="object-submit" />';
        
        str += '</form>';

        return str;
    });

    var dragdrop = $('#object-dragdrop'),
        select = $('select[name=type]'),
        text = $('textarea[name=media]');


    select.on('change', function ( ev ) {

        if( $(this).val() === 'blurb' || $(this).val() === 'caption' ) {

            dragdrop.addClass('hide');
            text.removeClass('hide');
        } else {

            dragdrop.removeClass('hide');
            text.addClass('hide');
        }

        $('#object-submit').removeClass('disabled');
    });

    $('form#new-object-form').on('submit', function ( ev ) {

        ev.preventDefault();

        var data = {
            title: $(this).find('input[name=title]').val(),
            type: $(this).find('select[name=type]').val(),
            media: $(this).find('[name=media]').val()
        }

        $(this)[0].reset();

        $('#object-modal').modal('hide');

        $.post('/stories/' + current_story + '/' + current_frame + '/' + obj.position[0] + '/' + obj.position[1], data, function ( resp, status, xhr ) {

            if( resp ) {

                console.dir(resp)
                append_object( resp );    
            }
            
            $('.add_object .temp').remove(); // NO WORK?!?!?!
        });
    });

    filepicker.setKey('ADu2duDHmRqOkJyuusshfz');

    filepicker.makeDropPane(dragdrop, {
        multiple: false,
        dragEnter: function() {
            dragdrop.html("Drop to upload").css({
                'backgroundColor': "#E0E0E0",
                'border': "1px solid #000"
            });
        },
        dragLeave: function() {
            dragdrop.html("Drop files here").css({
                'backgroundColor': "#F6F6F6",
                'border': "1px dashed #666"
            });
        },
        onSuccess: function(fpfiles) {
            dragdrop.text("Done");

            $('#object-modal').find('.modal-body form').prepend('<input type="hidden" value="' + base_url + fpfiles[0].key + '" name="media">');
        },
        onError: function(type, message) {
            console.log('('+type+') '+ message);
        },
        onProgress: function(percentage) {
            dragdrop.text("Uploading ("+percentage+"%)");
        }
    });

    $('#object-modal').modal();
}


function story_background_image ( s ) {

    var image = s.find('input[name=img]').val(),
        frame = s.find('#frame_image'),
        p, w;

        console.log(frame.width())

    frame.append('<img src="' + image + '">');

}
