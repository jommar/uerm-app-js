$(document).ready(function(){
    (function($){
        $.fn.search_memos = function(){
            var $obj = this;
            var data = {
                memo:$obj.find('[name="memoTitle"]').val(),
            };
            location.href = `${jom.url}hr/memo/${data.memo}`;
        }
    }(jQuery));

    (function($){
        $.fn.upd_position_desc = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(`${$obj.attr('data--url')}`,{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                $('[data--form-id="filter_position"]').filter_position();
            });
        }
    }(jQuery));

    (function($){
        $.fn.blank_date = function(){
            var $obj = this;
            $obj.closest('label').find(':input').val('0001-01-01');
        }
    }(jQuery));

    (function($){
        $.fn.save_new_position = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $('.emp-pos').html(jom.loading);
            $.post(`${$obj.attr('data--url')}`,{data:data},function(output){
                $('.emp-pos').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.filter_position = function(){
            var $obj = this;
            var data = {
                position:$obj.find('[name="position"]').val(),
            };
            $('.emp-pos').html(jom.loading);
            $.get(`${$obj.attr('data--url')}${data.position}`,function(output){
                $('.emp-pos').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.search_emp_dtr_details = function(){
            var $obj = this;
            var data = {
                from:$obj.find('[name="dtrFrom"]').val(),
                to:$obj.find('[name="dtrTo"]').val(),
                type:$obj.find('[name="type"]').val(),
            };
            location.href = `${$obj.attr('data--url')}${data.from}/${data.to}/${data.type}`;
        }
    }(jQuery));

    (function($){
        $.fn.search_slwop = function(){
            var $obj = this;
            var data = {
                from:$obj.find('[name="from"]').val(),
                to:$obj.find('[name="to"]').val(),
            };
            location.href = `${$obj.attr('data--url')}${data.from}/${data.to}`;
        }
    }(jQuery));

    (function($){
        $.fn.filter_emps = function(){
            var $obj = this;
            var data = {
                filter:$obj.attr('data--filter'),
            };
            $obj.switchClass('btn-default','btn-primary');
            $obj.siblings(':not(.btn-success)').switchClass('btn-primary','btn-default');
            $('.table-dtr tbody tr').show();
            switch(data.filter){
                case 'perfect':
                    $('.table-dtr tbody tr').filter(function(){
                        if(parseInt($(this).find('td').eq(8).text()) == 0){
                            return false;
                        }else{
                            return true;
                        }
                    }).hide();
                    break;
                case 'absent':
                    $('.table-dtr tbody tr').filter(function(){
                        if(parseInt($(this).find('td').eq(8).text()) > 0){
                            return false;
                        }else{
                            return true;
                        }
                    }).hide();
                    break;
                case 'undertime':
                    $('.table-dtr tbody tr').filter(function(){
                        if(parseInt($(this).find('td').eq(7).text()) == 0){
                            return true;
                        }else{
                            return false;
                        }
                    }).hide();
                    break;
                case 'late':
                    $('.table-dtr tbody tr').filter(function(){
                        if(parseInt($(this).find('td').eq(4).text()) <= 75){
                            return true;
                        }else{
                            return false;
                        }
                    }).hide();
                    break;
            }
        }
    }(jQuery));

    (function($){
        $.fn.download_dtr_summary = function(){
            var $obj = this;
            var data = {
                month:$('[data--form-id="set_dtr_report"] [name="month"]').val(),
            }
            window.open(`${jom.url}hr/dtr_report/${data.month}/1`);
        }
    }(jQuery));

    (function($){
        $.fn.generate_dtr_summary = function(){
            var $obj = this;
            var data = {
                month:$obj.closest('form').find('[name="month"]').val()
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(`${jom.url}hr/generate-summary/`,{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.view_emp_dtr = function(){
            var $obj = this;
            var data = {
                month:$obj.attr('data--month'),
                code:$obj.attr('data--code'),
            };
            window.open(`${jom.url}hr/view-dtr/${data.code}/${data.month}`);
        }
    }(jQuery));

    (function($){
        $.fn.set_dtr_report = function(){
            var $obj = this;
            var data = {
                url:'hr/dtr-report/'+btoa(JSON.stringify($obj.serializeArray())),
            };
            location.href = jom.url+data.url;
        }
    }(jQuery));

    (function($){
        $.fn.set_multiple_class = function(){
            var $obj = this;
            var data = {
                class:$obj.attr('data--class'),
                id:$obj.attr('data--id'),
            };
            $obj.closest('.list-group').nextAll().remove();
            $obj.closest('.list-group').after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.closest('.list-group').nextAll().remove();
                $obj.closest('.list-group').after(output);

                $('[data--module="serviceRecord"]').serviceRecord();
            });
        }
    }(jQuery));

    (function($){
        $.fn.update_multiple_class = function(){
            var $obj = this;
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.save_calendar = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                location.reload();
            });
        }
    }(jQuery));

    (function($){
        $.fn.add_calendar = function(){
            var $obj = this;
            var data = {
                url:$obj.attr('data--url'),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(jom.url+data.url,function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.remove_emp_waive = function(){
            var $obj = this;
            $.get(jom.url+$obj.attr('data--url'),function(output){
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
                console.log(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.save_waive = function(){
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
                    location.reload();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.set_leave_ot_report = function(){
            var $obj = this;
            var data = {
                url:'hr/leave-ot-report/'+btoa(JSON.stringify($obj.serializeArray())),
            };
            location.href = jom.url+data.url;
        }
    }(jQuery));

    (function($){
        $.fn.set_ot = function(){
            var $obj = this;
            var data = {
                url:'hr/accepted-overtime/'+btoa(JSON.stringify($obj.serializeArray())),
            };
            location.href = jom.url+data.url;
        }
    }(jQuery));

    (function($){
        $.fn.set_oc_list = function(){
            var $obj = this;
            if($obj.attr('data--type') == 'a-emps'){
                $('#a-emps').show();
                $('#nooc-emps').hide();
            }else{
                $('#a-emps').hide();
                $('#nooc-emps').show();
            }
        }
    }(jQuery));

    (function($){
        $.fn.save_oc = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('[data--head="1"]').assign_oc();
            });
        }
    }(jQuery));

    (function($){
        $.fn.remove_oc = function(){
            var $obj = this;
            var data = {
                url:$obj.attr('data--url'),
            };
            $.get(jom.url+$obj.attr('data--url'),function(output){
                if(output.match(/success/ig) != null){
                    $obj.parent().remove();
                }else{
                    console.log(output);
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.assign_oc = function(){
            var $obj = this;
            var data = {
                url:$obj.attr('data--url'),
            };
            $('#oc-c').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#oc-c').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.print_201 = function(){
            var $obj = this;
            var data = {
                form:$obj.closest('.container-fluid').find('.rec-info').attr('data--type'),
                code:$obj.attr('data--code')
            };
            var url = jom.url+'hr/print-201/all/'+data.code;
            window.open(url);
        }
    }(jQuery));

    (function($){
        $.fn.print_service_record = function(){
            var $obj = this;
            var data = {
                form:$obj.closest('.container-fluid').find('.nav.nav-tabs').find('.active [data--module="show_info"]').attr('data--type'),
                code:$obj.attr('data--code')
            };
            var url = jom.url+'hr/print-201/Service Record/'+data.code;
            window.open(url);
        }
    }(jQuery));

    (function($){
        $.fn.show_info = function(){
            var $obj = this;
            var data = {
                type:$obj.attr('data--type')
            };
            $obj.closest('li').addClass('active');
            $obj.closest('li').siblings().removeClass('active');
            $('.rec-info').hide();
            $('.rec-info[data--type="'+data.type+'"]').show();
        }
    }(jQuery));

    (function($){
        $.fn.view_emp_records = function(){
            var $obj = this;
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.show_update_record = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
            }
            var $clone = $(`#u-c [data--u-id="${data.id}"]`).clone();
            $('#modal').html(jom.loading).html($clone).modal({clickClose:false});
        }
    }(jQuery));

    (function($){
        $.fn.load_recent_emps = function(){
            var $obj = this;
            $('.recent-emps').html(jom.loading);
            $.get(jom.url+'hr/recent-emps',function(output){
                $('.recent-emps').html(output);
            });
        }
    }(jQuery));

    // (function($){
    //     $.fn.show_recent_emps = function(){
    //         var $obj = $('[data--module="update_emp_info"]');
    //         $obj.closest('.list-group').find('.list-group-item').show();
    //         $('[data--module="show_recent_emps"]').remove();
    //     }
    // }(jQuery));

    (function($){
        $.fn.update_emp_info = function(){
            var $obj = this;
            $('.body').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('.body').html(output);
                $('[data--module="show_recent_emps"]').remove();
                $obj.closest('.list-group-item').siblings().hide();
                $obj.closest('.list-group-item').append(`<a href="${jom.url}hr/add-emp"><b class="fa fa-search"></b> View All</a>`)
            });
        }
    }(jQuery));

    (function($){
        $.fn.update_honorarium = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                val:$obj.attr('data--val'),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(data);
                if(output.match(/success/ig) != null){
                    $obj.parent().find('.label').removeClass('label-success label-danger');
                    if(data.val == 1){
                        $obj.parent().find('[data--val="1"]').addClass('label-success');
                        $obj.parent().find('[data--val="0"]').addClass('label-default');
                    }else{
                        $obj.parent().find('[data--val="0"]').addClass('label-danger');
                        $obj.parent().find('[data--val="1"]').addClass('label-default');
                    };
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.add_new_employee = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.recent-emps').load_recent_emps();
                // if(output.match(/success/ig) != null){
                //     var empcode = $('form[data--form-id="add_new_employee"]').next('.alert').text().split(' ');
                //     $('').personnelInfo();
                // }
            });
        }
    }(jQuery));

    (function($){
        $.fn.setOrgChart = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});

                if(output.match(/success/ig) != null){
                    location.href = jom.url;
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.deleteLeave = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--leave-id'),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.acceptLeave = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--leave-id'),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

	(function($){
		$.fn.getLeaveLedger = function(){
			var $obj = this;
			var data = {
                code:$obj.find('[name="code"]').val(),
                rand:Math.random().toString(36).substr(2, 5),
			};

            var url = jom.url+$obj.attr('data--url')+data.rand+btoa(btoa(data.code));

            location.href = url;
		}
    }(jQuery));

    (function($){
        $.fn.addLeaveCredits = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                $obj[0].reset();
                location.reload();
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveLeaveEmp = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $obj.next()[0].scrollIntoView();
            });
        }
    }(jQuery));   

    // (function($){
    //     $.fn.saveLeaveEmp = function(){
    //         $obj = $('[data--form-id="saveLeaveEmp"]:eq(0)');
    //         if($obj.length > 0){
    //             $obj.find('.output').html('');
    //             var data = {
    //                 form:$obj.serializeArray(),
    //             }
    //             $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
    //                 if(output.match(/success/ig) != null){
    //                     console.log(output);
    //                     $obj.remove();
    //                     $().saveLeaveEmp();
    //                 }else{
    //                     $obj.find('.output').html(output);
    //                     alert('There was a problem processing your leave!');
    //                 }
    //             });
    //         }else{
    //             $('#modal').find('.close-modal').click();
    //             $('#modal').html('');
    //             alert('Leave posting success');
    //         }
    //     }
    // }(jQuery));

    (function($){
        $.fn.removeLeaveDate = function(){
            $obj = this;

            $obj.closest('.row').remove();
            if($('#modal').find('form').length == 0){
                $('#modal').find('.close-modal').click();
                $('#modal').html('');
            }
        }
    }(jQuery));

    (function($){
        $.fn.computeLeavePosting = function(){
            var $obj = this;
            var data ={
                form:$obj.closest('form').serializeArray(),
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.viewLeaveDetail = function(){
            var $obj = this;
            var $container = $obj.closest('.list-group-item').find('.leave-details');
            var data = {
                year:$obj.attr('data--year'),
                type:$obj.attr('data--leave-type'),
                code:$obj.attr('data--code'),
            };
            $container.html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $container.html(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $container.offset().top,
                }, 500);
            });
        }
    }(jQuery));

    (function($){
        $.fn.leaveMgt = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('[data--form-id="searchEmp"]').nextAll().remove();
            $('.body').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('.body').html(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $('.body').offset().top,
                }, 500);
                // $('.panel-right>div:first-child')
                    /*
                        <div class="panel-right">
                            <div>
                                <div>FIRST</div>
                                <div>FIRSTSASD</div>
                            </div>
                            <div>SECOND</div>
                        </div>
                    */

                // $('.panel-right div:first-child')
            });
        }
    }(jQuery));

    (function($){
        $.fn.addServiceRecord = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
                if(output.match(/success/ig) != null){
                    $('[data--module="serviceRecord"]').serviceRecord();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.updateServiceRecord = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);

                $('[data--module="serviceRecord"]').serviceRecord();
            });
        }
    }(jQuery));
    
    (function($){
        $.fn.removeServiceRecord = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('form').parent().remove();
                    $('[data--module="serviceRecord"]').serviceRecord();
                    $('.close-modal').click();
                }
            });
        }
    }(jQuery));
    
    (function($){
        $.fn.serviceRecord = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('.body').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('.body').html(output);
            });
        }
    }(jQuery));
    
    (function($){
        $.fn.seminars = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('.body').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('.body').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.removeLicensure = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('form').parent().remove();
                    $('[data--module="licensures"]').licensures();
                    $('.close-modal').click();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.updateLicensure = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
                $('[data--module="licensures"]').licensures();
            });
        }
    }(jQuery));

    (function($){
        $.fn.addLicensure = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
                if(output.match(/success/ig) != null){
                    $('[data--module="licensures"]').licensures();
                }
            });
        }
    }(jQuery));
    
    (function($){
        $.fn.licensures = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('.body').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('.body').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.updateEducationInfo = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
                $('[data--module="educationalInfo"]').educationalInfo();
            });
        }
    }(jQuery));

    (function($){
        $.fn.addEducation = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
                if(output.match(/success/ig) != null){
                    $('[data--module="educationalInfo"]').educationalInfo();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.removeEducation = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('form').parent().remove();
                    $('[data--module="educationalInfo"]').educationalInfo();
                    $('.close-modal').click();
                }
            });
        }
    }(jQuery));
    
    (function($){
        $.fn.educationalInfo = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('.body').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('.body').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.removeFamily = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('form').parent().remove();
                    $('.close-modal').click();
                }
                $('[data--module="familyInfo"]').familyInfo();
            });
        }
    }(jQuery));

    (function($){
        $.fn.addFamilyMember = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
                if(output.match(/success/ig) != null){
                    $('[data--module="familyInfo"]').familyInfo();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.updateFamilyInfo = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
                $('[data--module="familyInfo"]').familyInfo();
            });
        }
    }(jQuery));
    
    (function($){
        $.fn.saveEmployeeData = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
            });
        }
    }(jQuery));
    
    (function($){
        $.fn.saveEmployeeData = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
            });
        }
    }(jQuery));

    (function($){
        $.fn.savePersonalInfo = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $obj.next().offset().top,
                }, 500);
            });
        }
    }(jQuery));

    (function($){
        $.fn.familyInfo = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('.body').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('.body').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.personnelInfo = function(){
            var $obj = this;
            var data = {
                code:$obj.attr('data--code'),
            };
            $('[data--form-id="searchEmp"]').nextAll().remove();
            $('.body').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('.body').html(output);
                $('.panel-right>div:first-child').animate({
                    scrollTop: $('.body').offset().top,
                }, 500);
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchEmp = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
                module:$obj.find('[name="module"]').val(),
            };
            $('.body').html('');
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                if(data.module != 'any' && $obj.next().find('.panel').length == 1){
                    switch(data.module){
                        case 'empInfo' : $('[data--module="personnelInfo"]').personnelInfo();break;
                        case 'leave' : $('[data--module="leaveMgt"]').leaveMgt();break;
                    }
                }
            });
        }
    }(jQuery));

    $(document).on('change', 'form[data--form-id="filter_position"] [name="position"]', function () {
        $label = $(this).closest('label');
        if ($label.next().is('.pos-code')){
            $label.next().find('.code').html($(this).children(':selected').attr('data--code'));
        } else {
            $label.after(`<div class="pos-code" style="margin-top:10px;margin-bottom:10px">
                <b>Position Code: </b>
                <div class="code">${$(this).children(':selected').attr('data--code')}</div>
            </div>`)
        }
    })

    console.log('HR System loaded successfully');
});