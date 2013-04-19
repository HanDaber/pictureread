function pr_admin () {

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

                // elem.parents('.rs').remove();
                window.location.reload(true);
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
            
            var num = parseInt( $(this).siblings('.caption-input').length ) + 1;
            // $(this).before('<em style="color:#aaa;">+ user\'s text +</em><br><br><input type="text"><br>');

            $(this).before('<input type="text" class="rewrite-input" placeholder="user\'s text"><br><input type="text" class="caption-input" placeholder="Part ' + num + '"><br>');
        });

    $('.remove-part')
        .on('click', function ( ev ) {
            
            $(this).siblings('br').last().remove();
            $(this).siblings('input').last().remove();

            $(this).siblings('br').last().remove();
            $(this).siblings('input').last().remove();
        });

    $('#caption-modal')
        .on('click', '.save-caption', function ( ev ) {

            var root = $(this).siblings('input.caption-input'),
                edits = $(this).siblings('input.rewrite-input'),
                caption = [],
                write = [],
                data = {};

            root.each(function ( index, input ) {
                 
                var value = $(input).val();

                caption.push( value === '' ? '.' : value )
            });

            edits.each(function ( index, input ) {
                 
                var value = $(input).val();

                write.push( value === '' ? 'blank' : value )
            });

            data.caption = caption;
            
            data.write = write;
            
            data.story = $(this).parents('#caption-modal').data('story');
            
            data.picture = $(this).parents('#caption-modal').data('picture');
            
            data.frame = $(this).parents('#caption-modal').data('frame');
            
            $.post('/api/captions', data, function ( resp, status, xhr ) {

                if( resp ) {
console.log(resp)
                    window.location = resp;
                }
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

                    window.location.reload(true);
                });
            })  
        })
        .find('img').addClass('crosshairs');

    dropZone('#section-drop', handle_section, { multiple: false } );

    dropZone('#story-drop', handle_story, { multiple: false } );
}