$(document).ready(function(){

    (function($){
        $.fn.getActiveLogin = function(){
            var $obj = this;
            $obj.html(jom.loading);
            $.get(jom.url+'lib/attendance/get-active-login',function(output){
                $obj.replaceWith(output);
                $('[name="code"]').val('');
            });
        }
    }(jQuery));

    (function($){
        $.fn.logAttendance = function(){
            var $obj = this;
            var data = {
                code:$obj.find('[name="code"]').val(),
            };
            if(data.code != ''){
                $obj.nextAll().remove();
                $obj.after(jom.loading);
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                        $obj.nextAll().remove();
                        $obj.after(output);
                        $('.attendance-container').getActiveLogin();
                });
            }
        }
    }(jQuery));

    $('body,html').on({
        'click':function(){
            $('[name="code"]').focus();
        },
        'keyup':function(){
            $('[name="code"]').focus();
        }
    });

    $('[name="code"]').focus();
});