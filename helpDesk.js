$(document).ready(function(){
    (function($){
        $.fn.savePcsoAmt = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/ig) != null){
                    $obj.find(':input').val('');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.tagPcsoAmt = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveImap = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                jom.modal('show',output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.setImapTemplate = function(){
            var $obj = this;
            
            $obj.closest('form').find('[name="problem"]').val(atob($obj.attr('data--template-problem')));
            $obj.closest('form').find('[name="analysis"]').val(atob($obj.attr('data--template-analysis')));
            $obj.closest('form').find('[name="recommendation"]').val(atob($obj.attr('data--template-recommendation')));
        }
    }(jQuery));

    (function($){
        $.fn.searchImapPatients = function(){
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
        $.fn.imap = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchReport = function(){
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
        $.fn.pickupList = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.tagPatientApprovedAmt = function(){
            var $obj = this;
            var data = {
                patientId:$obj.attr('data--patient-id'),
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$(this).attr('data--url'),{data:data},function(output){
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').addClass('success');
                    jom.modal('close');
                }else{
                    jom.modal('show','<div>'+output+'</div>');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.viewApprovedAmt = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchAnalytics = function(){
            var $obj = this;
            var data = {
                from:$obj.find('[name="dateFrom"]').val(),
                to:$obj.find('[name="dateTo"]').val(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.get(jom.url+$obj.attr('data--url')+'/'+data.from+'/'+data.to,function(output){
                $obj.nextAll().remove();
                $obj.after(output);
            });
        }
    }(jQuery));

    (function ($){
        $.fn.tagTransmittal = function(){
            var $obj = this;
            var data = {
                transmittalNo:$obj.attr('data--transmittal-no')
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$(this).attr('data--url'),{data:data},function(output){
                jom.modal('show','<div>'+output+'</div>');
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchTransmittal = function(){
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
        $.fn.generateTransmittalNo = function(){
            var $obj = $('form[data--form-id="savePatientRequest"]');
            var ar = [];
            $obj.each(function(){
                if($(this).find('[name="requestNo"]').val() != '' && $(this).find('[name="hospBill"]').val() != ''){
                    ar.push($(this).serializeArray());
                }
            });
            var data = {
                data:ar,
            }
            jom.modal('open',jom.loading);
            $.post(jom.url+$(this).attr('data--url'),{data:data},function(output){
                jom.modal('show','<div>'+output+'</div>');
                if(output.match(/success/ig) != null){
                    $('[data--module="transmittal"]').transmittal();
                    // var win = window.open('');
                    // win.document.title = 'UERM PCSO HelpDesk';
                    // $.get(jom.url+'helpDesk/printTransmittal',function(output){
                    //     $(win.document.body).html(output);
                    // });
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveOR = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/ig) != null){
                    $obj.find(':input').val('');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.encodeOR = function(){
            $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.showAnalytics = function(){
            var $obj = this;
            var data = {
                val:$obj.attr('data--vals'),
            };
            console.log(JSON.parse(data.val));
            $obj.closest('.row').find('#graphContainer').html(data.val);
        }
    }(jQuery));

    (function($){
        $.fn.savePatientRequest = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.popUpMsg(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                $obj.popUpMsg(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.transmittal = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
                $('form[data--form-id="savePatientRequest"]').on('change',function(){
                    $(this).savePatientRequest();
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.assignPatientCase = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray()
            };
            $obj.popUpMsg(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                $obj.popUpMsg(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('.panel').parent().remove();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.floatingCases = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveGL = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/ig) != null){
                    $obj.find(':input').val('');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.approvePCSOPatient = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray()
            };
            $obj.popUpMsg(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                $obj.popUpMsg(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.pcsoApproval = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
                $('form[data--form-id="approvePCSOPatient"]').on('change',function(){
                    $(this).approvePCSOPatient();
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.encodeGL = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.tagDisapproveReq = function(){
            var $obj = this;
            if($obj.is('form')){
                var data = {
                    form:$obj.serializeArray(),
                };
                $obj.nextAll().remove();
                $obj.after(jom.loading);
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                    $('#patientList').refreshPatients();
                    $obj.nextAll().remove();
                    $obj.after(output);
                    if(output.match(/success/ig) != null){
                        $('#patientConsole').find(':input').val('');
                        $('#patientConsole').find('form').nextAll().remove();
                    }
                });
            }else{
                var data = {
                    controlNo:$obj.attr('data--control-no'),
                };
                jom.modal('open',jom.loading);
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                    $('#patientList').refreshPatients();
                    jom.modal('show','<div>'+output+'</div>');
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.tagCompleteReq = function(){
            var $obj = this;
            var data = {
                controlNo:$obj.attr('data--control-no'),
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                jom.modal('show','<div>'+output+'</div>');
                if(output.match(/success/ig) != null){
                    $('#patientConsole').find(':input').val('');
                    $('#patientConsole').find('form').nextAll().remove();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveRequirements = function(){
            var $obj = this;
            var data = {
                req:$obj.find('.list-group-item[data--req-type="req"].active').map(function(){
                    return $(this).attr('data--req-id');
                }).get(),
                res:$obj.find('.list-group-item[data--req-type="res"].active').map(function(){
                    return $(this).attr('data--req-id');
                }).get(),
                patientId:$obj.attr('data--patient-id'),
            }
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#patientList').refreshPatients();
                $obj.nextAll().remove();
                $obj.after(output);
                $('.panel-right>div').scrollTop($('[data--form-id="saveRequirements"]').next().position().top)
                if(output.match(/success/) != null){
                    var win = window.open('');
                    win.document.title = 'UERM PCSO HelpDesk';
                    $.get(jom.url+'helpDesk/printReq/'+data.patientId,function(output){
                        $(win.document.body).html(output);
                    });
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.accomplishReq = function(){
            var $obj = this;
            if($obj.is('form')){
                var data = {
                    form:$obj.serializeArray(),
                };
                $obj.nextAll().remove();
                $obj.after(jom.loading);
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                    $obj.nextAll().remove();
                    $obj.after(output);
                });
            }else{
                $('#patientConsole').html(jom.loading);
                $.get(jom.url+$obj.attr('data--url'),function(output){
                    $('#patientConsole').html(output);
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.patientReg = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#patientConsole').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.patientReq = function(){
            var $obj = this;
            $('#patientConsole').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url')+'/'+$obj.attr('data--patient-id'),function(output){
                $('#patientConsole').html(output);
                $('[data--form-id="saveRequirements"] .check-all').on('click',function(){
                    $(this).closest('h3').next().find('.list-group-item').toggleClass('active');
                });
                $('[data--form-id="saveRequirements"] .list-group-item').on('click',function(){
                    $(this).toggleClass('active');
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.refreshPatients = function(){
            var $obj = this;
            $.get(jom.url+'helpDesk/patientList',function(output){
                $obj.html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.registerPatient = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('#patientList').refreshPatients();
                $obj.find(':input').val('');
            });
        }
    }(jQuery));
});