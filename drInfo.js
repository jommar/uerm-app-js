(function($){
	$.fn.updateDr = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.loadInfo = function(){
		var $obj = this;
		var data = {
			code:$obj.attr('data--dr-code'),
		};
		$('.drOutput').css({
			'height':'150px',
		});
		/*$('[data--form-id="updateDr"]').each(function(){
			$(this).replaceWith($(this).closest('.panel').find('[data--module="showInfo"]'));
		})*/
		$container = $obj.closest('.panel').find('.drOutput');
		$container.html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$container.css({
				'height':'350px',
			});
			$container.html(output);
		});
	}
}(jQuery));

(function($){
	$.fn.addDr = function(){
		var $obj = this;
		var data = {
			code:$obj.attr('data--dr-code'),
		};
		$container = $('#postOutput');
		$container.html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$container.html(output);
		});
	}
}(jQuery));

(function($){
	$.fn.viewDrInfo = function(){
		var $obj = this;
		$container = $obj.closest('.panel').find('.drOutput');
		$container.html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$container.html(output);
		});
	}
}(jQuery));

(function($){
	$.fn.showInfo = function(){
		var $obj = this;
		var data = {
			drCode:$obj.attr('data--dr-code'),
		}
		$container = $obj.closest('.panel').find('.drOutput');
		$container.html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$container.html(output);
		});
	}
}(jQuery));

(function($){
	$.fn.saveNewDr = function(){
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
	$.fn.specialtyMgt = function(){
		var $obj = this;
		$container = $('#postOutput');
		$container.html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$container.html(output);
		});
	}
}(jQuery));

(function($){
	$.fn.saveNewSpecialty = function(){
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

$(document).on('change','form[data--form-id="saveNewSpecialty"] [name="subSpecialty"]',function(){
	if($(this).val() == '0'){
		$(this).closest('form').find('select[name="parentSpecialty"]').val('');
		$(this).closest('form').find('select[name="parentSpecialty"]').removeAttr('required');
		$(this).closest('form').find('select[name="parentSpecialty"]').attr('disabled','disabled');
	}else{
		$(this).closest('form').find('select[name="parentSpecialty"]').removeAttr('disabled');
		$(this).closest('form').find('select[name="parentSpecialty"]').attr('required','required');
	}
});