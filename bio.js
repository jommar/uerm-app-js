(function($){
    $.fn.make_dtr_summary = function(){
        var $obj = this;

        $('#dtr-summary-o').html(jom.loading);
        $.get($obj.attr('data--url'),function(output){
            $('#dtr-summary-o').html(output);
        });
    }
}(jQuery));

(function($){
    $.fn.compute_tardy_ot = function(){
        var $obj = this;
        var $tr = $('[data--timedata]').not('.ot-computed').eq(0);
        var data = {
            type:$('[name="autocompute"]').val(),
            code:$tr.attr('data--timedata'),
            otFrom:$obj.closest('.panel').find('[name="otDateFrom"]').val(),
            otTo:$obj.closest('.panel').find('[name="otDateTo"]').val(),
            tardyFrom:$obj.closest('.panel').find('[name="tardinessFrom"]').val(),
            tardyTo:$obj.closest('.panel').find('[name="tardinessTo"]').val(),
        };
        if($tr.length > 0){
            $tr.addClass('ot-computed');
            $('#modal').html(`<div class="alert alert-warning">Computing OT/Tardiness on: ${$tr.attr('data--timedata')}.</div>`).modal({clickClose:false});
            // $('#modal').html(jom.loading).modal({clickClose:false});
            $.post($obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                var ot = output.ot ? output.ot : null;
                var late = output.late ? output.late : null;
                var total = {
                    o135:0,
                    o130:0,
                    o35:0,
                    o100:0,
                    tardy:0,
                    undertime:0,
                };
                var note = {
                    o135:[],
                    o130:[],
                    o35:[],
                    o100:[],
                    tardy:[],
                    undertime:[],
                };
                $.each(late,function(key,val){
                    total.tardy+= val.late;
                    if(val.late > 0){
                        note.tardy.push(val.transDate);
                    }
                    total.undertime+= val.undertime;
                    if(val.undertime > 0){
                        note.undertime.push(val.transDate);
                    }
                });
                $.each(ot,function(key,val){
                    if(val.isOff == 'Rest Day'){
                        total.o135+= val.otHours;
                        if(val.otHours > 0){
                            note.o135.push(val.transDate);
                        }
                        // $note[$val.code]['135'][] = $val.otHours > 0 ? $val.transDate : null;
                    }else if(val.isOff == 'Day Off'){
                        total.o130+= val.otHours;
                        if(val.otHours > 0){
                            note.o130.push(val.transDate);
                        }
                        // $note[$val.code]['130'][] = $val.otHours > 0 ? $val.transDate : null;
                    }else if(val.calType == 'SPECIAL NON-WORKING HOLIDAY'){
                        total.o35+= val.holidayPay;
                        if(val.holidayPay > 0){
                            note.o35.push(val.transDate);
                        }
                        // $note[$val.code]['35'][] = $val.holidayPay > 0 ? $val.transDate : null;
                    }else if(val.calType == 'REGULAR HOLIDAY'){
                        total.o100+= val.holidayPay;
                        if(val.holidayPay > 0){
                            note.o100.push(val.transDate);
                        }
                        // $note[$val.code]['100'][] = $val.holidayPay > 0 ? $val.transDate : null;
                    }else if(val.otHours > 0){
                        total.o130+= val.otHours;
                        if(val.otHours > 0){
                            note.o130.push(val.transDate);
                        }
                        // $note[$val.code]['130'][] = $val.otHours > 0 ? $val.transDate : null;
                    }
                });
                console.log(note);
                $(`[data--timedata="${data.code}"]`).find('[name="OT135"]').val(total.o135);
                $(`[data--timedata="${data.code}"]`).find('[name="OT130"]').val(total.o130);
                $(`[data--timedata="${data.code}"]`).find('[name="OT100"]').val(total.o100);
                $(`[data--timedata="${data.code}"]`).find('[name="OT35"]').val(total.o35);
                $(`[data--timedata="${data.code}"]`).find('[name="Late"]').val(total.tardy);
                $(`[data--timedata="${data.code}"]`).find('[name="Undertime"]').val(total.undertime);

                $(`[data--timedata="${data.code}"]`).find('[name="NoteOT135"]').val(note.o135.join(';'));
                $(`[data--timedata="${data.code}"]`).find('[name="NoteOT130"]').val(note.o130.join(';'));
                $(`[data--timedata="${data.code}"]`).find('[name="NoteOT100"]').val(note.o100.join(';'));
                $(`[data--timedata="${data.code}"]`).find('[name="NoteOT35"]').val(note.o35.join(';'));
                $(`[data--timedata="${data.code}"]`).find('[name="NoteLate"]').val(note.tardy.join(';'));
                $(`[data--timedata="${data.code}"]`).find('[name="NoteUndertime"]').val(note.undertime.join(';'));
                $('[data--module="compute_tardy_ot"]').compute_tardy_ot();
            },'json');
        }else{
            $('#modal').html(`<div class="alert alert-success">OT/Tardiness computation completed.</div>`).modal({clickClose:false});
            $('.ot-computed').removeClass('ot-computed');
        }
    }
}(jQuery));

(function($){
    $.fn.archive_emps = function(){
        var $obj = this;
        var data = {
            token:btoa(btoa('force archive employees')),
        }
        $('#modal').html(jom.loading).modal({clickClose:false});
        $.post($obj.attr('data--url'),{data:data},function(output){
            $('#modal').html(output).modal({clickClose:false});
        });
    }
}(jQuery));

(function($){
    $.fn.search_dtr_summary = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        $('#dtr-summary-o').html(jom.loading);
        $.post(`${$obj.attr('data--url')}search/`,{data:data},function(output){
            $('#dtr-summary-o').html(output);
        });
    }
}(jQuery));

(function($){
    $.fn.getMissingSched = function(){
        return false;
        var $obj = this;
        if($obj.find('[data--row-type="additional"]:not(.dtr-fixed)').length > 0){
            var $fix = $obj.find('[data--row-type="additional"]:not(.dtr-fixed)').eq(0);
            var data = {
                code:$fix.attr('data--code'),
                date:$fix.attr('data--date'),
            };
            $.post(jom.url+$fix.attr('data--url'),{data:data},function(output){
                console.log(output);
                $fix.addClass('dtr-fixed');
                $fix.find('[data--sched-from]').text(output.row.from);
                $fix.find('[data--sched-to]').text(output.row.to);
                $fix.find('[data--overtime-100]').text(output.row.type != null ? '8' : '');
                $fix.find('[data--calendar]').text(output.row.type);

                var ot = {
                    original:parseFloat($obj.find('[data--timedata="'+data.code+'"] [name="OT100"]').val()),
                    add:output.row.type != null ? 8 : 0,
                };


                $obj.find('[data--timedata="'+data.code+'"] [name="OT100"]').val(ot.original+ot.add);
                console.log(ot);
                $obj.getMissingSched();
            },'json');
        }else{
            console.log('dtr fix complete');
        }
    }
}(jQuery));

(function($){
    $.fn.searchManualTimeEntry = function(){
        var $obj = this;
        var data = {
            from:$obj.find('[name="from"]').val(),
            to:$obj.find('[name="to"]').val(),
        };
        $('#postOutput').html(jom.loading);
        $.get(jom.url+'bio/manualTimeEntries/'+data.from+'/'+data.to,function(output){
            $('#postOutput').html(output);
        });
    }
}(jQuery));

(function($){
    $.fn.tagTimeDataSave = function(){
        var $obj = this;
        var $tr = $obj.closest('tr');
        if($tr.attr('tag-timedata-save')){
            $tr.removeAttr('tag-timedata-save');
            $tr.removeClass('bg-success');
            $tr.addClass('bg-info');
        }else{
            $tr.attr('tag-timedata-save',1);
            $tr.removeClass('bg-info');
            $tr.addClass('bg-success');
        }
    }
}(jQuery));

(function($){
    $.fn.updatePostedTimeData = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        if($obj.find('[name="officer"]').val() == 1){
            var $tr = $('tr[data--officer="1"][data--code="'+$obj.find('[name="code"]').val()+'"]')
            var data = {
                code:$obj.find('[name="code"]').val(),
                dateFrom:$obj.find('[name="from"]').val(),
                dateTo:$obj.find('[name="to"]').val(),
                AbsencesDay:$tr.find('[data--type="absencesDay"]').parent().text().trim(),
                AbsencesHour:$tr.find('[data--type="absencesHour"]').parent().text().trim(),
                Late:$tr.find('[data--type="late"]').parent().text().trim(),
                Undertime:$tr.find('[data--type="undertime"]').parent().text().trim(),
                DiffPM:$tr.find('[data--type="ot35"]').parent().text().trim(),
                DiffNP:$tr.find('[data--type="ot100"]').parent().text().trim(),
                OT35:$tr.find('[data--type="ot130"]').parent().text().trim(),
                OT100:$tr.find('[data--type="ot135"]').parent().text().trim(),
                OT130:$tr.find('[data--type="diffNp"]').parent().text().trim(),
                OT135:$tr.find('[data--type="diffPm"]').parent().text().trim(),
                Note:$tr.find('[data--type="note"]').parent().text().trim(),
                Refund:$tr.find('[data--type="refund"]').parent().text().trim(),
                form:$obj.serializeArray(),
                url:'bio/postTimeDataOfficer',
            }
            $('[data--module="getTimeData"]').getTimeData({loading:false});
        }else{
            data.url = $obj.attr('data--url');
        }
        $obj.nextAll().remove();
        $obj.after(jom.loading);
        $.post(jom.url+data.url,{data:data},function(output){
            $obj.nextAll().remove();
            $obj.after(output);
        });
    }
}(jQuery));

(function($){
    $.fn.editPostedTimeData = function(){
        var $obj = this;
        var data = {
            code:$obj.attr('data--code'),
            type:$obj.attr('data--type'),
            from:$obj.attr('data--from'),
            to:$obj.attr('data--to'),
            id:$obj.attr('data--id'),
            officer:$obj.attr('data--officer'),
            val:$obj.attr('data--val'),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            jom.modal('show',output);
        });
    }
}(jQuery));

(function($){
    $.fn.setDtrTimeManual = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        $obj.nextAll().remove();
        $obj.after(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $obj.nextAll().remove();
            $obj.after(output);
            if(location.href.match(/view-dtr|hr/ig).length == 2){
                location.reload();
            }
        });
    }
}(jQuery));

(function($){
    $.fn.viewEmpTimeData = function(){
        var $obj = this;
        var data = {
            code:$obj.attr('data--code'),
            from:$obj.attr('data--from'),
            to:$obj.attr('data--to'),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            jom.modal('show','<div>'+output+'</div>');
        });
    }
}(jQuery));

(function($){
    $.fn.finalizeTimeDataEach = function(){
        var $obj = $('tr[data--code][data--finalize="1"]:eq(0)');
        if($('progress#progFinalize').length == 0){
            $('.summary-container:contains("Officers")').prepend('<progress id="progFinalize" class="progress full-width" max="'+$('tr[data--code][data--finalize="1"]').length+'" value="0">');
        }
        var $prog = $('progress#progFinalize');
        if($obj.length > 0){
            var data = {
                code:$obj.attr('data--code'),
                from:$obj.attr('data--from'),
                to:$obj.attr('data--to'),
            }
            
            $.post(jom.url+'bio/finalizeTimeDataEach',{data:data},function(output){
                if(output.match(/success/ig) != null){
                    $obj.attr('data--finalize',0);
                    $obj.addClass('bg-success bg-deep');
                    $prog.val($prog.val()+1);
                    console.log(output);
                    $().finalizeTimeDataEach();
                }else{
                    console.log(output);
                    alert('ERROR!');
                }
            });
        }else{
            alert('All data is already finalized.');
            if($('progress#progFinalize').val() == $('progress#progFinalize').attr('max')){
                $('[data--module="finalizeTimeData"]').remove();
            }
        }
    }
}(jQuery));

(function($){
    $.fn.finalizeTimeData = function(){
        var $obj = this;
        if($obj.is('tr')){
            var data = {
                code:$obj.attr('data--code'),
                from:$obj.attr('data--from'),
                to:$obj.attr('data--to'),
            }
            $.post(jom.url+'bio/finalizeTimeDataEach',{data:data},function(output){
                if(output.match(/success/ig) != null){
                    $obj.addClass('success');
                    $obj.attr('data--finalize','1');
                    $obj.closest('.summary-container').find('progress').val($obj.closest('.summary-container').find('tr[data--finalize="1"]').length);
                    // RECURSIVE CALL
                    $obj.closest('.summary-container').find('tr[data--finalize="0"]:first').finalizeTimeData();
                }else{
                    console.log(output);
                    alert('ERROR!');
                }
            });
        }else{
            $obj.closest('.summary-container').find('tr[data--finalize="0"]:first').finalizeTimeData();
        }

        // var $obj = this;
            
        // if($('[data--finalize="1"]').length == 0){
        //     alert('Please select a group to be finalized.');
        // }else if($obj.is('form')){
        //     var data = {
        //         form:$obj.serializeArray(),
        //     }
        //     jom.modal('close');
        //     $('.panel-right>div').animate({
        //         scrollTop: $('.summary-container:contains("Officers")').offset().top
        //     }, 500);
        //     $().finalizeTimeDataEach();
        // }else{
        //     var data = {
        //         from:$obj.attr('data--payroll-from'),
        //         to:$obj.attr('data--payroll-to'),
        //     }
        //     jom.modal('open',jom.loading);
        //     $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
        //         jom.modal('show','<div>'+output+'</div>');
        //     });
        // }
    };
}(jQuery));

(function($){
    $.fn.changePayrollPeriod = function(){
        var $obj = this;
        var data = {
            date:$('#dTo').text(),
            type:$obj.attr('data--change-type'),
        };
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $('#dFrom').text(output.from);
            $('#dTo').text(output.to);
        },'json');
    }
}(jQuery));

(function($){
    $.fn.printTimeData = function(){
        var $obj = this;
        var data = {
            //html:$('table[data--timedata-summary="1"]').parent().html(),
            // html:$('table[data--timedata-summary="1"]').map(function(){
            //     return $(this).parent().html()
            // }).get(),
            from:$('#dFrom').text(),
            to:$('#dTo').text(),
            win:window.open(),
            info:{},
            type:$('table[data--timedata-summary="1"]').attr('data--print-type'),
            // tk:$('#tk-sched').text(),
            tk:`${$('[data--module="getTimeData"]').closest('form').find('[name="dateFrom"]').val()} to ${$('[data--module="getTimeData"]').closest('form').find('[name="dateTo"]').val()}`,
        };

        var late = {
            daily:0,
            total:0,
        };
        var undertime = {
            daily:0,
            total:0,
        };
        data.win.document.title = 'UERM Time Data Summary: '+data.from+' - '+data.to;

        if($('.summary-container').length > 0){
            $('.summary-container').find('table').each(function(){
                var str = $(this).parent().html();
                $(data.win.document.body).append(`<section>
                    <h3>${$(this).attr('data--summary-type')}</h3>
                    <div>${str}</div>
                </section>`);
            });
        }else{
            var str = $('[data--print-type="view dtr"]').parent().html();
            $(data.win.document.body).append(`<section>
                <h3>View DTR</h3>
                <div>${str}</div>
            </section>`);
        }
        // $(data.win.document.body).html(`<div>
        //     <section>
        //         <h3>Faculty</h3>
        //         ${data.html[0]}
        //     </section>
        //     <section>
        //         <h3>Rank and File</h3>
        //         ${data.html[1]}
        //     </section>
        //     <section>
        //         <h3>Management</h3>
        //         ${data.html[2]}
        //     </section>
        // </div>`);
        $(data.win.document.body).find('table,td,th').css({
            'border':'solid .5px #000',
        });
        $(data.win.document.body).find('table').css({
            'border-spacing':'0',
            'border-collapse':'collapse',
            'width':'100%',
        });
        $(data.win.document.body).find('a').remove(); // Remove links
        // Change 0 to space
        $(data.win.document.body).find('td').each(function(){
            if($(this).text().trim() == '0'){
                $(this).html('');
            }
        });
        if(data.type == 'summaryPrint'){
            $(data.win.document.body).find('table tr').each(function(){
                var ctr = 0;
                $(this).find('td').each(function(){
                    if($(this).text().trim() == ''){
                        ctr++;
                    }
                });
                console.log($(this),ctr);
                if(ctr == 12){
                    $(this).remove();
                }
            });

            $(data.win.document.body).prepend(`<div>
                <div style="text-align:center">
                    <img src="${jom.url}images/logo/UERM_LOGOS_SMALL_UERM BW.png" style="width:80px;margin-bottom:8px" >
                    <div>UNIVERSITY OF THE EAST</div>
                    <div>RAMON MAGSAYSAY MEMORIAL MEDICAL CENTER, INC.</div>
                    <div>64 Aurora Boulevard, Barangay Doña Imelda,</div>
                    <div>Quezon City, 1113 Philippines</div>
                    <div>Tel.# 8-715-0861 loc. 364</div>
                </div>
                <div>Cut-Off Period: ${data.tk}</div>
            </div>`);
        }else{
            if($(data.win.document.body).find('table:eq(0) tbody tr').length == 0){
                $(data.win.document.body).find('table:eq(0)').remove();
            }
    
            $(data.win.document.body).find('table[data--timedata-summary="1"]').find('td,th').each(function(){
                // Remove employee info (name,code,dept,pos)
                if($(this).index() <= 3){
                    if($(this).is('td') && $(this).index() == 0){
                        data.info.code = $(this).text();
                    }else if($(this).is('td') && $(this).index() == 1){
                        data.info.name = $(this).text();
                    }else if($(this).is('td') && $(this).index() == 2){
                        data.info.department = $(this).text();
                    }else if($(this).is('td') && $(this).index() == 3){
                        data.info.position = $(this).text();
                    }
    
                    $(this).addClass('hidden-print');
                }
            });

            // MAKE CONTENT EDITABLE CELLS
            $(data.win.document.body).find('table[data--timedata-summary="1"]').find('td').each(function(){
                $(this).attr('contenteditable','true');
            });
    
            // COMPUTE LATE
            $(data.win.document.body).find('table[data--timedata-summary="1"]').find('td').each(function(){
                if($(this).index() == 11 && $(this).text() != ''){
                    var val = parseFloat($(this).text());
    
                    late.total+= val;
    
                    if(val > 15){
                        late.daily+= val;
                    }
                }
            });
    
            if(late.total > 75){
                $(data.win.document.body).find('table[data--timedata-summary="1"]').find('tfoot t:eq(11)').html(late.total);
            }else{
                $(data.win.document.body).find('table[data--timedata-summary="1"]').find('tfoot th:eq(11)').html(late.daily);
            }
    
            // COMPUTE UNDERTIME
            $(data.win.document.body).find('table[data--timedata-summary="1"]').find('td').each(function(){
                if($(this).index() == 13 && $(this).text() != ''){
                    var val = parseFloat($(this).text());
    
                    undertime.total+= val;
    
                    if(val > 15){
                        undertime.daily+= val;
                    }
                }
            });
    
            // CENTER NUMBERS
            $(data.win.document.body).find('table[data--timedata-summary="1"]').find('td').each(function(){
                if($(this).index() >= 7){
                    $(this).css({
                        'text-align':'center',
                    });
                }
            });
    
            // ADD TOTAL
            $(data.win.document.body).find('table[data--timedata-summary="1"]').find('tfoot th:eq(4)').html('Total');
    
            if(undertime.total > 75){
                $(data.win.document.body).find('table[data--timedata-summary="1"]').find('tfoot th:eq(13)').html(undertime.total);
            }else{
                $(data.win.document.body).find('table[data--timedata-summary="1"]').find('tfoot th:eq(13)').html(undertime.daily);
            }
    
            $(data.win.document.body).find('.hidden-print').remove();
            $(data.win.document.body).prepend(`<style>
                body,table,td,th,.label{
                    font-size:12px !important;
                }
            </style>`);
            $(data.win.document.body).prepend(`<div>
                <div style="text-align:center">
                    <img src="${jom.url}images/logo/UERM_LOGOS_SMALL_UERM BW.png" style="width:80px;margin-bottom:8px" >
                    <div>UNIVERSITY OF THE EAST</div>
                    <div>RAMON MAGSAYSAY MEMORIAL MEDICAL CENTER, INC.</div>
                    <div>64 Aurora Boulevard, Barangay Doña Imelda,</div>
                    <div>Quezon City, 1113 Philippines</div>
                    <div>Tel.# 715 0861 loc. 364</div>
                </div>
                <div>Timekeeping Schedule: ${data.tk}</div>
                <h2>${data.info.code} - ${data.info.name}</h2>
                <div>${data.info.department} - ${data.info.position}</div>
            </div>`);
        }
    }
}(jQuery));

(function($){
    $.fn.saveTimeData = function(){
        var $obj = $('tr[data--timedata][tag-timedata-save="1"]:eq(0)');
        if($obj.length > 0){
            if($('.modal:visible').length == 0){
                jom.modal('open',jom.loading);
                $('#progEmp').parent().clone().prependTo('.modal');
                $('#progEmp:first').parent().remove();
                $('#progEmp').attr('max',$('tr[data--timedata]').length);
            }
            /*$obj.each(function(){
                $(this).find(':input').each(function(){
                    if($(this).val() == '' || $(this).val() == '0'){
                        $(this).attr('data--no-val','1');
                    }
                });
                if($(this).find(':input').length == $(this).find(':input[data--no-val="1"]').length){
                    $('tr[data--emp-code="'+$(this).attr('data--timedata')+'"]').remove();
                    $(this).remove();
                }
                console.log($(this).attr('data--timedata'));
            });*/
            $timeData = $obj;
            var data = {
                code:$timeData.attr('data--timedata'),
                AbsencesDay:$timeData.find('[name="AbsencesDay"]').val(),
                AbsencesHour:$timeData.find('[name="AbsencesHour"]').val(),
                Late:$timeData.find('[name="Late"]').val(),
                Undertime:$timeData.find('[name="Undertime"]').val(),
                DiffPM:$timeData.find('[name="DiffPM"]').val(),
                DiffAM:$timeData.find('[name="DiffAM"]').val(),
                OT35:$timeData.find('[name="OT35"]').val(),
                OT100:$timeData.find('[name="OT100"]').val(),
                OT130:$timeData.find('[name="OT130"]').val(),
                OT135:$timeData.find('[name="OT135"]').val(),
                Note:$timeData.find('[name="Note"]').val(),
                dateFrom:$('#dFrom').text(),
                dateTo:$('#dTo').text(),
                TimedataFrom:$('[name="dateFrom"]').val(),
                TimedataTo:$('[name="dateTo"]').val(),
                Refund:$timeData.find('[name="Refund"]').val(),
            }
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#progEmp').val($('#progEmp').val()+1);
                //jom.modal('show','<div>'+output+'</div>');
                $('.modal .fa.fa-spin.fa-spinner').parent().remove();
                $('tr[data--emp-code="'+$timeData.attr('data--timedata')+'"]').remove();
                $timeData.remove();
                $('tr[data--emp-code="'+data.code+'"]').remove();
                console.log(output);
                if(output.match(/success/ig) != null){
                    //$('#timeDataOutput').append($("<div>").load(jom.url+'bio/timeDataSuccess/'+data.code));
                    $('.modal').append($("<div class='pull-left'>").load(jom.url+'bio/timeDataSuccess/'+data.code));
                }else{
                    //$('#timeDataOutput').append($("<div>").load(jom.url+'bio/timeDataSuccess/'+data.code+'/0'));
                    $('.modal').append($("<div class='pull-left'>").load(jom.url+'bio/timeDataSuccess/'+data.code+'/0'));
                }
                $().saveTimeData();
            });
        }else{
            alert('Please tag the employees for time data saving to continue.');
            // $('[data--timedata-table]').remove();
            // $('[data--module="saveTimeData"]').remove();
            // $('[data--module="getTimeData"]').getTimeData();
        }
    }
}(jQuery));

(function($){
    $.fn.sendSms = function(){
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
    $.fn.msgEmp = function(){
        var $obj = this;
        var data = {
            code:$obj.attr('data--emp-code'),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            jom.modal('show','<div>'+output+'</div>');
        });
    }
}(jQuery));

(function($){
    $.fn.getTimeData = function($param){
        $param = $param == undefined ? {loading:true} : $param;
        
        var $obj = this;
        var data = {
            dept:$obj.closest('.panel').find('[name="dept"]').val(),
            type:$obj.closest('.panel').find('[name="type"]').val(),
            absences:$obj.closest('.panel').find('[name="absences"]').val(),
            dateFrom:$obj.closest('.panel').find('[name="dateFrom"]').val(),
            dateTo:$obj.closest('.panel').find('[name="dateTo"]').val(),
            code:$obj.closest('.panel').find('[name="code"]').val(),
            payrollFrom:$obj.closest('.panel').find('#dFrom').text(),
            payrollTo:$obj.closest('.panel').find('#dTo').text(),
            otFrom:$obj.closest('.panel').find('[name="otDateFrom"]').val(),
            otTo:$obj.closest('.panel').find('[name="otDateTo"]').val(),
            tardyFrom:$obj.closest('.panel').find('[name="tardinessFrom"]').val(),
            tardyTo:$obj.closest('.panel').find('[name="tardinessTo"]').val(),
            autocompute:$obj.closest('.panel').find('[name="autocompute"]').val(),
        };
        if($param.loading == true){
            $('#postOutput').html(jom.loading);
        }
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $('#postOutput').html(output);
            $('tr[data--timedata]').on('dblclick',function(){
                $(this).find('[data--module="tagTimeDataSave"]').tagTimeDataSave();
            });

            $('[data--timedata-table]').getMissingSched();
            if(data.autocompute != 'None'){
                $('#modal').html(`<div class="alert alert-info">Auto computing will start in <b id="act">3</b> secs.</div>`).modal({clickClose:false});
                setInterval(function(){
                    var ctr = parseInt($('#act').text());

                    if(ctr == 1){
                        $('[data--module="compute_tardy_ot"]').compute_tardy_ot();
                    }else{
                        $('#act').text(ctr-1);
                    }
                },1000);
            }

            if(data.absences == 0){
                $('[name="AbsencesDay"],[name="AbsencesHour"]').val('0');
                $('[name="NoteAbsencesDay"],[name="NoteAbsencesHour"]').val('');
            }
        });
        /*var url = jom.url+$obj.attr('data--url')+'/'+data.dept+'/'+data.type+'/'+data.dateFrom+'/'+data.dateTo+'/'+data.payrollTo+'/'+data.payrollTo+'/'+data.code+'/';
        console.log(url);
        $('#postOutput').html(jom.loading);
        $('#postOutput').load(url);*/
    }
}(jQuery));

(function($){
    $.fn.removeBioId = function(){
        var $obj = this;
        var data = {
            id:$obj.attr('data--finger-id'),
            conf:confirm('Are you sure you want to delete biometric data?'),
        };
        jom.modal('open',jom.loading);
        if(data.conf == true){
            var $panel = $obj.closest('.panel');
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('li').remove();
                    if($panel.find('li').length == 0){
                        $panel.parent().remove();
                    }
                    jom.modal('close');
                }else{
                    jom.modal('show','<div>'+output+'</div>');
                }
            });
        }
    }
}(jQuery));

(function($){
    $.fn.toggleDtr = function(){
        var $obj = this;
        var data = {
            code:$obj.attr('data--emp-code'),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            console.log(output);
            if($obj.is('[data--is-unreg="1"]')){
                $obj.closest('.panel').parent().remove();
            }else{
                if($obj.is('.btn-success')){
                    $obj.switchClass('btn-success','btn-warning');
                }else{
                    $obj.switchClass('btn-warning','btn-success');
                }
            }
            jom.modal('close');
        });
    }
}(jQuery));

(function($){
    $.fn.toggleSkeletal = function(){
        var $obj = this;
        var data = {
            code:$obj.attr('data--emp-code'),
        };
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            console.log(output);
            if($obj.is('.btn-success')){
                $obj.switchClass('btn-success','btn-warning');
            }else{
                $obj.switchClass('btn-warning','btn-success');
            }
            jom.modal('close');
        });
    }
}(jQuery));

$(document).on('change','.summary-container :input:checkbox',function(){
    var $obj = $(this).closest('.summary-container');
    $obj.find('[data--finalize]').attr('data--finalize',+$(this).is(':checked'));
    // $('[data--officer="0"]').attr('data--finalize',+!+$('#chkOfficer').is(':checked'));
});

$(document).ready(function(){
    $(document).on('keyup','.remarks-dtr',function(){
        var $obj = $(this).closest('tr');
        var data = {
            AbsencesDay:{
                val:$obj.find('[name="NoteAbsencesDay"]').val(),
                pfx:'A:',
                sfx:';',
            },
            AbsencesHour:{
                val:$obj.find('[name="NoteAbsencesHour"]').val(),
                pfx:'A:',
                sfx:';',
            },
            Late:{
                val:$obj.find('[name="NoteLate"]').val(),
                pfx:'L:',
                sfx:';',
            },
            Undertime:{
                val:$obj.find('[name="NoteUndertime"]').val(),
                pfx:'U:',
                sfx:';',
            },
            DiffPM:{
                val:$obj.find('[name="NoteDiffPM"]').val(),
                pfx:'PM:',
                sfx:';',
            },
            DiffAM:{
                val:$obj.find('[name="NoteDiffAM"]').val(),
                pfx:'AM:',
                sfx:';',
            },
            OT35:{
                val:$obj.find('[name="NoteOT35"]').val(),
                pfx:'O35:',
                sfx:';',
            },
            OT100:{
                val:$obj.find('[name="NoteOT100"]').val(),
                pfx:'O100:',
                sfx:';',
            },
            OT130:{
                val:$obj.find('[name="NoteOT130"]').val(),
                pfx:'O130:',
                sfx:';',
            },
            OT135:{
                val:$obj.find('[name="NoteOT135"]').val(),
                pfx:'O135:',
                sfx:';',
            },
        };
        console.log(data);
        $.each(data,function(key,val){
            if(val.val.trim() != ''){
                // console.log(val);
                val.val = val.pfx+val.val+val.sfx;
            }
        });

        $obj.find('[name="Note"]').val(data.AbsencesDay.val+data.AbsencesHour.val+data.Late.val+data.Undertime.val+data.DiffPM.val+data.DiffAM.val+data.OT35.val+data.OT100.val+data.OT130.val+data.OT135.val);
    });
});