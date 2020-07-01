$(document).ready(function(){
    (function($){
        $.fn.search_student = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray()
            };
            $obj.closest('.row').find('.op').html(jom.loading);
            $.post(`${$obj.attr('data--url')}`,{data:data},function(output){
                $obj.closest('.row').find('.op').html(output);
                console.log(output)
            })
        }
    }(jQuery));

    (function($){
        $.fn.replaceNameByCode = function(){
            var $obj = this;
            $obj.closest('.row').find('[name="sn"]').val($obj.attr('data--code'));
            $obj.closest('.row').find('form').search_student();
        }
    }(jQuery))
})