var idle = {};
idle.ctr = 0;
$(document).ready(function(){
    (function($){
        $.fn.setQueueName = function(){
            var $obj = this;
            var data = {
                name:$obj.attr('data--name'),
                refno:$obj.attr('data--refno'),
            };
            $('[name="name"]').val(data.name);
            $('[name="refno"]').val(data.refno);

            $obj.toggleClass('active');
        }
    }(jQuery));

    (function($){
        $.fn.updateQueue = function(){
            var $obj = this;
            var data = {
                name:$('[name="name"]').val(),
                room:$('[name="room"]').val(),
                refno:$('[name="refno"]').val(),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('[name="name"]').val('');
                // $('[name="room"]').val('');
                $('[name="refno"]').val('');

                setTimeout(function(){
                    $('[data--refno="'+data.refno+'"]').remove();
                },3000);
            }); 
        }
    }(jQuery));

    setInterval(function(){
        var queueList = $('.queue-list').html();
        $.get(jom.url+'admission/queue/getQueue',function(output){
            $('.queue-list').html(output);
            if($('video').length > 0){
                if(queueList == $('.queue-list').html()){
                    idle.ctr++;
                    if(idle.ctr >= 10){
                        // PLAY VIDEO
                        // console.log('play video');
                        $('.video-player').show();
                        $('video')[0].play();
                        // DISABLE SCROLL
                        $('html, body').css({
                            overflow: 'hidden',
                            height: '100%'
                        });
                    }
                }else{
                    idle.ctr = 0;
                    // STOP VIDEO
                    // console.log('stop video');
                    $('.video-player').hide();
                    $('video')[0].pause();
                    // ENABLE SCROLL
                    $('html, body').css({
                        overflow: 'auto',
                        height: 'auto'
                    });
                }
            }
        });
    },1000);
});