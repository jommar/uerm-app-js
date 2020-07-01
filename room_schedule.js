$(document).ready(function(){
    (function($){
        $.fn.remove_sched_range = function(){
            var $obj = this;
            var data = {
                start:$obj.attr('data--start'),
                end:$obj.attr('data--end'),
                date:$obj.attr('data--date'),
                room:$obj.attr('data--room'),
                subject:$obj.attr('data--subject'),
                section:$obj.attr('data--section'),
                i_start:$obj.attr('data--index-start'),
                i_end:$obj.attr('data--index-end'),
            }
            $obj.find('.fa-remove').removeClass('fa-remove').addClass('fa-spinner fa-spin');
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.find('.fa-spinner').removeClass('fa-spinner fa-spin').addClass('fa-remove');
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('td').html('')
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.filter_building = function(){
            var $obj = this;
            var data = {
                bldg:$obj.attr('data--building'),
            };
            var $tbl  = $obj.closest('.panel-body').find('table');
            $tbl.find('tr').removeClass('hidden');
            if(data.bldg != 'all'){
                $tbl.find('tbody td[data--index="5"]').each(function(){
                    if($(this).text() != data.bldg){
                        var index = {
                            start:$(this).closest('tr').index(),
                            end:$(this).closest('tr').index() + parseInt($(this).attr('rowspan')) - 1,
                        }
    
                        console.log(index);
    
                        $(this).closest('tbody').find('tr').each(function(){
                            if($(this).index() >= index.start && $(this).index() <= index.end){
                                $(this).addClass('hidden');
                                // console.log($(this));
                            }
                        });
                    }else{
                        console.log($(this).text())
                    }
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.merge_cells = function(param){
            var $obj = this;
            if(!param){
                param = {};
                if(typeof param.randColor == 'undefined'){
                    param.randColor = false;
                }
            }
            var group = 0;
            $obj.find('th').each(function(){
                group++;
                var i = {
                    h:$(this).index(),
                };
                if($('[name="roomid"]').children(':selected').text() == 'All'){
                    colSkip = 1;
                }else{
                    colSkip = 0;
                }

                if(i.h != colSkip){
                    var str = '';
                    $obj.find('th').css({"text-align":"center"});
                    $obj.find('tbody tr td').each(function(){
                        $(this).css({"text-align":"center"});
                        if(param.randColor === true){
                            colors = ['warning','info','danger','success'];
                            color = colors[Math.floor(Math.random()*colors.length)];
                        }else{
                            if(i.h % 2 == 0){
                                color = 'warning';
                            }else{
                                color = 'info';
                            }
                        }
                        var room = $(this).closest('tr').find('td:eq(4)').text();
                        if(room != ''){
                            $(this).closest('tr').attr('data--room',room);
                        }

                        i.d = $(this).index();
                        if(i.d == i.h && $(this).text() != ''){
                            if(str == ''){
                                str = $(this).text();
                                $(this).attr('data--subj-sec',str);
                                $(this).attr('data--group',group);
                                $(this).addClass(color);
                            }else if(str == $(this).text()){
                                $(this).attr('data--subj-sec',str);
                                $(this).attr('data--group',group);
                                $(this).text('');
                                $(this).addClass(color);
                            }else{
                                // $(this).text('-');
                                group++;
                                $(this).attr('data--subj-sec',$(this).text());
                                $(this).attr('data--group',group);
                                $(this).addClass(color);
                                str = $(this).text();
                            }
                        }else if(i.d == i.h && ($(this).text() == '' || $(this).text() != str)){
                            str = '';
                            group++;
                        }
                    });
                }
            });

            $obj.find('[data--group]').each(function(){
                var groupNo = $(this).attr('data--group');
                var $grp = $obj.find('[data--group="'+groupNo+'"]');

                if($(this).text() != ''){
                    $(this).attr('data--rows',$grp.length);
                }
            });

            // MERGE CELLS
            $obj.find('[data--rows]').each(function(){
                $(this).attr('data--index',$(this).index());
                $(this).attr('rowspan',$(this).attr('data--rows'));
            });

            $obj.find('[data--group]').each(function(){
                if($(this).text() == ''){
                    $(this).remove();
                }
            });

            $obj.find('td[data--group]').each(function(){
                if($(this).text() != ''){
                    var timeIndex = {
                        start:parseInt($(this).closest('tr').index()),
                        end:$(this).closest('tr').index()+parseInt($(this).attr('rowspan'))-1,
                    }
                    var timeStr = {
                        start:$(`tr:eq(${timeIndex.start+1})`).find('td:first').text(),
                        end:$(`tr:eq(${timeIndex.end})`).find('td:first').text(),
                    }
                    // $(this).html(`
                    //     <div><b>${$(this).text()}</b></div>
                    //     <div>${timeStr.start.split('-')[0]} to ${timeStr.end.split('-')[1]}</div>
                    // `);
                    $(this).html(`<b>${$(this).text()}</b>`);
                    $(this).css({'border':'solid 2px  #000',"vertical-align":"middle"});
                    $(this).attr("title",`${$(this).closest('table').find('th:eq('+$(this).attr('data--index')+')').text()} - ${$(this).text()}`);
                }
            });

            $obj.find('th').each(function(){
                var str = $(this).text().split(' ');

                $(this).html(`<div>${str[0]}</div>`);
                if(str[1]){
                    $(this).append(`<div>${str[1]}</div>`)
                };
            });

            $obj.find('td').each(function(){
                if($(this).index() == 0){
                    $(this).attr('nowrap','nowrap')
                }
            });
            
            if(param.success){
                param.success();
            }
        }
    }(jQuery));

    (function($){
        $.fn.show_sched = function(){
            var $obj = this;
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(`${jom.url}${$obj.attr('data--url')}`,function(output){
                $('#modal').html(output).modal({clickClose:false});
                $('[name="building"]').populate_rooms();
            });
        }
    }(jQuery));

    (function($){
        $.fn.remove_sched = function(){
            var $obj = this;
            var conf = confirm('Delete schedule?');
            if(conf == true){
                $.get(jom.url+$obj.attr('data--url'),function(output){
                    console.log(output);
                    if(output.match(/success/) != null){
                        $(`[data--sched-id="${$obj.attr('data--schin')}"]`).remove();
                    }
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.view_calendar_details = function(){
            var $obj = this;
            var data = {
                $container:$obj.closest('div').find('.sd').clone(),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(`${jom.url}${$obj.attr('data--url')}`,function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.fetch_report = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            if($obj.find('[name="type"]').val() == 'calendar'){
                $obj.view_calendar();
            }else{
                $obj.nextAll().remove();
                $obj.after(jom.loading);
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                    $obj.nextAll().remove();
                    $obj.after(output);
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.view_sched_details = function(){
            var $obj = this;
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(`${jom.url}${$obj.attr('data--url')}`,function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.fetch_rooms = function(){
            var $obj = this;
            // console.log(jom.url+$obj.attr('data--url'));return;
            $obj.html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $obj.html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.update_room = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/) != null){
                    $('#rc').fetch_rooms();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.add_new_room = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/) != null){
                    $('#rc').fetch_rooms();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.manage_room = function(){
            var $obj = this;
            $('#sc').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#sc').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.view_calendar = function(){
            var $obj = this;
            var data = {
                start:$obj.find('[name="start"]').val(),
                end:$obj.find('[name="end"]').val(),
                roomid:$obj.find('[name="roomid"]').val(),
            };
            if(data.roomid == '%'){
                alert('Please select a room.');
            }else{
                $obj.nextAll().remove();
                $obj.after(jom.loading);
                $.get(`${jom.url}rooms/calendar/${data.roomid}/${data.start}/${data.end}`,function(output){
                    $obj.nextAll().remove();
                    $obj.after(output);

                    $('.sched-view').find('td').each(function(){
                        if($(this).index() > 0 && $(this).text() != ''){
                            var $date = $(this).closest('table').find(`th:eq(${$(this).index()})`).text();
                            var $time = $(this).closest('tr').find(`td:eq(0)`).text();
                            $(this).append(`<a href="#" data--module="view_sched_details" data--url="rooms/sched-detail/${btoa($date)}/${btoa($time)}/${btoa(data.roomid)}" class="full-width label label-primary"><b class="fa fa-cog"></b> Details</a>`)
                        }
                    });
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.populate_rooms = function(){
            var $obj = this;
            $obj.on('change',function(){
                $('[name="roomid"]').val('');
                $('[name="roomid"] option:not(".default")').hide();
                $('[name="roomid"] option').each(function(){
                    if($(this).attr('data--building') == $obj.val()){
                        $(this).show();
                    }
                });
            })
        }
    }(jQuery));

    (function($){
        $.fn.populate_subj = function(){
            var $obj = $(this).closest('#s-l');
            var data = {
                sem:$obj.find('[name="sem"]').val(),
                subject:$obj.find('[name="subject"]').val(),
                section:$obj.find('[name="section"]').val(),
            };
            console.log(data);
            $obj.find('[data--sem]').hide();
            $(this).closest('label').nextAll().find(':input').val('');
            $obj.find(`[name="section"] [data--sem="${data.sem}"]`).show();
            $obj.find(`[name="subject"] [data--sem="${data.sem}"][data--section="${data.section}"]`).show();

            // $obj.on('change',function(){
            //     var $select = $obj.closest('.row').find('[name="subject"]');
            //     $select.find('option:not(.default)').remove();
            //     if($obj.val() != 'other' && $obj.val() != ''){
            //         $('.subj').removeClass('hidden');
            //         $('.other').addClass('hidden');
            //         $('.other').val('');

            //         var $subj = JSON.parse(atob($('option:selected',$obj).attr('data--subj')));
            //         $subj.forEach(function(item){
            //             $select.append(`<option value="${item.subjectCode}">${item.subject}</option>`);
            //         });
            //     }else if($obj.val() == 'other'){
            //         $('.subj').addClass('hidden');
            //         $('.other').removeClass('hidden');
            //         $('.subj').val('');
            //     }
            // });
        }
    }(jQuery));

    (function($){
        $.fn.set_sched = function(){
            var $obj = this;
            var data = {
                section:$('#sc [name="section"]').val(),
                subject:$('#sc [name="subject"]').val(),
            }
            $.get(`${jom.url}${$obj.attr('data--url')}/${data.section}/${data.subject}`,function(output){
                $('#modal').html(output).modal({clickClose:false});
                // $('#modal [name="section"]').populate_subj();
            });
        }
    }(jQuery));

    (function($){
        $.fn.save_recurring_sched = function(){
            var $obj = $('[data--available="1"]:first')
            var data = {
                // section:$('#room_list [name="section"]').val(),
                // subject:$('#room_list [name="subject"]').val(),
                // other:$('#room_list [name="other"]').val(),
                section:$('[name="section"]').val(),
                subject:$('[name="subject"]').val(),
                other:$('[name="other"]').val(),
            }

            if($obj.length == 0){
                if($('#modal [data--form-id="search_sched"]').length > 0){
                    location.reload();
                }
                $('#modal').html(`<div class="alert alert-success">Transaction/s saved successfully.</div>`).modal({clickClose:false});
                $('[data--module="save_recurring_sched"]').remove();
            }else{
                $.get(`${jom.url}${$obj.attr('data--url')}/${data.section}/${data.subject}/${data.other}`,function(output){
                    if(output.match(/success/ig) != null){
                        $obj.attr('data--available','0');
                        $obj.removeClass('label-success').addClass('label-danger').text('RESERVED');
                        $obj.closest('.cc').css({
                            'background-color':'rgba(217,83,79,.35)'
                        });
                        $().save_recurring_sched();
                    }else{
                        $('#modal').html(output).modal({clickClose:false});
                    }
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.search_sched = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
                repeat:$obj.find('.rd').map(function(){
                    if($(this).is(':checked')){
                        return $(this).val();
                    }
                }).get().join(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('#s-l [name="sem"],#modal [name="sem"]').populate_subj();
                $('[name="other"]').on('keyup',function(e){
                    var len = $(this).val().length;
                    var max = $(this).attr('data--max');

                    if(len > parseInt(max)){
                        e.preventDefault();
                    }
                
                    console.log(len,max);
                })
            });
        }
    }(jQuery));

    (function($){
        $.fn.plot_sched = function(){
            var $obj = this;
            var data = {
                section:$('#modal [name="section"]').val(),
                subject:$('#modal [name="subject"]').val(),
            }
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(`${jom.url}${$obj.attr('data--url')}/${data.section}/${data.subject}`,function(output){
                $('#modal').html(output).modal({clickClose:false});
                var $cell = $(`.table-sched [data--date="${$obj.attr('data--date')}"][data--timeid="${$obj.attr('data--time')}"]`);
                $cell.addClass('danger');
                $cell.find('.res-c').html(`<div>${data.subject}<br>${data.section}</div>`);
                $cell.find('[data--module="set_sched"]').remove();
            });
        }
    }(jQuery));

    (function($){
        $.fn.show_room_schedule = function(){
            var $obj = this;
            var data = {
                from:$('[name="from"]').val(),
                to:$('[name="to"]').val(),
            };
            $('#sc').html(jom.loading);
            $.get(`${jom.url}${$obj.attr('data--url')}/${data.from}/${data.to}`,function(output){
                $('#sc').html(output);
                // $('#sc [name="section"]').populate_subj();
                $('#sc td.status').addClass('success');
                $('#sc td.status [data--reserved="1"]').each(function(){
                    $(this).closest('td').removeClass('success').addClass('danger');
                    $(this).closest('td').find('[data--module="set_sched"]').remove();
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.display_rooms = function(){
            var $obj = this;
            var data = {
                info:$obj.attr('data--rooms'),
                building:$obj.attr('data--building'),
            };
            $('#room_list').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#room_list').html(output);
            });
        }
    }(jQuery));

    $('.populate[name="building"]').populate_rooms();

    $('.chk-d').on('change',function(){
        var data = {
            from:$('.chk-d').eq(0).val(),
            to:$('.chk-d').eq(1).val(),
        }

        if(data.from == data.to){
            // same date
            var date = new Date(data.from);
            var wk = date.getDay();
            console.log(wk);

            $(`[name*="repeat_"]`).prop('checked',false);

            $(`[name="repeat_${wk+1}"]`).prop('checked',true);
        }
    });

    $('.change-cal[name="month"]').on('change',function(){
        location.href = jom.url+'rooms/calendar/'+$(this).val();
    });

    $('[data--form-id="fetch_report"] [name="type"]').on('change',function(){
        var $obj = $(this),
            val = $(this).val();
        if(val == 'sched'){
            $obj.closest('form').find('[name="week"]').closest('label').removeClass('hidden').attr('required','required');
            $obj.closest('form').find('[name="start"],[name="end"]').closest('label').addClass('hidden').removeAttr('required');

            $obj.closest('form').find('[name="start"],[name="end"]').removeClass('hidden').removeAttr('required');
            $obj.closest('form').find('[name="week"]').attr('required','required');
        }else{
            $obj.closest('form').find('[name="week"]').closest('label').addClass('hidden').removeAttr('required');
            $obj.closest('form').find('[name="start"],[name="end"]').closest('label').removeClass('hidden');

            $obj.closest('form').find('[name="start"],[name="end"]').attr('required','required');
            $obj.closest('form').find('[name="week"]').removeAttr('required');
        }

        $obj.closest('form').find('[name="week"]').on('change',function(){
            var wk = $(this).val();
            var split = wk.split('-');
            var date = {
                year:split[0],
                wk:split[1],
            }
            date.wk = date.wk.replace('W','');

            var d = (date.wk-1)*7;
            var start = new Date(date.year,0,d);
            var end = new Date(date.year,0,d+6);

            console.log(start,end);

            var val = {
                start:start.getFullYear()+'-'+('00'+(start.getMonth()+1)).substr(-2)+'-'+('00'+start.getDate()).substr(-2),
                end:end.getFullYear()+'-'+('00'+(end.getMonth()+1)).substr(-2)+'-'+('00'+end.getDate()).substr(-2),
            }
            $(this).closest('form').find('[name="start"]').val(val.start);
            $(this).closest('form').find('[name="end"]').val(val.end);
        })
    });

    $(document).on('change','[name="sem"],[name="section"]',function(){
        $(this).populate_subj();
    })
});

function selectElementContents(el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
        range.execCommand("Copy");
    }
    document.execCommand("copy");
    alert(`Table is now copied. Please paste the contents on excel.`);
}