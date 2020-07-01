(function($){
	$.fn.removeAppendProcedure = function(){
		var $obj = this;
		$obj.closest('.row').remove();
	}
}(jQuery));

(function($){
	$.fn.saveAccess = function(){
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
	$.fn.grantAccess = function(){
		var $obj = this;
		$('#postOutput').html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$('#postOutput').html(output);
		});
	}
}(jQuery));
(function($){
	$.fn.viewAccessList = function(){
		var $obj = this;
		$('#postOutput').html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$('#postOutput').html(output);
		});
	}
}(jQuery));
(function($){
	$.fn.removeAccess = function(){
		var $obj = this;
		var data = {
			id:$obj.attr('data--id'),
		}
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.closest('tr').remove();
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));
(function($){
	$.fn.createAdmin = function(){
		var $obj = this;
		$('#postOutput').html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$('#postOutput').html(output);
		});
	}
}(jQuery));
(function($){
	$.fn.saveAdmin = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));
(function($){
	$.fn.saveDiagnostic = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
			file:$('[data--filename]').map(function(){
				return $(this).attr('data--filename');
			}).get().join(),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
			if(output.match(/success/ig) != null){
				$('form[data--form-id="saveDiagnostic"]')[0].reset();
				$('form[data--form-id="saveDiagnostic"]').find('#procedure-container').html('');
				$('#fileUploadContainer').html('');
			}
			/*if(output.match(/success/ig) != null){
				window.open(jom.url+'pages/diagnostic/printDiag/'+$obj.find('[name="department"]').val()+'/'+$obj.find('[name="caseno"]').val());
				$obj[0].reset();
			}*/
		});
	}
}(jQuery));
(function($){
	$.fn.attachFile = function(){
		var $obj = this;
		var data = {
			batch:$obj.attr('data--batchno'),
		}
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));
(function($){
	$.fn.uploadAttachment = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		$obj.nextAll().remove();
		$obj.after(jom.loading);
		console.log(data);
		$obj.find('[type="file"]').uploadNew(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.nextAll().remove();
			$obj.after(output.msg);
			$('#fileUploadContainer').append('<a href="#" onClick="$(this).remove()" data--filename="'+output.filename+'"><b class="fa fa-file"></b> '+output.filename+' <b class="fa fa-remove"></b></a> ');
			console.log(output)
		},$('progress'));
	}
}(jQuery));
(function($){
	$.fn.appendProcedure = function(){
		var $obj = this;
		var data = {
			txt:$obj.closest('label').find('[name="procedure"]').children(':selected').text(),
			val:$obj.closest('label').find('[name="procedure"]').val(),
		}
		if(data.val && data.val != '' && $('[data--procedure-append="'+data.txt+'"]').length == 0){
			console.log(data.txt);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$('#procedure-container').append(output);
				dataAppend();
			});
		}
	}
}(jQuery));
function dataAppend(){
	var data = {
		od:'',
		os:''
	};
	$('[data--procedure-append][data--procedure-type="OD"]').each(function(){
		data.od+= $(this).attr('data--procedure-append')+'::'+$(this).val()+';;';
	});
	$('[data--procedure-append][data--procedure-type="OS"]').each(function(){
		data.os+= $(this).attr('data--procedure-append')+'::'+$(this).val()+';;';
	});
	$('[name="od"]').val(data.od);
	$('[name="os"]').val(data.os);
}
$(document).ready(function(){
	$(document).on('keyup','[data--procedure-append]',function(){
		dataAppend();
	});
	
	$('.conversion :input').on('keyup',function(){
		var data = {
			val:$(this).val(),
			cFactor:$(this).attr('data--conversion-factor'),
		}
		if($(this).is('.siUnit')){
			$(this).closest('tr').find('.cUnit').val(data.val/data.cFactor);
		}else if($(this).is('.cUnit')){
			$(this).closest('tr').find('.siUnit').val(data.val*data.cFactor);
		}
	});
});