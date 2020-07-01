(function($){
    $.fn.updatePgiInfo = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            jom.modal('show','<div>'+output+'</div>');
        });
    }
}(jQuery));

(function($){
    $.fn.editDiplomaConfig = function(){
        var $obj = this;
        if($obj.is('form')){
            // console.log($obj);return;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/ig) != null){
                    location.reload();
                }
            });
        }else{
            var data = {
                code:$obj.attr('data--code'),
                type:$obj.attr('data--cfg-type'),
                str:$obj.text().trim(),
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                jom.modal('show','<div>'+output+'</div>');
            });
        }
    }
}(jQuery));

(function($){
    $.fn.saveControl = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            jom.modal('show','<div>'+output+'</div>');
            if(output.match(/success/ig) != null){
                location.reload();
            }
        });
    }
}(jQuery));

function randSelect(){
    $('select').each(function(){
        var $options = $(this).find('option'),
        random = ~~(Math.random() * $options.length);
        if(random < 1){
            random = 1
        }
        $options.eq(random).prop('selected', true);
    })
}

(function($){
    $.fn.addNewPgi = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        $obj.nextAll().remove();
        $obj.after(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $obj.nextAll().remove();
            $obj.after(output);
            $('#PGIList').refreshPGI();
            location.reload();
        });
    }
}(jQuery));

(function($){
    $.fn.refreshPGI = function(){
        var $obj = this;
        $obj.html(jom.loading);
        $.get(jom.url+'coc/info/pgiList',function(output){
            $obj.html(output);
        });
    }
}(jQuery));

(function($){
    $.fn.removeCfg = function(){
        var $obj = this;
        var data = {
            type:$obj.attr('data--type'),
            code:$obj.attr('data--code'),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            jom.modal('show','<div>'+output+'</div>');
            $obj.parent().remove();
        });
    }
}(jQuery));

(function($){
    $.fn.saveDiplomaTypeCfg = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        $obj.nextAll().remove();
        $obj.after(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $obj.nextAll().remove();
            $obj.after(output);
            $('#typeList').load(jom.url+'coc/loadType');
        });
    }
}(jQuery));

(function($){
    $.fn.saveDeptCfg = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        $obj.nextAll().remove();
        $obj.after(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $obj.nextAll().remove();
            $obj.after(output);
            $('#deptList').load(jom.url+'coc/loadDepts');
        });
    }
}(jQuery));

(function($){
    $.fn.approveDiploma = function(){
        var $obj = this.closest('tr');
        var data = {
            code:$obj.attr('data--code'),
            dept:$obj.find('[name="dept"]').val(),
            type:$obj.find('[name="type"]').val(),
        };
        if(data.dept != '' && data.type != ''){
            var name = {
                first:$obj.find('[data--name="first"]').text(),
                middle:$obj.find('[data--name="middle"]').text(),
                last:$obj.find('[data--name="last"]').text(),
            };
            $obj.saveTimer = {};
            $obj.saveTimer.timer = 5000;
            $obj.saveTimer.maxTime = $obj.saveTimer.timer;
            $obj.saveTimer.cancelled = !$obj.prop('checked');
            // START TIMER PROGRESS BAR
            $obj.progTimer = {};
            $obj.progTimer.timer = 10;
            $obj.progTimer.interval = setInterval(function x(){
                $obj.find('progress').get(0).value+= $obj.progTimer.timer/$obj.saveTimer.maxTime*100;
                return x;
            }(),$obj.progTimer.timer);
            // START TIMER SAVE
            $obj.saveTimer.interval = setInterval(function x(){
                $obj.find('[data--second]').text($obj.saveTimer.timer/1000);
                $obj.find('[data--cancel-timer]').show();
                $obj.saveTimer.cancelled = !$obj.find(':checkbox').prop('checked');
                if($obj.saveTimer.timer == 0 && $obj.saveTimer.cancelled == false){
                    // SAVE TO DATABASE
                    $.post(jom.url+$obj.find(':checkbox').attr('data--url'),{data:data},function(output){
                        console.log(output);
                        clearInterval($obj.saveTimer.interval);
                        clearInterval($obj.progTimer.interval);
                        $obj.remove();
                        $obj.find('[data--cancel-timer]').hide();
                    });
                }else if($obj.saveTimer.cancelled == true){
                    // RESET PROGRESS VAL
                    $obj.find('progress').get(0).value = 0;
                    // REMOVE INTERVAL
                    clearInterval($obj.saveTimer.interval);
                    clearInterval($obj.progTimer.interval);
                    // HIDE TIMER MSG
                    $obj.find('[data--cancel-timer]').hide();
                }else{
                    // DECREMENT TIMER
                    $obj.saveTimer.timer-= 1000;
                }
                return x;
            }(),1000);
            // SET CLICK EVENT ON CANCEL
            $('[data--cancel-diploma-save]').on('click',function(){
                $(this).closest('tr').find(':checkbox').prop('checked',false);
                $obj.closest('tr').find('select').val('');
            });
        }
    }
}(jQuery));

(function($){
    $.fn.saveDiploma = function(){
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
    $.fn.saveDateCfg = function(){
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
    $.fn.saveSignatories = function(){
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
    $.fn.searchDiploma = function(){
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

$.fn.toggleCheck  = function() {
    $(this).prop('checked', !($(this).is(':checked')));
}
$(document).ready(function(){
    $('.tr-toggle-checkbox').on('click',function(){
        $(this).find(':checkbox').toggleCheck();
    });
    $('.checkbox-master').on('click',function(){
        $(this).closest('.checkbox-toggle').find(':checkbox').prop('checked',$(this).is(':checked'));
    });

    $('.diploma-container select').on('change',function(){
        if($(this).closest('tr').find('[name="dept"]').val() != '' && $(this).closest('tr').find('[name="type"]').val() != ''){
            $(this).closest('tr').find(':checkbox').prop('checked',1);
            $(this).approveDiploma();
        }else{
            $(this).closest('tr').find(':checkbox').prop('checked',0);
        }
    });
});