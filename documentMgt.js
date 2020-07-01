$(document).ready(function(){
    (function($){
        $.fn.uploadAttachFile = function(){
            var $obj = this;
            var data = {
                caseno:$obj.find('[name="caseno"]').val(),
                type:$obj.find('[name="type"]').val(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $obj.find('[type="file"]').upload(jom.url+$obj.attr('data--url'),{caseno:data.caseno,type:data.type},function(output){
                console.log(output);
                $obj.nextAll().remove();
                if(output.match(/success/ig) != null){
                    location.reload();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.attachFile = function(){
            var $obj = this;
            var data = {
                caseno:$obj.attr('data--caseno'),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchcf4 = function(fn){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);

                if(fn){
                    fn();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.uploadcf4 = function(){
            var $obj = this;
            var data = {
                caseno:$obj.find('[name="caseno"]').val(),
            };
            $('#modal').html(jom.loading).modal();
            // UPLOAD FILE
            $obj.find('[type="file"]').upload(jom.url+$obj.attr('data--url'),{data:data.caseno},function(output){
                console.log(output);
                $('#modal').html(output).modal({clickClose:false});
                if(output.match(/success/ig) != null){
                    $obj[0].reset();
                }
            });
            // $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            //     console.log(output);
            //     $('#modal').html(output).modal({clickClose:false});
            // });
        }
    }(jQuery));
});