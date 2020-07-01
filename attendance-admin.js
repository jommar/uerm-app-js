$(document).ready(function(){
    (function($){
        $.fn.set_timedata = function(){
            var $obj = this;
            var data = {
                from:$obj.closest('div').find('[name="from"]').val(),
                to:$obj.closest('div').find('[name="to"]').val(),
            };
            $('#console-body').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url')+data.from+'/'+data.to,function(output){
                $('#console-body').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.set_college = function(){
            var $obj = this;
            var data = {
                type:$obj.attr('data--type'),
                college:$obj.attr('data--college'),
                college_desc:$obj.attr('data--college-desc'),
                code:$obj.attr('data--code'),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                if(output.match(/success/ig) != null){
                    if(output.match(/unassigned/ig) != null){
                        $(`.assigned-college [data--college="${data.college}"][data--code="${data.code}"]`).remove();
                        $obj.find('.fa-remove').replaceWith(`<b class="fa fa-check"></b>`);
                    }else{
                        $(`.assigned-college .list-group-item-danger`).remove();
                        $(`.assigned-college`).append(`<a href="#" data--college="${data.college}" class="full-width" style="margin-top:4px;margin-bottom:4px;" data--code="${data.code}" data--module="view_assignment" data--target="#console-body" data--url="attendance/admin/college/${data.college}"><b class="fa fa-cog"></b> ${data.college_desc}</a>`);
                        $obj.find('.fa-check').replaceWith(`<b class="fa fa-remove"></b>`);
                    }
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.search_emps = function(){
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