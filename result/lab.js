$(document).ready(function(){
    (function($){
        $.fn.showcharges = function(){
            var $obj = this;
            var data = {
                caseno:$obj.attr('data--caseno'),
                csno:$obj.attr('data--chargeslipno'),
            };
            $('#modal').html(jom.loading).modal();
            $.post($obj.attr('href'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:true});
            });
        }
    }(jQuery));

    (function($){
        $.fn.showresult = function(){
            var $obj = this;
            var data = {
                result:$obj.closest('td').find('.result').html(),
            };
            $('#modal').html(jom.loading).modal();
            $.get($obj.attr('href'),function(output){
                $('#modal').html(`<div class="panel panel-primary">
                    <div class="panel-heading">Viewing Lab Result: ${$obj.attr('data--patient-name')}</div>
                    <div class="panel-body">${output}</div>
                </div>`).modal({clickClose:true});
                $('#modal').find('.col-3').switchClass('col-3','col-xs-3');
                $('#modal').find('.col-12').switchClass('col-12','col-xs-12');
                $('#modal').find('a:contains("Print")').parent().remove();
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchResult = function(){
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