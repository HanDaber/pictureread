var permission = $('#permission').hasClass('true'),
    img_url = 'http://pictureread.s3.amazonaws.com/';


$('.bg-data').css('background', apply_background);

$('.ttip').tooltip({ placement: 'left' });

$('.story').each(function () {

	var section = $('a.current.section').attr('id'),
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



$('.interaction-popover')
    .on('click', function(ev){

        ev.preventDefault();

        $('.interaction-popover').not(this).popover('hide');

        $('.interaction-icon').removeClass('active');
        
        $(this).find('.interaction-icon').addClass('active');
    })
    .popover({

        content: function () {

            var type = $(this).data('type');

            if( type === 'blurb' ) return '<em>' + $(this).data('contents') + '</em>';
            
            else if( type === 'animation' ) return '<img src="' + $(this).data('contents') + '" width="200px" height="200px" />';
            
            else if( type === 'sound' ) return '<audio controls autobuffer preload autoplay><source src="' + $(this).data('contents') + '" type="audio/mpeg"></audio>';
            
            else if( type === 'speech' ) return '<audio controls autobuffer preload autoplay><source src="' + $(this).data('contents') + '" type="audio/mpeg"></audio>';
            
            else if( type === 'music' ) return '<audio controls autobuffer preload autoplay><source src="' + $(this).data('contents') + '" type="audio/mpeg"></audio>';
            
            else if( type === 'information' ) return '<em>' + $(this).data('contents') + '</em>';
            
            else if( type === 'caption' ) return '<em>' + $(this).data('contents') + '</em>';

            else return 'hmm...';
        },

        html: true,

        placement: function ( tip, elem ) {

            console.log( elem.parentElement )

            return elem.parentElement.offsetTop < 100 ? 'bottom' : 'top';

            /*

picture[dimensions], popover[dimensions], popover[location] => popover[dimensions]

    picture.height,
    popover.height,
    popover.pos
        popover.pos.y + popover.height < picture.height - popover.pos.y 

            */
        }
    });


$('#frame_image')
    .on('click', 'img', function(e) {

        $('.interaction-popover').popover('hide');

        $('.interaction-popover').find('.interaction-icon').removeClass('active')
    });




$('.link-generator').click(function () {


    $(this).append('<div class="highlight shared" style="position:absolute;">Shared!</div>');

    $(this).find('.shared').fadeOut(1000);
});


$('.inactive').fadeTo('fast', 0.3);


$('#caption').on('click', '.add-rewrite', function ( ev ) {

    ev.preventDefault();

    var root = $(this).parents('#caption'),
        edits = [],
        data = {};

    root.find('input').each(function ( index, input ) {

        var val = $(input).val();

        edits.push( val === '' ? 'blank' : val );
    });

    data.edits = edits;

    data.story = root.data('story');

    data.picture = root.data('picture');
    
    data.frame = root.data('frame');

    $.post('/api/rewrites', data, function ( resp, status, xhr ) {

        if( resp ) window.location = resp;
    });
});

$('#object-modal').modal({ show: false });




if( permission ) {

    filepicker.setKey('ADu2duDHmRqOkJyuusshfz');


    $('.remove-resource')
        .removeClass('hide')
        .on('dblclick', function ( ev ) {

            var elem = $(this),
                collection = elem.data('collection'),
                id = elem.data('id'),
                story = elem.data('story'),
                pic = elem.data('pic'),
                str = '/api/' + collection + '/' + id + '',
                payload = {};

            payload.story = story;

            payload.id = id;
            
            payload.pic = pic;
            
            payload.uri = str;

            post_data(payload, function ( resp, status, xhr ) {

                elem.parents('.rs').remove();
            });
        });

    $('.add-section')
        .removeClass('hide')
        .click(function ( ev ) {
            
            $('#section-modal').modal();
        });

    $('#section-modal')
        .on('click', '.save-section', function ( ev ) {

            var brand = $(this).siblings('input[name="brand_name"]').val(),
                image = $(this).siblings('input[name="image"]').val(),
                thumbnail = $(this).siblings('input[name="thumbnail"]').val(),
                section = {};

            if( brand === '' || image === '' ) {
                console.log('invalid')
            }
            else {

                section.brand = brand;
                
                section.image = image;
                
                section.thumbnail = thumbnail;

                $.post('/api/sections', section, function ( resp, status, xhr ) {

                    if( resp ) window.location = resp;
                });
            }
        });

    $('.add-story')
        .removeClass('hide')
        .click(function ( ev ) {
            
            $('#story-modal').modal();
        });

    $('#story-modal')
        .on('click', '.save-story', function ( ev ) {

            var section = $(this).siblings('input[name="section"]').val(),
                title = $(this).siblings('input[name="title"]').val(),
                images = $(this).siblings('input[class="image_key"]'),
                thumbnails = $(this).siblings('input[class="thumbnail_key"]'),
                story = {
                    images: [],
                    thumbnails: []
                };


            story.section = section;

            story.title = title;
            
            images.each(function ( i, img ) {
                story.images.push($(img).val());
            });
            
            thumbnails.each(function ( i, thumb ) {
                story.thumbnails.push($(thumb).val());
            });

            console.log(story)

            if( title === '' || story.images.length < 1 ) {
                console.log('invalid')
            }
            else {

                $.post('/api/stories', story, function ( resp, status, xhr ) {

                    if( resp ) window.location = resp;
                });
            }
        });

    $('.add-part')
        .on('click', function ( ev ) {
            
            $(this).before('<em style="color:#aaa;">+ user\'s text +</em><br><br><input type="text"><br>');
        });

    $('.remove-part')
        .on('click', function ( ev ) {
            
            $(this).siblings('em').last().remove();
            
            $(this).siblings('input').last().remove();

            $(this).siblings('br').last().remove();
            $(this).siblings('br').last().remove();
        });

    $('#caption-modal')
        .on('click', '.save-caption', function ( ev ) {

            var root = $(this).siblings('input'),
                caption = [],
                data = {};

            root.each(function ( index, input ) {
                 
                var value = $(input).val();

                caption.push( value === '' ? 'blank' : value )
            });

            data.caption = caption;
            
            data.story = $(this).parents('#caption-modal').data('story');
            
            data.picture = $(this).parents('#caption-modal').data('picture');
            
            data.frame = $(this).parents('#caption-modal').data('frame');
            
            $.post('/api/captions', data, function ( resp, status, xhr ) {

                if( resp ) window.location = resp;
            });
        });

    $('#frame_image')
        .on('dblclick', 'img', function ( event ) {

            var x_frac = ((event.offsetX - 0) / $(event.target).width() * 100),
                y_frac = ((event.offsetY - 10) / $(event.target).height() * 100),
                current_picture = $(event.target).data('current'),
                current_story = $('#story').data('current'),
                new_obj = {};

            new_obj.position = [ x_frac, y_frac ];
            
            new_obj.pic = current_picture;
            
            new_obj.story = current_story;

            $('#object-modal').modal('show');

            $('#object-modal').on('change', '.object-type-select', function ( ev ) {

                var self = $(this),
                    value = self.val(),
                    container = self.siblings('.cont');

                switch( value ) {

                    case 'blurb' :
                        
                        new_obj.type = 'blurb';

                        pr_blurb( container );
                    break;

                    case 'information' :
                        
                        new_obj.type = 'information';

                        pr_blurb( container );
                    break;

                    case 'speech' :
                        
                        new_obj.type = 'speech';

                        pr_sound( container );
                    break;

                    case 'sound' :
                        
                        new_obj.type = 'sound';

                        pr_sound( container );
                    break;

                    case 'music' :
                        
                        new_obj.type = 'music';

                        pr_sound( container );
                    break;

                    case 'animation' :
                        
                        new_obj.type = 'animation';

                        pr_animation( container );
                    break;

                    default: return;
                }
            });

            $('.save-object').on('click', function (ev) {

                new_obj.media = $(this).siblings('.cont').find('textarea[name="media"]').val();
                
                new_obj.title = $(this).siblings('input[name="object-title"]').val();

                $.post('/api/interactions', new_obj, function ( resp, status, xhr ) {

                    var rs = $('<div class="add_object rs" style="left:' + resp.position[0] + '%; top:' + resp.position[1] + '%;"></div>');

                    var a = $('<a href="" class="interaction-popover" data-type="' + resp.type + '" data-contents="' + resp.media + '" data-title="' + resp.title + '"></a>');

                    var i = $('<i class="icon-arrow-left interaction-icon ' + resp.type + '"></i>');
                    
                    var span = $('<span class="text"></span>');

                    var button = $('<button class="remove-resource interaction btn btn-mini btn-danger" data-id="' + resp._id + '" data-story="' + new_obj.story + '" data-pic="' + new_obj.pic + '" data-collection="interactions">&times;</button>');
                    
                    a.append( i ).append( span );

                    rs.append( a ).append( button );

                    $('#frame_image').append( rs );

                    $('#object-modal').modal('hide');

                    new_obj.type = '';

                    new_obj.position = [];
                });
            })  
        })
        .find('img').addClass('crosshairs');

    dropZone('#section-drop', handle_section, { multiple: false } );

    dropZone('#story-drop', handle_story, { multiple: false } );
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
            element.html("Drop to upload").css({
                'backgroundColor': "#E0E0E0",
                'border': "1px solid #000"
            });
        },
        dragLeave: function () {
            element.html( text ).css({
                'backgroundColor': "#F6F6F6",
                'border': "1px dashed #666"
            });
        },
        onStart: function ( files ) {
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
            obj.element.html('Done!');
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