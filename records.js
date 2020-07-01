$(document).ready(function(){
    (function($){
        $.fn.set_phic_date = function(){
            var $obj = this;
            var data = {
                from:$obj.find('[name="dateFrom"]').val(),
                to:$obj.find('[name="dateTo"]').val(),
            };
            var json = JSON.stringify(data);
            // console.log(json);
            location.href = `${$obj.attr('data--url')}${btoa(json)}`;
        }
    }(jQuery));

    (function($){
        $.fn.check_icd = function(){
            var $obj = $('tbody tr[data--icd-check="0"]:first');
            var data = {
                caseno:$obj.attr('data--caseno'),
            };
            if($obj.length > 0){
                $.get(jom.url+$(this).attr('data--url')+'/'+data.caseno,function(output){
                    if(output.match(/error/ig) != null){
                        $obj.addClass('danger');
                        $obj.find('td:last').addClass('icd-error').html(output);
                    }else{
                        $obj.removeClass('danger');
                        $obj.find('.icd-error').remove();
                    }
                    $obj.attr('data--icd-check','1');
                    $('[data--module="check_icd"]').check_icd();
                });
            }else{
                $('[data--icd-check]').attr('data--icd-check','0');
                alert('All ICD data are checked.');
            }
        }
    }(jQuery));

    (function($){
        $.fn.search_report = function(){
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
		$.fn.change_date = function(){
            var $obj = this;
            var data = {
                year:$obj.closest('div').find('[name="year"]').val(),
                month:$obj.closest('div').find('[name="month"]').val(),
            }
            var url = jom.url+$obj.attr('data--url')+data.year+data.month;
            $('#modal').html(jom.loading).modal({clickClose:false});
            location.href = url;
		}
    }(jQuery));

    $(document).on('keyup click change','.au',function(){
        var $obj = $(this).closest('tr');
        var data = {
            caseno:$obj.attr('data--caseno'),
            department:$obj.find('[title="Department"]').find(':input').val(),
            clinicalClerk:$obj.find('[title="Clinical Clerk"]').find(':input').val(),
            resident:$obj.find('[title="Resident In Charge"]').find(':input').val(),
            delivery:$obj.find('[title="Type of Delivery"]').find(':input:checked').val(),
            remarks:$obj.find('[title="Remarks"]').find(':input').val(),
            finalDiagnosis:$obj.find('[title="Final Diagnosis"]').find(':input').val(),
            causeOfConfinement:$obj.find('[title="Cause Of Confinement"]').find(':input').val(),
            icd10:$obj.find('[title="ICD10"]').find(':input').val(),
        };
        $obj.find('.fa-save').each(function(){
            $(this).closest('.label').removeClass('label-success').addClass('label-primary');
            $(this).removeClass('fa-save').addClass('fa-spin fa-spinner');
        });
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            if(output.match(/success/ig) == null){
                alert('There was an error in saving. Please contact the IT department.');
            }else{
                $obj.find('.fa-spin').each(function(){
                    $(this).closest('.label').removeClass('label-primary').addClass('label-success');
                    $(this).removeClass('fa-spin fa-spinner').addClass('fa-save');
                });
            }
        });
    });
});