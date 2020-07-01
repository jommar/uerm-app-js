$(document).ready(function(){
    $.fn.loadAssignModule = function(){
        var $obj = this;
        var $container = $obj.closest('.panel');
        var data = {
            code:$obj.attr('data--code'),
        };
        $container.html(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $container.html(output);
        });
    }

    $.fn.searchEmployee = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        $obj.nextAll().remove();
        $obj.after(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $obj.nextAll().remove();
            $obj.after(output);
            if($('[data--module="loadAssignModule"]').length == 1){
                $('[data--module="loadAssignModule"]').loadAssignModule();
            }
        });
    }
});