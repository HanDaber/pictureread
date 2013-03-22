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

    $.post('/stories', { title: title, frames: frames }, function ( data, textStatus, jqXHR ) {
        
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


// Frame:
var frame = {
    objects: [
        { icon: '', text: 'Hello, I am an object!', position: { x: 1, y: 10 } },
        { icon: '', text: 'Hello, I am a cool thing!', position: { x: 25, y: 33 } }
    ]
};

var objs = frame.objects,
    frameimage = $('#frame_image');

for( var i = 0, o = objs.length; i < o; i++ ) {

    append_object( objs[i] );
}



function append_object( obj ) {
    frameimage.append('<div class="add_object" style="top:' + obj.position.y + '%; left:' + obj.position.x + '%;"><i class="icon-play"></i><span>' + obj.text + '</span></div>');
}






$('#edit_frame')
    .on('mouseenter', function ( event ) {

        toggle( [$('.edit_form'), $('.edit_hover')], 'hide' );
    })
    .on('mouseleave', function ( event ) {

        var text_input = $('input[name=text]');

        if( text_input.is(':focus') ) {

            text_input.on('focusout', function () {

                toggle( [$('.edit_form'), $('.edit_hover')], 'hide' );
            });
        } else {

            toggle( [$('.edit_form'), $('.edit_hover')], 'hide' );
        }
    })
    .find('a.edit')
    .on('click', function ( event ) {

        event.preventDefault();

        var text_input = $('input[name=text]');

        if( text_input.is(':focus') ) {

            text_input.on('focusout', function () {

                toggle( [$('.edit_form'), $('.edit_hover')], 'hide' );
            });
        } else {

            toggle( [$('.edit_form'), $('.edit_hover')], 'hide' );
        }
    });
function toggle( elems, classname ) {

    for(var i = 0, e = elems.length; i < e; i++) {

        elems[i].toggleClass( classname );
    }
}

$('.edit_form').on('submit', function ( event ) {

    event.preventDefault();

    console.log('target:  ' + event.target)

    var val = $(event.target).find('input[name=text]').val(),
        id = $(event.target).find('input[name=id]').val();

    $.post('/stories/frames/' + id, { text: val }, function ( data, textStatus, jqXHR ) {

        console.log(data)
    });
});

var frame_links_resize = $('.frames').find('a'),
    story_image_resize = $('#story');

// WINDOW.RESIZE
$(window).resize(function () {

    element_height( frame_links_resize );
    
    // element_height( $('.file_picker') );

    // story_background_image( story_image_resize );

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


$('#frame_image img').on('click', function ( event ) {

    var x_frac = (event.offsetX / $(event.target).width() * 100),
        y_frac = (event.offsetY / $(event.target).height() * 100),
        new_obj;

    new_obj = { icon: '', text: 'New!', position: { x: x_frac, y: y_frac } };

    append_object( new_obj );
})



function story_background_image ( s ) {

    var image = s.find('input[name=img]').val(),
        frame = s.find('#frame_image'),
        p, w;

        console.log(frame.width())

    frame.append('<img src="' + image + '">');   //.css('background', 'url(\'' + image + '\')'); //.css('background-size', '\'' + frame.width() + ' ' + frame.height() + '\'');

    // if( typeof( frame.position() ) !== 'undefined' ) {

    //     p = frame.position().top;
    //     w = $(window).height();

    //     frame.height(function () {
    //         return w - p;
    //     });
    // }
}

















// function initialize() {
//     var mapOptions = {
//       zoom: 4,
//       disableDefaultUI: true,
//       center: new google.maps.LatLng(-33, 151),
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     }
//     var map = new google.maps.Map(document.getElementById('frame'),
//                                   mapOptions);

//     var image = '/img/loader.gif';
//     var myLatLng = new google.maps.LatLng(-33.890542, 151.274856);
//     var beachMarker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         icon: image
//     });
// }





// initialize();





// var moonTypeOptions = {
    
//     getTileUrl: function(coord, zoom) {
        
//         var normalizedCoord = getNormalizedCoord(coord, zoom);
        
//         if (!normalizedCoord) return null;

//         var bound = Math.pow(2, zoom);
        
//         return 'http://localhost:3000/img/characters.png';
//     },

//     tileSize: new google.maps.Size(256, 256),
//     maxZoom: 0,
//     minZoom: 0,
//     radius: 1738000,
//     name: 'Moon'
// };

// var moonMapType = new google.maps.ImageMapType(moonTypeOptions);

// function initialize() {

//     var myLatlng = new google.maps.LatLng(0, 0);

//     var mapOptions = {
//         center: myLatlng,
//         zoom: 1,
           // disableDefaultUI: true,
//         streetViewControl: false,
//         mapTypeControlOptions: {
//             mapTypeIds: ['moon']
//         }
//     };

//     var map = new google.maps.Map(document.getElementById('frame'), mapOptions);

//     map.mapTypes.set('moon', moonMapType);
    
//     map.setMapTypeId('moon');
// }

// // Normalizes the coords that tiles repeat across the x axis (horizontally)
// // like the standard Google map tiles.
// function getNormalizedCoord(coord, zoom) {
    
//     var y = coord.y;
    
//     var x = coord.x;

//     // tile range in one direction range is dependent on zoom level
//     // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
//     var tileRange = 1 << zoom;

//     // don't repeat across y-axis (vertically)
//     if (y < 0 || y >= tileRange) {
//         return null;
//     }

//     // repeat across x-axis
//     if (x < 0 || x >= tileRange) {
//         x = (x % tileRange + tileRange) % tileRange;
//     }

//     return {
//         x: x,
//         y: y
//     };
// }

// initialize();


