$(document).ready(function(){
    (function($){
        $.fn.remove_tr = function(){
            var $obj = this;
            $obj.closest('tr').remove();
        }
    }(jQuery));

    (function($){
        $.fn.show_result = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                caseno:$obj.attr('data--caseno'),
                template:$obj.attr('data--template'),
            };
            var cols = $obj.closest('tr').find('td').length-2;
            $obj.closest('tr').next().find('.o-res').closest('tr').remove();
            $obj.closest('tr').after(`<tr>
                <td colspan="2"><a href="#" class="btn btn-danger pull-right" data--module="remove_tr"><b class="fa fa-remove"></b></a></td>
                <td class="o-res" colspan="${cols}">${jom.loading}</td>
            </tr>`);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.closest('tr').next().find('.o-res').html(output);
            });
            // $('#modal').html(jom.loading).modal({clickClose:false});
            // $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            //     $('#modal').html(output).modal({clickClose:false});
            // });
        }
    }(jQuery));

    (function($){
        $.fn.search_lab = function(){
            var $obj = this;
            var data = {
                caseno:$obj.find('[name="caseno"]').val(),
                lastname:$obj.find('[name="lastname"]').val(),
                firstname:$obj.find('[name="firstname"]').val(),
                middlename:$obj.find('[name="middlename"]').val(),
            };
            var url = btoa(`${data.caseno}/${data.lastname}/${data.firstname}/${data.middlename}`);
            location.href = jom.url+$obj.attr('data--url')+`/${url}`;
        }
    }(jQuery));

    (function($){
        $.fn.setProfileSeq = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                seq:$obj.val(),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').removeClass('danger').addClass('success');
                }else{
                    $obj.closest('tr').removeClass('success').addClass('danger');
                }

                console.log(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.getProfileTests = function(){
            var $obj = this;
            $('#test-container').html(jom.loading);
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#test-container').html(output);
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveLabProfile = function(){
            var $obj = this;
            var data = {
                lab:$('#lab-tests').find('[data--module="unassignTest"]').map(function(){
                    return $(this).attr('data--test-id');
                }).get().join(),
                profile:$('[name="profile"]').val(),
            };
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                if(output.match(/success/ig) != null){
                    $('#lab-tests').html('');
                    $('#lab-masterlist').find('.success').removeClass('success');
                    $('[name="profile"]').val('');
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.unassignTest = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--test-id'),
            };
            $obj.remove();
            var $container = $('#lab-masterlist');
            $container.find(`[data--test-id="${data.id}"]`).closest('tr').removeClass('success');
            $obj.remove();
        }
    }(jQuery));

    (function($){
        $.fn.assignTest = function(){
            var $obj = this;
            var data = {
                test:$obj.attr('data--test-name'),
                id:$obj.attr('data--test-id'),
            };
            var $container = $('#lab-tests');
            $obj.closest('tr').addClass('success');
            if($container.find(`[data--test-id="${data.id}"]`).length == 0){
                $container.append(`<a data--module="unassignTest" href="#" data--test-id="${data.id}" class="pull-left btn btn-primary btn-sm" style="padding:5px;margin-right:5px;margin-top:5px"><b class="fa fa-remove"></b> ${data.test}</a>`);
            }
        }
    }(jQuery));

    (function($){
        $.fn.removeTest = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
            };
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
                console.log(output);
            });
        }
    }(jQuery));
    (function($){
        $.fn.saveTemplate = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                if(output.match(/success/ig) != null){
                    location.reload();
                }else{
                    $('#modal').html(output).modal();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.updateLabProfile = function(){
            var $obj = this;
            var data = {
                chargeId:$obj.attr('data--charge-id'),
                chargeName:$obj.attr('data--charge-name'),
            };
            if($obj.find('.fa-spinner').length == 0){
                $obj.append(`<b style="margin-left:8px" class="fa fa-spinner fa-spin"></b>`);
            }
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.find('.fa-spinner').remove();
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.saveProfile = function(){
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
        $.fn.checkLabProfile = function(){
            var $obj = this;
            var data = {
                chargeId:$obj.attr('data--charge-id'),
                chargeName:$obj.attr('data--charge-name'),
            };
            if($obj.find('.fa-spinner').length == 0){
                $obj.append(`<b style="margin-left:8px" class="fa fa-spinner fa-spin"></b>`);
            }
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.find('.fa-spinner').remove();
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchLabCharges = function(){
            var $obj = this;
            var data = {
                csno:$obj.closest('form').find('[name="csno"]').val(),
            };
            $('#modal').html(jom.loading).modal();
            $.get(jom.url+$obj.attr('data--url')+'/'+data.csno,function(output){
                $('#modal').html(output).modal();
            });
        }
    }(jQuery));

    $(document).on('change','[data--form-id="saveTemplate"] [name="type"]',function(){
        if($(this).val() == 'r'){
            $('#normal-value').show();
        }else{
            $('#normal-value').hide().find(':input').val('');
        }
    });

    $(document).on('change','[data--form-id="saveLabResult"] [name="profile"]',function(){
        var profile = $(this).val();
        $('#lab-test').html(jom.loading);
        $.get(jom.url+'emr/lab/load-template/'+btoa(profile),function(output){
            $('#lab-test').html(output);
        });
    });

    $(document).on('change','[data--form-id="setProfileSeq"] :input',function(){
        $(this).setProfileSeq();
        // var data = {
        //     id:$(this).attr('data--id'),
        //     val:$(this).val(),
        // }
        // console.log(data);
    });
});