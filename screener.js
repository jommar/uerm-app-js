$(document).ready(function(){
    (function($){
        $.fn.search_history = function(){
            var $obj = this;
            var data = {
                date:$obj.find('[name="date"]').val(),
            };
            console.log(data);
            location.href = jom.url+$obj.attr('data--url')+data.date;
        }
    }(jQuery));

    (function($){
        $.fn.search_report = function(){
            var $obj = this;
            var data = {
                type:$obj.find('[name="type"]').val(),
                from:$obj.find('[name="from"]').val(),
                to:$obj.find('[name="to"]').val(),
            };
            console.log(data);
            location.href = jom.url+$obj.attr('data--url')+data.type+'/'+data.from+'/'+data.to;
        }
    }(jQuery));

    (function($){
        $.fn.caseStudy = function(){
            var $obj = this;
            var $container = $('.body');

            $container.html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $container.html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.assignCaseNo = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.viewPatientData = function(){
            var $obj = this;
            var $container = $('.preview-screen');
            var data = {
                id:$obj.attr('data--id'),
            }
            $container.html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $container.html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.viewScreenedPatients = function(){
            var $obj = this;
            var $container = $('.body');

            $container.html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $container.html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveScreener = function(){
            var $obj = this;
            var data = {
                form:{},
                personalInfo:$obj.find('[data--form-name] :input').serializeArray(),
                assessment:$obj.find('[data--form-name] :input').serializeArray(),
                updateForm:$('#u-id').attr('data--screener-id'),
            };
            $obj.find('[data--form-name]').each(function(){
                data.form[$(this).attr('data--form-name')] = $(this).find(':input').serializeArray()
            });
            var $json = JSON.stringify(data);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    // $obj[0].reset();
                    location.href = jom.url+'screener';
                }
                $('#modal').html(output).modal();
            });
        }
    }(jQuery));

    (function($){
        $.fn.generateNewForm = function(){
            var $obj = $('form[data--form-id="saveScreener"]');

            $obj.find(':input').val('');
            $obj.find('[data--form-name]').hide();
            $obj.find('[data--form-name="patientInfo"]').show();

            
            $('[data--form-toggle]').removeClass('btn-success');
            $('[data--form-toggle="patientInfo"]').addClass('btn-success');

            $('.body').html(jom.loading);
            $.get(jom.url+'screener/mssForm',function(output){
                $('.body').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.showForm = function(){
            var $obj = this;
            var data = {
                toggle:$obj.attr('data--form-toggle'),
            };

            $('[data--form-name]').hide();
            $('[data--form-name="'+data.toggle+'"]').show();

            $('[data--form-toggle]').removeClass('btn-success');
            $obj.addClass('btn-success');
        }
    }(jQuery));
});