$(document).ready(function(){
    (function($){
        $.fn.setSecretQuestion = function(){
            var $obj = this;
            var data = {
                code:prompt("Please enter your employee/student number"),
            };
            console.log(data.code);
            if(data.code.trim() != '' && data.code != null){
                $obj.closest('form').nextAll().remove();
                $obj.closest('form').after(jom.loading);
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                    $obj.closest('form').nextAll().remove();
                    $obj.closest('form').after(output);
                });
            }
        }
    }(jQuery));
    
    (function($){
        $.fn.resetAccount = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/error/) == null){
                    $('[data--form-id="setNewPassword"]').prevAll().not('h1').hide();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.validateForgotCode = function(){
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
        $.fn.getSecretQuestion = function(){
            var $obj = this;
            var data = {
                code:$obj.val(),
            };
            $obj.closest('form').find('[name="secretAns"]').val('');
            // $obj.closest('form').find('[name="secretAns"]').parent().hide();
            $obj.parent().next('h3').remove();
            $.post(jom.url+'login/forgot/secretQuestion',{data:data},function(output){
                console.log(output);
                if(output){
                    if($obj.parent().next().is('label')){
                        $obj.parent().after('<h3 data--code="'+output.CODE+'">'+output.QUESTION+'</h3>');
                        // $obj.closest('form').find('[type="password"]').parent().show();
                    }else{
                        $obj.parent().next().remove();
                        $obj.parent().after('<h3 data--code="'+output.CODE+'">'+output.QUESTION+'</h3>');
                    }
                }
            },'json');
        }
    }(jQuery));

    (function($){
        $.fn.loginUerm = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            // $('.login-msg').html(jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                // $('.login-msg').html(output);
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/secret question/ig) != null){
                    $('[data--form-id="loginUerm"]').hide();
                }
                $obj.find('[type="password"]').val('');
            });
        }
    }(jQuery));

    (function($){
        $.fn.setNewPassword = function(){
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
		$.fn.openEResources = function(){
			var $obj = this;
			window.open("https://www.uptodate.com/contents/search");
			window.open("http://www.uptodate.com/home/patient-search-widget");
			window.open("https://www.clinicalkey.com/#!/");
			window.open("http://www.mims.com/");
			window.open("https://evolve.elsevier.com/");
			window.open("https://www.ebscohost.com/");
		}
	}(jQuery));

    $('[data--form-id="validateForgotCode"] [name="code"]').on('keyup',function(){
        if($(this).closest('form').find('[name="type"]').val() == 'webapp'){
            $(this).getSecretQuestion();
        }
    });
});