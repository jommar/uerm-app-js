(function($){
	$.fn.tagWalkIn = function(){
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
	$.fn.saveReAssign = function(){
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
	$.fn.reassignSchedApplicant = function(){
		var $obj = this;
		var data = {
			id:$obj.attr('data--id'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.showOverlay = function(){
		var $obj = this;
		jom.modal('open',jom.loading);
		jom.modal('show','<div>'+$($obj.attr('data--overlay')).get(0).outerHTML+'</div>');
		$('.modal').find('.input-overlay').removeClass('hidden');
		$('.modal .input-overlay').on('change',function(){
			var deg = $('.modal :input').map(function(){
				return $(this).val()
			}).get().join();
			$($(this).attr('data--overlay-container')).val(deg.replace(',',' '));
		});
		$('.modal [data--degree="N/A"]').on('click',function(){
			$('[data--module="showOverlay"]').val('N/A');
			$('.close-modal ').click();
		});
	}
}(jQuery));

(function($){
	$.fn.removeSched = function(){
		var $obj = this;
		var data = {
			id:$obj.attr('data--id'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
			if(output.match(/success/ig) != null){
				$obj.closest('tr').remove();
			}
		});
	}

	$.fn.removeSchedApplicant = function(){
		var $obj = this;
		var data = {
			id:$obj.attr('data--id'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
			if(output.match(/success/ig) != null){
				$obj.closest('tr').remove();
			}
		});
	}
}(jQuery));

(function($){
	$.fn.applicationList = function(){
		var $obj = this;
		var data = {
			id:$obj.attr('data--id'),
		};
		$obj.trOutput('show');
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.trOutput(output);
		});
	}
}(jQuery));

(function($){
	$.fn.saveSchedule = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		$obj.nextAll().remove();
		$obj.after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.nextAll().remove();
			$obj.after(output);
			$('#schedList').load(jom.url+$('#schedList').attr('data--url'));
		});
	}
}(jQuery));

(function($){
	$.fn.forgotRefNo = function(){
		var $obj = this;
		$obj.closest('.panel').nextAll().remove();
		$obj.closest('.panel').after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$obj.closest('.panel').nextAll().remove();
			$obj.closest('.panel').after(output);
		});
	}
}(jQuery));

(function($){
	$.fn.searchRefNo = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		$obj.nextAll().remove();
		$obj.after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.nextAll().remove();
			$obj.after(output);
		});
	}
}(jQuery));

(function($){
	$.fn.loginApp = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		$obj.nextAll().remove();
		$obj.after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.nextAll().remove();
			$obj.after(output);
			if(output.match(/success/ig) != null){
				window.location.replace(jom.url+'admission/main/index');
			}
		});
	}
}(jQuery));

(function($){
	$.fn.applicationForm = function(){
		var $obj = this;
		var $obj = $('#formInfo');
		$obj.html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$obj.html(output);
		});
	}
}(jQuery));

(function($){
	$.fn.savePersonalInfo = function(){
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
	$.fn.saveEducationInfo = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		var newForm = $('form').serializeArray()
		newForm.forEach((val, key)=>{
			newForm[key] = {
				name:val.name,
				value: val.value.replace(/[’–]/g,'',val)
			}
		});
		data.form = newForm;
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.saveFinancialInfo = function(){
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
	$.fn.saveAdditionalInfo = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		var newForm = $('form').serializeArray()
		newForm.forEach((val, key) => {
			newForm[key] = {
				name: val.name,
				value: val.value.replace(/[’–/']/g, '', val)
			}
		});
		data.form = newForm;
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.saveFinalizeInfo = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
			from:$obj.find('[name="SEM"]').children(':selected').attr('data--year-from'),
			to:$obj.find('[name="SEM"]').children(':selected').attr('data--year-to'),
		}
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.choose = function(){
		var $obj = this;
		var data = {
			choice:$obj.attr('data--choice'),
			appNo:$obj.attr('data--appNo'),
		}
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
			if(output.match(/success/ig) != null){
				location.reload();
			}
		});
	}
}(jQuery));

(function($){
	$.fn.saveInterview = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		}
		$obj.nextAll().remove();
		$obj.after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.nextAll().remove();
			$obj.after(output);
		});
	}
}(jQuery));

(function($){
	$.fn.saveReg = function(){
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
				window.location.replace(jom.url+'admission/main/index');
			}
		});
	}
}(jQuery));

$(document).on('keyup','form[data--form-id="savePersonalInfo"] [data-char-ref]',function(){
	$TXT = '';
	$OBJ = $(this).parents('form:first');
	$REF = $OBJ.find('[name="REFERENCE"]');
	$TXT = $OBJ.find('[data-char-ref="ref-0-name"]').val()+';;'+$OBJ.find('[data-char-ref="ref-0-address"]').val()+';;'+$OBJ.find('[data-char-ref="ref-0-contactNo"]').val()+'\n'+
		$OBJ.find('[data-char-ref="ref-1-name"]').val()+';;'+$OBJ.find('[data-char-ref="ref-1-address"]').val()+';;'+$OBJ.find('[data-char-ref="ref-1-contactNo"]').val()+'\n'+
		$OBJ.find('[data-char-ref="ref-2-name"]').val()+';;'+$OBJ.find('[data-char-ref="ref-2-address"]').val()+';;'+$OBJ.find('[data-char-ref="ref-2-contactNo"]').val();
	$REF.val($TXT);
	UpdateChange($REF);
});

$(document).on('change','[data--toggle]',function(){
	$('#'+$(this).attr('data--toggle')).find(':input').val('');
	if($(this).attr('data--hide') == $(this).val()){
		$('#'+$(this).attr('data--toggle')).hide();
	}else if($(this).attr('data--show') == $(this).val()){
		$('#'+$(this).attr('data--toggle')).show();
	}
});

$(document).ready(function(){
	$('[data--toggle]').each(function(){
		console.log($(this));
		if($(this).val() == $(this).attr('data--hide')){
			$('#'+$(this).attr('data--toggle')).hide();
		}
	});
});