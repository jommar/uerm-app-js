$(document).ready(function(){
    (function($){
        $.fn.saveMedCert = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                if(output.match(/success/ig) != null){
                    location.reload();
                }
            });
        }
    }(jQuery));
})