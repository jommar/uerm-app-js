$(document).ready(function(){
    (function($){
        $.fn.save_new_sched = function(){
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
        $.fn.save_permanent_sched = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
                id:$obj.attr('data--id'),
            }
            $('[data--module="save_permanent_sched"]').removeClass('label-success label-danger').addClass('label-primary');
            $('[data--module="save_permanent_sched"]').closest('.panel').removeClass('panel-success panel-danger').addClass('panel-primary');
            $obj.html(`<b class="fa fa-spinner fa-spin"></b>`);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.removeClass('label-primary').addClass('label-success');
                    $obj.closest('.panel').removeClass('panel-primary').addClass('panel-success');
                }else{
                    $obj.removeClass('label-primary').addClass('label-danger');
                    $obj.closest('.panel').removeClass('panel-primary').addClass('panel-danger');
                }
                $obj.html(`SET SCHEDULE`);
            });
        }
    }(jQuery));

    (function($){
        $.fn.set_permanent_sched = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            }
            $('#schedView').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#schedView').html(output);
                var $panel = $('#schedView').find('.panel-success').closest('[class*="col"]').clone();
                $('#schedView').find('.panel-success').closest('[class*="col"]').remove();
                $('.ps-container').prepend($panel);
            });
        }
    }(jQuery));

    $('.pick-emp-dept').on('change',function(){
        var $obj = $(this);
        var dept = $obj.val();

        $obj.nextAll().remove();
        $obj.after(jom.loading);
        $.get(jom.url+'dutyRoster/getEmps/'+dept,function(output){
            $obj.nextAll().remove();
            $obj.after(output);
        });
    });

    $(document).on('change','[name="assign-sched"]',function(){
        var $obj = $(this);
        var data = {
            sched:{
                id:$obj.val(),
                code:$obj.attr('data--code'),
                date:$obj.attr('data--date'),
            }
        };
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            console.log(output);
            if(output.match(/success/) != null){
                $obj.closest('tr').addClass('success');
                $obj.closest('tr').find('.sched-from').text(data.sched.from);
                $obj.closest('tr').find('.sched-to').text(data.sched.to);
            }
        });
    });

    $(document).on('change','.date [name="assign-month"],.date [name="year"]',function(){
        var $obj = $('.date [name="assign-month"]');
        var data = {
            from:$obj.children(':selected').attr('data--from'),
            to:$obj.children(':selected').attr('data--to'),
            code:$obj.attr('data--code'),
            year:$obj.closest('.date').find('[name="year"]').val(),
        };
        $('#schedView').html(jom.loading);
        $('[data--module="loadSched"]').each(function(){
            if($(this).attr('data--o-url') != undefined){
                $(this).attr('data--url',$(this).attr('data--o-url'))
            }
            var url = $(this).attr('data--url');
            $(this).attr('data--o-url',url);

            url+= '/'+data.from+'/'+data.to;            
            $(this).attr('data--url',url);
        });
        $.get(jom.url+$obj.attr('data--url')+'/'+data.code+'/'+data.from+'/'+data.to+'/'+data.year,function(output){
            $('#schedView').html(output);
        });
    });
});