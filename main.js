$(document).ready(function(){
	(function($){
		$.fn.forceResetPW = function(){
			var $obj = this;
			var data = {
				code:$obj.find('[name="code"]').val(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.get(jom.url+$obj.attr('data--url')+btoa(data.code),function(output){
				$obj.nextAll().remove();
				$obj.after(output);
			});
		}
	}(jQuery));

	(function($){
		$.fn.loadAccessErr = function(){
			$($(this).attr('data--target')).show().modal({clickClose:false});
		}
	}(jQuery));

	(function($){
		$.fn.createModule = function(){
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

	$('.appStatTbl').highchartTable();
	
	// $('.app-list').clone().modal({clickClose:false}).find(':input').focus();

	// $('.app-list').on('click',function(){
	// 	$(this).clone().modal({clickClose:false});
	// 	$('.modal.app-list').find(':input').focus();
	// });

	// $('.modal.app-list .filter-search').val('budget').trigger('keyup');
});