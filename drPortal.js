(function($){
	$.fn.viewLabResult = function(){
		var $obj = this;
		var data = {
			caseno:$obj.attr('data--caseno'),
			patientno:$obj.attr('data--patientno'),
			drCode:$obj.attr('data--dr-code'),
			type:$obj.attr('data--type'),
			dept:$obj.attr('data--dept'),
		}
		$obj.trOutput('show');
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.trOutput(output);
		});
	}
}(jQuery));

(function($){
	$.fn.patientLab = function(){
		var $obj = this;
		var data = {
			patientno:$obj.attr('data--patientno'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.setImpression = function(){
		var $obj = this;
		var data = {
			form:{
				caseno:$obj.attr('data--caseno'),
				batchno:$obj.attr('data--batchno'),
				dep:$obj.attr('data--dep'),
			}
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.updateDiagnosis = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		};
		$obj.nextAll().remove();
		$obj.after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.nextAll().remove();
			$obj.after(output);
			$('.modal div:first').scrollTop($obj.next().offset().top)
		});
	}
}(jQuery));

(function($){
	$.fn.finalizeDiag = function(){
		var $obj = this;
		var data = {
			batch:$obj.attr('data--batch'),
		};
//		if(checkPW() == 1){
			$obj.closest('form').nextAll().remove();
			$obj.closest('form').after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.closest('form').nextAll().remove();
				$obj.closest('form').after(output);
				$('.modal div:first').scrollTop($obj.next().offset().top)
			});
//		}else{
//			console.log('asd');
//		}
	}
}(jQuery));

(function($){
	$.fn.patientDiagnostic = function(){
		var $obj = this;
		var data = {
			patientNo:$obj.attr('data--patientno'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

function checkPW(){
	$allow = 0;
	jom.modal('open',jom.loading);
	$.post(jom.url+'pages/drPortal/reqPass',{},function(output){
		jom.modal('show','<div>'+output+'</div>');
	});

	return $allow
}
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
$(document).on('keyup','[data--procedure-append]',function(){
	dataAppend();
});
