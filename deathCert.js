(function($){
	$.fn.searchDeathPatient = function(){
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
	$.fn.deathCertForm = function(){
		var $obj = this;
		var data = {
			caseno:$obj.attr('data--caseno'),
		};
		jom.modal('open');
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.saveDeathCert = function(){
		var $obj = this;
		var data = {
			form:$obj.serializeArray(),
		};
		$obj.nextAll().remove();
		$obj.after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.nextAll().remove();
			$obj.after(output);
			asd = $obj.next();
			var offset = $obj.height();
			$obj.closest('#modal').find('div:first').scrollTop(offset);
		});
	}
}(jQuery));