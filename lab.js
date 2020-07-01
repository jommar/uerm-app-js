$(document).ready(function(){
    (function($){
        $.fn.saveNormalValue = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                var msg = output;
                if(output.match(/success/ig) != null){
                    $.get(jom.url+'hospital/lab-normal-value/reload',function(output){
                        // $('#postOutput').html(output);
                        // $('form[data--form-id="saveNormalValue"]').after(msg);
                        setTimeout(() => {
                            location.reload();
                        },2000);
                    });
                }
            });
        }
    }(jQuery));

    (function ($) {
        $.fn.assign_charge_id = async function () {
            var $obj = this;
            // var data = {
            //     form:$obj.serializeArray(),
            // }
            $obj.nextAll().remove();
            $obj.after(jom.loading);

            const response = await fetch(
                `${jom.apiUrl}hospital/lab-charges?auth=${jom.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        labModule: $obj.find('[name="labModule"]').val(),
                        chargeId: $obj.find('[name="charges"]').val(),
                    }),
                }
            );
            const responseJson = await response.json();
            $obj.nextAll().remove();
            if (responseJson.error) {
                $obj.after(`<div class="alert alert-danger">${responseJson.message}</div>`);
                return;
            }
            $obj.after(`<div class="alert alert-success">${responseJson.message}</div>`);
            // vue.$data.isAssignChargeId = false;
            // vue.$data.chargeIdForm.testName = '';
            // vue.$data.chargeIdForm.id = '';
            // vue.$data.chargeIdForm.chargeId = '';
        }
    }(jQuery));
});