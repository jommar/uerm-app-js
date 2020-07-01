$(document).ready(function(){
    (function($){
        $.fn.download_emps = function(){
            var $obj = this;
            var $form = $('[data--form-id="search_details"]');
            var data = {
                form:btoa(JSON.stringify($form.serializeArray())),
            };
            window.open($obj.attr('data--url')+data.form);
        }
    }(jQuery));

    (function($){
        $.fn.search_details = function(){
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

    (function($){
        $.fn.search = function(){
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

    $(document).on('keyup','.filter-key',function(){
        var $obj = $(this);
        var data = {
            search:$obj.val(),
            type:$obj.attr('data--filter'),
        }
        var $container = $(`.filter-item [data--filter="${data.type}"]`);

        $container.each(function(){
            if($(this).text().match(new RegExp(data.search,'ig')) == null){
                $(this).closest('.filter-item').parent().hide();
                console.log('not match');
            }else{
                $(this).closest('.filter-item').parent().show();
                console.log('match');
            }
        });

        $('#filter-ctr').text($('.filter-item:visible').length);

        // console.log(data,$container);
    });
});