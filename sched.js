$(document).ready(function(){
    (function($){
        $.fn.changeAttDate = function(){
            var $obj = this;
            var data = {
                date:{
                    from:$('[name="dateFrom"]').val(),
                    to:$('[name="dateTo"]').val(),
                }
            };
            location.href = jom.url+'faculty/sched/attendance/'+data.date.from+'/'+data.date.to;
        }
    }(jQuery));

    (function($){
        $.fn.saveFacultyNote = function(){
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
        $.fn.addNote = function(){
            var $obj = this;
            var $container = $('.personal-info-output');
            var data = {
                code:$obj.attr('data--code'),
            };
            $container.html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $container.html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.cancelSchedule = function(){
            var $obj = this;
            var data = {
                schedId:$obj.attr('data--sched-id'),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').addClass('danger');
                    setTimeout(function(){
                        $obj.closest('tr').slideUp('fast',function(){
                            $(this).remove();
                        });
                    },1000);
                }
                console.log(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchReport = function(){
            var $obj = this;
            var data = {
                form:$obj.serialize(),
            };

            $.get(jom.url+'api/encryptUrl/'+btoa(data.form),function(output){
                location.href = jom.url+$obj.attr('data--url')+'/'+btoa(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.setSchedDetails = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };

            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').addClass('success');
                }else{
                    $obj.closest('tr').addClass('danger');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveNewType = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/ig) != null){
                    $.get(jom.url+'faculty/sched/lectureTypeList',function(output){
                        console.log(output);
                        $('[name="type"]').each(function(){
                            var $select = $(this);
                            var oldVal = $select.val();
                            $select.children().remove();

                            $select.append('<option value="">- Select One -</option>')
                            $.each(output,function(key,val){
                                $select.append('<option value="'+val.code+'">'+val.description+'</option>')
                            });
                            $select.val(oldVal);
                        });
                    },'json');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.toggleNewType = function(){
            var $obj = $('.sched-list-container'),
                $btn = this;

            if($obj.is(':visible')){
                $obj.hide();
                $obj.nextAll().remove();
                $obj.after(jom.loading);
                $.get(jom.url+$btn.attr('data--url'),function(output){
                    $obj.nextAll().remove();
                    $obj.after(output);
                });
            }else{
                $obj.show();
                $obj.nextAll().remove();
            }
        }
    }(jQuery));

    (function($){
        $.fn.hideMiscCalendar = function(){
            var $obj = this;
            $list = $obj.closest('form').parent().find('.list-group');
            $list.show();
            $list.nextAll().remove();
        }
    }(jQuery));

    (function($){
        $.fn.showMiscCalendar = function(){
            var $obj = this;
            var data = {
                schedId:$obj.attr('data--sched-id'),
            };
            var $list = $obj.closest('.list-group');
            $list.hide();
            $obj.closest('.list-group-item').html();

            $list.nextAll().remove();
            $list.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $list.nextAll().remove();
                $list.after(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveSchedule = function(){
            var $obj = this;
            var data = {
                code:$obj.find('[name="code"]').val(),
                subject:$obj.find('[name="subject"]').val(),
                timeFrom:$obj.find('[name="timeFrom"]').val(),
                timeTo:$obj.find('[name="timeTo"]').val(),
                dates:$obj.find('.selected-date').map(function(){
                    return $(this).html();
                }).get().join(),
            }
            if(data.subject && data.dates){
                $obj.nextAll().remove();
                $obj.after(jom.loading);
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                    $obj.nextAll().remove();
                    $obj.after(output);
                });
            }else{
                alert('Please enter a date and subject to continue.');
            }
        }
    }(jQuery));

    (function($){
        $.fn.showCalendar = function(){
            $('.calendar').html(jom.loading);
            $.get(jom.url+'faculty/sched/calendar',function(output){
                location.reload();
            });
        }
    }(jQuery));

    (function($){
        $.fn.assignFacultySchedule = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('.calendar').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('.calendar').html(output);
            });
        }
    }(jQuery));

    $(document).on('change','[name="date"]',function(){
        var $dates = $('.date-sched');
        $dates.html('<b style="display:none" class="selected-date">'+$(this).val()+'</b>');
        $('[name="regDateFrom"]').val('');
        $('[name="regDateTo"]').val('');
        $('[name="day"]').prop('checked',false);
    });

    $(document).on('change','form[data--form-id="saveSchedule"] .reg-sched-date :input',function(){
        var data = {
            from:$(this).closest('form').find('[name="regDateFrom"]').val(),
            to:$(this).closest('form').find('[name="regDateTo"]').val(),
            days:$(':checkbox:checked').map(function(){
                return $(this).val()
            }).get().join(),
        };
        var $dates = $('.date-sched');
        $('[name="date"]').val('');
        if(data.from && data.to && data.days){
            $dates.html(jom.loading);
            $.post(jom.url+'faculty/sched/generateDate',{data:data},function(output){
                $dates.html(output);
            });
        }
    });

    $('.calendar').find('.list-group-item').on({
        'mouseover':function(){
            $(this).find('.misc-item').show();
        },
        'mouseleave':function(){
            $(this).find('.misc-item').hide();
        }
    });

    $('.panel-toggle').on({
        'mouseover':function(){
            $(this).removeClass('panel-default');
            $(this).addClass('panel-primary');
        },
        'mouseleave':function(){
            $(this).removeClass('panel-primary');
            $(this).addClass('panel-default');
        }
    });

    $('form[data--form-id="setSchedDetails"]').on('change',function(){
        $(this).closest('form').setSchedDetails();
    });

    $(document).on('change','.calendar .change-month',function(){
        var urlPath = location.pathname.split('/');

        if(location.href.match(/list/ig) != null){
            location.href = jom.url+'faculty/sched/index/'+$(this).val()+'/'+urlPath[6]+'/list';
        }else if(location.href.match(/calendar/ig) != null){
            location.href = jom.url+'faculty/sched/index/'+$(this).val()+'/'+urlPath[6]+'/calendar';
        }else{
            location.href = jom.url+'faculty/sched/index/'+$(this).val();
        }
    });
});