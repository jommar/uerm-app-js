$(document).ready(function(){
    (function($){
        $.fn.load_screener = function(){
            var $obj = this;
            var data = {
                url:jom.url+$obj.attr('data--url'),
            }
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(data.url,function(output){
                $('#modal').html(`<iframe id="i-screener" style="width: 100%;height: 70vh;border: none;" src="${data.url}">`).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchReport = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
            });
        }
    }(jQuery));
});