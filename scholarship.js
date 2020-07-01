$(document).ready(function(){
    (function($){
        $.fn.save_app_info = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post($obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.tag_applicant = function(){
            var $obj = this;
            var data = {
                type:$obj.attr('data--tag'),
                refnos:$(':checkbox:checked').map(function(){
                    return $(this).attr('data--refno')
                }).get(),
            }

            if(data.refnos.length == 0){
                $('#modal').html(`<div class="alert alert-danger">
                    <p>No selected application.</p>
                </div>`).modal({clickClose:false});
                return;
            }
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post($obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                $('[data--form-id="search_applicants"]').search_applicants(function(){
                    $.each(data.refnos,function(key,val){
                        $(`:checkbox[data--refno="${val}"]`).prop('checked',true);
                    });
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.set_edit = function(){
            var $obj = this;
            var data = {
                type:$obj.attr('data--col'),
                refNo:$obj.attr('data--refno')
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get($obj.attr('data--url'),function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.app_info = function(){
            var $obj = this;
            $obj.trOutput('show');
            $.get($obj.attr('data--url'),function(output){
                $obj.trOutput(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.save_msg_config = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray()
            }
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post($obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.search_report = function(){
            var $obj = this;
            var data = {
                type:$obj.find('[name="type"]').val(),
                from:$obj.find('[name="from"]').val(),
                to:$obj.find('[name="to"]').val(),
                college:$obj.find('[name="college"]').val(),
            }
            location.href = `${$obj.attr('data--url')}${data.type}/${data.from}/${data.to}/${data.college}`;
        }
    }(jQuery));

    (function($){
        $.fn.toggle_msg = function(){
            $('.msg-row').toggle();
        }
    }(jQuery));

    (function($){
        $.fn.save_config = function(){
            var $obj = this;
            var data = {
                college:$obj.attr('data--college-code'),
            };
            data.obj = $(`[data--college-code="${data.college}"]:not([data--module="save_config"]):visible`).map(function(){
                return {
                    id:$(this).attr('data--id'),
                    appStart:$(this).find('[name="appStart"]').val(),
                    appEnd:$(this).find('[name="appEnd"]').val(),
                    reqDate:$(this).find('[name="req"]').val(),
                    sem:$(this).find('[name="sem"]').val(),
                }
            }).get();
            data.json = JSON.stringify(data.obj);
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post($obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                $(`[data--college-code="${data.college}"]:not([data--module="save_config"]):visible`).addClass('success')
            });
        }
    }(jQuery));

    (function($){
        $.fn.search_applicants = function(fn){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $('#app-list').html(jom.loading);
            $.post($obj.attr('data--url'),{data:data},function(output){
                $('#app-list').html(output);
                var len = $('#app-list').find('tbody tr').length;
                $('#ctr').text(len);
                if(fn()){
                    fn();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.reject_applicant = function(){
            var $obj = this;
            var data = $(':checkbox:checked').map(function(){
                return {
                    code:$(this).closest('tr').attr('data--code'),
                    refno:$(this).closest('tr').attr('data--refno'),
                }
            }).get();
            var json = JSON.stringify(data);
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.each(data,function(key,val){
                $.post($obj.attr('data--url'),{data:val},function(output){
                    console.log(output);
                    if(output.match(/success/ig) != null){
                        $(`tr[data--refno="${val.refno}"]`).addClass('danger').find(':checkbox').prop('checked',false);
                    }
                    jom.modal('close');
                });
            })
        }
    }(jQuery));

    (function($){
        $.fn.accept_applicant = function(){
            var $obj = this;
            var data = $(':checkbox:checked').map(function(){
                return {
                    code:$(this).closest('tr').attr('data--code'),
                    refno:$(this).closest('tr').attr('data--refno'),
                }
            }).get();
            var json = JSON.stringify(data);
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.each(data,function(key,val){
                $.post($obj.attr('data--url'),{data:val},function(output){
                    console.log(output);
                    if(output.match(/success/ig) != null){
                        $(`tr[data--refno="${val.refno}"]`).addClass('success').find(':checkbox').prop('checked',false);
                    }
                    jom.modal('close');
                });
            })
        }
    }(jQuery));

    (function($){
        $.fn.select_college = function(){
            var $obj = this;
            var param = $obj.attr('data--college');
            $('.app-list tr').find(':checkbox').prop('checked',0);
            $(`.app-list tr[data--college="${param}"]`).find(':checkbox').prop('checked',1);
        }
    }(jQuery));

    (function($){
        $.fn.select_status = function(){
            var $obj = this;
            var param = $obj.attr('data--status');
            $('.app-list tr').find(':checkbox').prop('checked',0);
            $(`.app-list tr[data--status="${param}"]`).find(':checkbox').prop('checked',1);
        }
    }(jQuery));

    $('.app-list tr').on('click',function(){
        $(this).find(':checkbox').prop('checked',!$(this).find(':checkbox').prop('checked'));
    });

    $('.table-config [name="sem"]').on('change',function(){
        var col = $(this).closest('tr').attr('data--college-code');

        $(`tr[data--college-code="${col}"]`).find('[name="sem"]').val($(this).val());
    });

    $('[data--max-char]').on('keydown keyup change',function(e){
        var data = {
            len:$(this).val().length,
            max:$(this).attr('data--max-char'),
        };
        var str = $(this).val().substring(0,data.max);
        if(data.len > data.max){
            e.preventDefault();
        }
        $(this).val(str);
        $(this).closest('label').find('.char-left').text(data.max - str.length);
    });

    $(document).on('click','[data--select-checkbox] td',function(){
        var data = {
            index:$(this).index(),
        }
        if(data.index > 1){
            var $cb = $(this).closest('tr').find(':checkbox');
            $cb.prop('checked',!$cb.prop('checked'));
        }
    });

    $('[data-toggle="popover"]').popover();
});