$(document).ready(function(){
    (function($){
        $.fn.searchReport = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
                type:$obj.find('[name="type"] option:selected').text()
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                $('.datatable').DataTable({
                    dom: 'Blfrtip',
                    buttons: [
                        'excelHtml5',
                        'copy'
                    ],
                    "lengthMenu":[[10,25,50,100,-1],[10,25,50,100,"All"]]
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.addUsageDrug = function(){
            var $obj = this;
            var $req = $(this).prev().clone();

            $req.find(':input').val('');
            $obj.prev().after($req);
        }
    }(jQuery));

    (function($){
        $.fn.checkSave = function($param){
            var $obj = this;
            if($param.addClass != undefined){
                $obj.addClass($param.addClass);
            }else if($param.checkClass != undefined){
                return $obj.is('.'+$param.checkClass);
            }
        }
    }(jQuery));

    (function($){
        $.fn.viewLabResult = function(){
            var $obj = this;
            var data = {
                caseno:$obj.attr('data--caseno'),
                patientno:$obj.attr('data--patientno'),
                type:$obj.attr('data--type'),
                dept:$obj.attr('data--dept'),
            };
            $obj.trOutput('show');
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.trOutput(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.fetchPatientLab = function(){
            var $obj = this;
            jom.modal('open',jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                jom.modal('show',output);
                
                $('div:contains("Patient Laboratories") tr td:nth-child(2)').each(function(){
                    if($(this).is(':contains("W")')){
                        console.log($(this));
                        $(this).closest('tr').hide();
                    }
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveSwitchInterventionForm = function(){
            var $obj = this;

            var ar = {};
            ar.antimicrobial = $('.antimicrobial').find(':input').map(function(){
                if($(this).prop('checked') == true){
                    return $(this).attr('name');
                }
            }).get();
            ar.stability = $('.stability').find(':input').map(function(){
                if($(this).prop('checked') == true){
                    return $(this).attr('name');
                }
            }).get();
            ar.tolerance = $('.tolerance').find(':input').map(function(){
                if($(this).prop('checked') == true){
                    return $(this).attr('name');
                }
            }).get();
            ar.switch = $('.switch').find(':input').map(function(){
                if($(this).prop('checked') == true){
                    return $(this).attr('name');
                }
            }).get();

            var data = {
                stability:ar.stability,
                tolerance:ar.tolerance,
                antimicrobial:ar.antimicrobial,
                switch:ar.switch,
                form:$obj.serializeArray(),
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                jom.modal('show',output);
                $obj.checkSave({addClass:'saved'});
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveStopOrderForm = function(){
            var $obj = this;
            var ar = [];
            $obj.find('table tbody tr').each(function(){
                if($(this).find(':input:not("button")').filter(function(){
                    return $(this).val() == "";
                }).length == 0){
                    ar.push($(this).find(':input').serializeArray());
                }
            });
            var data = {
                form:$obj.serializeArray(),
                history:ar,
            }
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                jom.modal('show',output);
                $obj.checkSave({addClass:'saved'});
                if(output.match(/success/) != null){
                    $('[data--form-type="switchIntervention"]').click();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.fetchConsultant = function(){
            var $obj = this;
            $.get(jom.url+$obj.attr('data--url'),function(output){
                var $select = $('[name="consultant"]');
                var html = '<option value="">- Select One -</option>';
                $select.val('');
                $.each(output.consultant,function(key,val){
                    console.log(val.clinician,val.drCode);
                    html+= '<option value="'+val.drCode+'">'+val.clinician+'</option>';
                    $select.html(html);
                });
            },'json');
        }
    }(jQuery));

    (function($){
        $.fn.saveUsageForm = function(){
            var $obj = this;

            var ar = {};
            var culture = [];

            $('.init-culture').each(function(key,val){
                if($(this).find(':input:not("button")').filter(function(){
                    return $(this).val() == "";
                }).length == 0){
                    culture.push($(this).find(':input').serializeArray());
                }
            });
            ar.illness = $('.illness').find(':input').map(function(){
                if($(this).prop('checked') == true){
                    return $(this).attr('name');
                }
            }).get();
            ar.infection = $('.infection-site').find(':input').map(function(){
                if($(this).prop('checked') == true){
                    return $(this).attr('name');
                }
            }).get();

            // GET ANTIBIOTIC REQUEST VALS
            var req = [];
            $obj.find('.antibiotic-request').each(function(){
                if($(this).find(':input:not("button")').filter(function(){
                    return $(this).val() == "";
                }).length == 0){
                    req.push($(this).find(':input').serializeArray());
                }
            });

            var data = {
                culture:culture,
                illness:ar.illness,
                infection:ar.infection,
                form:$obj.serializeArray(),
                request:req,
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                jom.modal('show',output);
                $obj.checkSave({addClass:'saved'});
                // if(output.match(/success/) != null){
                //     $('[data--form-type="stopOrder"]').click();
                // }
            });
        }
    }(jQuery));

    (function($){
        $.fn.setFormType = function(){
            var $obj = this;
            if($('.chkSave').checkSave({checkClass:'saved'})){
                $('.output-data').html(jom.loading);
                $.get(jom.url+$obj.attr('data--url'),function(output){
                    $('.output-data').html(output);
                    $('.output-data').initFields();
                });
            }else{
                var conf = confirm("This form is not yet saved, continue?");
                if(conf == true){
                    $('.chkSave').checkSave({addClass:'saved'});
                    $obj.setFormType();
                }
            }
        }
    }(jQuery));

    (function($){
        $.fn.setPhysician = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                jom.modal('show',output);
                if(window.opener != null){
                    window.opener.$('[data--module="fetchConsultant"]').click();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.setAntibiotic = function(){
            var $obj = this;
            var data = {
                itemCode:$obj.attr('data--item-code'),
                brandName:$obj.attr('data--brand-name'),
                genericName:$obj.attr('data--generic-name'),
            };
            var $form = $('form[data--form-id="saveUsageForm"]');
            jom.modal('close');
            $form.find('[name="antibiotic"]').val(data.itemCode);
            $form.find('#antibioticName').html(data.brandName+' - '+data.genericName);
            $form.find('[name="antibiotic"]').attr('title',data.brandName+' - '+data.genericName);
            console.log(data);
        }
    }(jQuery));

    (function($){
        $.fn.searchAntibioticUsageForm = function(){
            var $obj = this;
            jom.modal('open',jom.loading);
            $.get(jom.url+'antiStwd/antibiotic/list',function(output){
                jom.modal('show',output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.initFields = function(){
            var $obj = this;
            // HIDE CULTURE AND SENSITIVITY RESULT
            if($('[name="justification"]').val() != 'Definitive'){
                $obj.find('[name="justification"]').closest('label').next().hide();
            }
            // HIDE REVISE TO
            if($('[name="recommendation"]').val() != 'Revise to'){
                $obj.find('[name="recommendation"]').closest('label').next().hide();
            }
            // HIDE OTHER HOSPITAL
            if($('[name="otherHospital"]').val() == ''){
                $obj.find('[name="infectionType"]').closest('label').next().hide();
            }
            // HIDE STATUS
            if($('[name="status"]').val() == 'APPROVED'){
                $obj.find('[name="disapproveReason"]').closest('label').hide();
            }else if($('[name="status"]').val() == 'DISAPPROVED'){
                $obj.find('[name="daysApproved"]').closest('label').hide();
            }else{
                $obj.find('[name="daysApproved"]').closest('label').hide();
                $obj.find('[name="disapproveReason"]').closest('label').hide();
            }

            // TOGGLE AND INIT CULTURE AND SENSITIVITY RESULT
            $obj.find('[name="justification"]').on('change',function(){
                if($(this).val() == 'Definitive'){
                    $(this).closest('label').next().show();
                    $(this).closest('label').next().find(':input:not("button")').attr('required','required');
                }else{
                    $(this).closest('label').next().hide();
                    $(this).closest('label').next().find('.init-culture:gt(0)').remove();
                    $(this).closest('label').next().find('.init-culture :input:not("button")').val('');
                    $(this).closest('label').next().find(':input:not("button")').removeAttr('required');
                }
            });
            // TOGGLE AND INIT REVISE TO
            $obj.find('[name="recommendation"]').on('change',function(){
                if($(this).val() == 'Revise to'){
                    $(this).closest('label').next().show();
                    $(this).closest('label').next().find(':input:not("button")').attr('required','required');
                }else{
                    $(this).closest('label').next().hide();
                    $(this).closest('label').next().find(':input:not("button")').val('');
                    $(this).closest('label').next().find('#antibioticName').html('');
                    $(this).closest('label').next().find(':input:not("button")').removeAttr('required');
                }
            });
            // TOGGLE AND INIT OTHER HOSPITAL
            $obj.find('[name="infectionType"]').on('change',function(){
                if($(this).val() == 'Hospital Acquired (Other)'){
                    $(this).closest('label').next().show();
                    $(this).closest('label').next().find(':input:not("button")').attr('required','required');
                }else{
                    $(this).closest('label').next().hide();
                    $(this).closest('label').next().find(':input:not("button")').val('');
                    $(this).closest('label').next().find(':input:not("button")').removeAttr('required');
                }
            });
            // TOGGLE AND INIT STATUS
            $obj.find('[name="status"]').on('change',function(){
                if($(this).val() == 'APPROVED'){
                    $(this).closest('form').find('[name="daysApproved"]').closest('label').show();
                    $(this).closest('form').find('[name="disapproveReason"]').closest('label').hide();
                    $(this).closest('form').find('[name="disapproveReason"]').val('');
                    $(this).closest('form').find('[name="daysApproved"]').closest('label').find(':input:not("button")').attr('required','required');
                    $(this).closest('form').find('[name="disapproveReason"]').removeAttr('required');
                }else if($(this).val() == 'DISAPPROVED'){
                    $(this).closest('form').find('[name="daysApproved"]').closest('label').hide();
                    $(this).closest('form').find('[name="disapproveReason"]').closest('label').show();
                    $(this).closest('form').find('[name="daysApproved"]').val('');
                    $(this).closest('form').find('[name="disapproveReason"]').closest('label').find(':input:not("button")').attr('required','required');
                    $(this).closest('form').find('[name="daysApproved"]').removeAttr('required');
                }else{
                    $(this).closest('form').find('[name="daysApproved"]').closest('label').hide();
                    $(this).closest('form').find('[name="disapproveReason"]').closest('label').hide();
                    $(this).closest('form').find('[name="daysApproved"]').val('');
                    $(this).closest('form').find('[name="disapproveReason"]').val('');
                    $(this).closest('form').find('[name="daysApproved"]').removeAttr('required');
                    $(this).closest('form').find('[name="disapproveReason"]').removeAttr('required');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.removeBlankCulture = function(){
            var $obj = this;
            // console.log($obj);
            $obj.find(':input').on('keyup change',function(){
                if($obj.closest('tbody').find('tr').length > 1){
                    var del = 0;
                    $(this).closest('tr').find(':input').each(function(){
                        if($(this).val() == ''){
                            del+= 1;
                        }
                    });
                    if(del >= $(this).closest('tr').find(':input').length){
                        $(this).closest('tr').remove();
                    }
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.addCultureResult = function(){
            var $obj = this;
            var $clone = $obj.closest('tr').clone();
            $clone.find(':input').val('');
            $clone.removeBlankCulture();
            $obj.closest('tr').after($clone);
        }
    }(jQuery));

    (function($){
        $.fn.fetchAntiStwdData = function(){
            var $obj = this;
            var $container = $obj.closest('[class*="col"]');
            var data = {
                caseNo:$obj.is('select') ? $obj.val() : $obj.attr('data--caseno'),
            };
            $container.find('.output-data').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url')+'/'+data.caseNo,function(output){
                $container.find('.output-data').html(output);
                $('.init-culture').removeBlankCulture();
                $('.output-data').initFields();
            });
        }
    }(jQuery));

    (function($){
        $.fn.viewAntiStwdData = function(){
            var $obj = this;
            var $container = $obj.closest('[class*="col"]');
            $container.addClass('active');
            $container.find('.output-data').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $container.find('.output-data').html(output);

                $obj.closest('.row').find('[class*="col"]:not(".active")').slideUp(300,function(){
                    $(this).remove();
                    $container.attr('class','col-sm-12');
                });

                $('[name="setCaseNo"]').on('change',function(){
                    $(this).fetchAntiStwdData();
                });
            });
        }
    }(jQuery));

	(function($){
        $.fn.patientSearch = function(){
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