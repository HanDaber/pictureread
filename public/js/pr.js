var permission = $('#permission').hasClass('true'),
    img_url = 'http://pictureread.s3.amazonaws.com/',
    $window    = $(window),
    offset     = $(".sticker").offset(),
    topPadding = 15;



var popover_container_string = $window.width() < 768 ? '#frame_image' : false;

$('#sections').bxSlider({
    slideWidth: $window.width() < 768 ? 90 : 160,
    minSlides: 2,
    maxSlides: 5,
    slideMargin: 10,
    easing: 'ease-in-out'
});

$('.slider').bxSlider({
    slideWidth: 200,
    minSlides: 2,
    maxSlides: 3,
    slideMargin: 10,
    infiniteLoop: false,
    hideControlOnEnd: true,
    easing: 'ease-in-out'
});

// Swap next/prev picture buttons on mobile UI
if( $window.width() < 768 ) {

    var prev = $('.prev-picture'),
        next = $('.next-picture');

    $('.expand').after( prev )
}
else {

    // $window.scroll(function() {
        // if ($window.scrollTop() > offset.top) {

            $('.top-bar').prependTo('.sticker');

            $(".sticker").css({
                'position': 'fixed',
                'top': '0',
                'z-index': '998',
                'background': '#fff'
                // '-moz-box-shadow':    '0 0 1em 0.1em #ccc',
                // '-webkit-box-shadow': '0 0 1em 0.1em #ccc',
                // 'box-shadow':         '0 0 1em 0.1em #ccc'
            });
            
            $('.sticker-spacer').removeClass('hide').height('25em');

    //     } else {
    //         $(".sticker").css({
    //             'position': 'relative'
    //             // '-moz-box-shadow':    'none',
    //             // '-webkit-box-shadow': 'none',
    //             // 'box-shadow':         'none'
    //         });
            
    //         $('.sticker-spacer').addClass('hide');
    //     }
    // });
}



$('.bg-data').css('background', apply_background);

$('.ttip').tooltip({ placement: 'left' });

$('.story').each(function () {

	var section = $('.slide.current').attr('id'),
		self = $(this);

	if( self.data('section') == section ) {

		self.removeClass('hide');
	}
});

$('.sprite-plus').click(function () {

    var active = $(this).hasClass('active'),
        objects = $('.add_object');

    if( active ) {
        
        $(this).removeClass('active');
        
        objects.addClass('hidden');
    } 
    else {

        $(this).addClass('active');
        
        objects.removeClass('hidden');  
    }
});

var fb_href = $('.social-link.facebook').attr('href');
var tw_href = $('.social-link.twitter').attr('href'),
    tw_end = $('.social-link.twitter').data('enduri');

$('.social-link.facebook').attr('href', fb_href + '&p[url]=' + window.location.href);

$('.social-link.twitter').attr('href', tw_href + window.location.href + tw_end);

$('.interaction-popover')
    .on('click', function(ev){

        ev.preventDefault();

        $('.interaction-popover').not(this).popover('hide');

        $('.interaction-icon').removeClass('active');
        
        $(this).find('.interaction-icon').toggleClass('active');
    })
    .popover({

        content: function () {

            var type = $(this).data('type');

            if( type === 'blurb' ) return '<em>' + $(this).data('contents') + '</em>';
            
            else if( type === 'animation' ) return '<img src="' + $(this).data('contents') + '" width="200px" height="200px" />';
            
            else if( type === 'sound' ) return '<audio controls autobuffer preload="auto" autoplay><source src="' + $(this).data('contents') + '" type="audio/mpeg">Your browser does not support HTML5 audio</audio>';
            
            else if( type === 'speech' ) return '<audio controls autobuffer preload="auto" autoplay><source src="' + $(this).data('contents') + '" type="audio/mpeg">Your browser does not support HTML5 audio</audio>';
            
            else if( type === 'music' ) return '<audio controls autobuffer preload="auto" autoplay><source src="' + $(this).data('contents') + '" type="audio/mpeg">Your browser does not support HTML5 audio</audio>';
            
            else if( type === 'information' ) return '<em>' + $(this).data('contents') + '</em>';
            
            else if( type === 'caption' ) return '<em>' + $(this).data('contents') + '</em>';

            else return 'object error...';
        },

        html: true,

        container: '#frame_image',
        // container: false,
        // container: popover_container_string,

        placement: function ( tip, elem ) {

            var qtr_height = Math.round( $(elem).parents('#frame_image').height() / 4 );
            var half_width = Math.round( $(elem).parents('#frame_image').width() / 2 );

            if( elem.parentElement.offsetTop < qtr_height ) {

                // $(this.$tip).attr('style', 'top: 1em !important')
console.log('top')

            }
            
            if( elem.parentElement.offsetLeft < half_width ) {

console.log('right')
                return 'right';
            }

            else {

console.log('left')
                return 'left';
            }
        }
    });




$('#frame_image')
    .on('click', 'img', function(e) {

        $('.interaction-popover').popover('hide');

        $('.interaction-popover').find('.interaction-icon').removeClass('active')
    })
    .on('DOMNodeInserted', function ( ev ) {

        setTimeout(function () {
            
            var pop = $( ev.target ),
                offset = pop.position();

console.log( offset.top );

            if( offset.top < 10 ) {

                pop.animate({ top: offset.top + 40 + 'px' });
            }
        }, 150);

    });





$('.link-generator').click(function () {


    $(this).append('<div class="highlight shared" style="position:absolute;">Shared!</div>');

    $(this).find('.shared').fadeOut(1000);
});


$('.inactive').fadeTo('fast', 0.3);


$('#frame').on('click', 'a.add-rewrite', function ( ev ) {

    ev.preventDefault();

    var root = $('#caption'),
        edits = [],
        data = {};

    $('.popover-content').find('input').each(function ( index, input ) {

        var val = $(input).val();

        edits.push( val === '' ? 'blank' : val );
    });

    data.edits = edits;

    data.story = root.data('story');

    data.picture = root.data('picture');
    
    data.frame = root.data('frame');

    $.post('/api/rewrites', data, function ( resp, status, xhr ) {

        if( resp ) {

            window.location = resp;
        }
    });

    ev.stopPropagation();
});

$('#object-modal').modal({ show: false });



$('#frame').on('click', '.popover-title', function () {

    $('.interaction-popover').popover('hide');
    $('.interaction-icon').removeClass('active');
});


// Load admin functions
if( permission ) {
    pr_admin();
}







// ======================================================================================

function pr_blurb ( element ) {

    element.html('');

    element.html('<textarea name="media" rows="4"></textarea>');
}

function pr_sound ( element ) {

    element.html('');
    
    element.html('<b>Drag file here</b>');
    
    dropZone(element[0], handle_interaction, { multiple: false } );
}

function pr_animation ( element ) {

    element.html('');
    
    element.html('<b>Drag file here</b>');
    
    dropZone(element[0], handle_interaction, { multiple: false } );
}

function post_data ( payload, cb ) {
console.dir(payload)
    $.post(payload.uri, payload, cb);
}

function dropZone ( selector, handler, options ) {

    var element = $(selector);

    var text = element.html();

    filepicker.makeDropPane( element[0], {

        multiple: options.multiple,

        location: 'S3',
        
        dragEnter: function () {
            element.html("Drop to upload.").css({
                'backgroundColor': "#0a0",
                'border': "1px solid #000"
            });
        },
        dragLeave: function () {
            element.html( text ).css({
                'backgroundColor': "#ddd",
                'border': "1px dotted #000"
            });
        },
        onStart: function ( files ) {
            element.html('Please wait...').css({
                'backgroundColor': "#fff",
                'border': "1px dotted #fff"
            });
            console.log('files: ' + files)
        },
        onSuccess: function ( fpfiles ) {
            element.html('<em>Processing...</em>');

            var special = {
                element: element,
                files: fpfiles[0]
            };

            handler( special );
        },
        onError: function ( type, message ) {

            if( type === 'TooManyFiles' ) {
                element.text( message );
            }
            console.log('('+type+') '+ message);
        },
        onProgress: function(percentage) {
            element.text("Uploading, please wait... (" + percentage + "%)");
        }
    });

    return element;
}

function handle_section ( obj ) {

    make_thumbnail( obj, function ( thumbnail ) {

        obj.element.siblings('.pics').find('img').remove();
        
        obj.element.siblings('input[name="thumbnail"]').val( img_url + thumbnail.key );

        obj.element.siblings('input[name="image"]').val( img_url + obj.files.key );

        obj.element.siblings('.pics').append('<img src="' + img_url + thumbnail.key + '" width="100px" height="100px">');
    });
}

function handle_story ( obj ) {

    var img_len = obj.element.siblings('input[class="image_key"]').length;

console.log(img_len)

    make_thumbnail( obj, function ( thumbnail ) {
        
        $('#story-drop').before('<input name="images[' + img_len + ']" class="image_key" value="' + img_url + obj.files.key + '" type="hidden">');
        
        $('#story-drop').before('<input name="thumbnails[' + img_len + ']" class="thumbnail_key" value="' + img_url + thumbnail.key + '" type="hidden">');

        obj.element.siblings('.pics').append('<img src="' + img_url + thumbnail.key + '" width="100px" height="100px">');
    });
}

function handle_interaction ( obj ) {

    // obj.element.siblings('img').remove();

    // obj.element.after('<img src="' + img_url + obj.files.key + '" width="100px" height="100px">');

    obj.element.html('<textarea name="media" class="hide">' + img_url + obj.files.key + '</textarea>');
}

function make_thumbnail ( obj, next ) {

    filepicker.convert( obj.files, { width: 200, height: 200, fit: 'crop' }, { location: 'S3' },
        
        function ( FPFile ) {
            next( FPFile );
            obj.element.html('Finished.').css({
                'backgroundColor': "#ddd",
                'border': "1px dotted #000"
            });
            if( obj.element.hasClass('mult') ) {
                obj.element.html('Drag and Drop another picture').css({
                    'backgroundColor': "#ddd",
                    'border': "1px dotted #000"
                });
            }
            else {
                obj.element.html('Finished.').css({
                    'backgroundColor': "#fff",
                    'border': "none",
                    'height': "1em"
                });   
            }
        }, 
        
        function ( FPError ) {
            console.log('error: ' + FPError );
        }, 

        function ( percent ) {
            obj.element.html('Generating thumbnail... (' + percent + '%)');
        }
    ); 
}

function apply_background () {
	return 'url("' + $(this).data('image') + '") no-repeat center center';
}