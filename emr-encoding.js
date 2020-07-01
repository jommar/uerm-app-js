$(document).ready(function(){
    (function($){
        $.fn.select_result = function(){
            var $obj = this;
            if($obj.is('.btn-default')){
                $obj.switchClass('btn-default','btn-primary');
            }else{
                $obj.switchClass('btn-primary','btn-default');
            }

            var items = $('#charge-items .btn').map(function(){
                if($(this).is('.btn-primary')){
                    return $(this).text();
                }
            }).get().join(', ');

            $('[name="type"]').val(items);
        }
    }(jQuery));

    (function($){
        $.fn.save_form = function(){
            var $obj = $('form[data--form-id="save_form"]');
            var data = {
                form:$obj.serializeArray(),
                bbcode:$obj.find('textarea').bbcode(),
                type:$obj.find('[name="type"]').val(),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post($obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                if(output.match(/success/ig) != null){
                    location.href = `${jom.url}emr/encoding/view/${btoa($obj.find('[name="caseno"]').val())}`
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.new_search = function(){
            var $obj = this;
            var data = {
                caseno:$('[name="caseno"]').val(),
            };
            location.href = `${$obj.attr('data--url')}/${btoa(data.caseno)}`;
        }
    }(jQuery));

    $(document).on('change','[name="csno"]',function(){
        var csno = $(this).children(':selected').attr('data--csno');
        $('[name="type"]').val('');
        $('#charge-items').html('');
        $.get(`${jom.url}emr/encoding/charge-items/${btoa(csno)}`,function(output){
            // $('#charge-items').html(output);
            var date = output[0].chargeDate;
            $('[name="date"]').val(date);
            $.each(output,function(key,val){
                $('#charge-items').append(`<a href="#" class="btn btn-default btn-sm" data--module="select_result">${val.description}</a>`);
            })
        },'json');
    });

    $('textarea').wysibb({lang:'en'});
});