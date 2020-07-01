var idle = {
    max:5,
    ctr:0
}

$(document).ready(function(){
    (function($){
        $.fn.showAtt = function(){
            location.href = jom.url+'attendance/view';
        }
    }(jQuery));

    (function($){
        $.fn.showForm = function(){
            var $obj = $('.form-container');
            $obj.toggleClass('d-none')
        }
    }(jQuery));

    (function($){
        $.fn.saveAttendance = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            // RESET INPUT FIELDS
            $(':input').val('');

            $obj.closest('.container').nextAll().remove();
            $obj.closest('.container').after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.closest('.container').nextAll().remove();
                $obj.closest('.container').after(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.showDate = function(){
            var $obj = this;
            var date = new Date;

            $obj.text(date);

            setInterval(function(){
                var date = new Date;

                $obj.text(date);
            },1000);
        }
    }(jQuery));

    // reset idle timer
    $(document).on('keypress click mousemove',function(){
        $('.hidden-input').focus();
        idle.ctr = 0;
    });

    // transfer values from hidden input to sn input box
    $('.hidden-input').on('keyup',function(e){
        if(e.which == 13){
            $('[data--form-id="saveAttendance"]').saveAttendance();
            setTimeout(()=>{
                $('#snText').html('');
            },1000);
        }else{
            $('#snText').html($(this).val());
            $('[name="code"]').val($(this).val());
        }
    });

    // idle timer
    setInterval(function(){
        if(idle.ctr > idle.max){
            idle.ctr = 0;
            $(':input').val(''); // reset input
            $('#snText').html(''); // reset sn from div
            $('.form-container').addClass('d-none'); // hide the input
            $('.form-container').closest('.container').nextAll().remove(); // remove the student info
        }
        idle.ctr++;
    },1000);

    $('.date-container').showDate();
});