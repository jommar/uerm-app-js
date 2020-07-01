$(document).ready(function(){
	(function($){
		$.fn.refreshAccessRightsHistory = function(){
			var $obj = $('#accessRightsHistoryContainer');

			$obj.html(jom.loading);

			$.get(jom.url+$obj.attr('data--url'),function(output){
				$obj.replaceWith(output);
			});
		}
	}(jQuery));

	(function($){
		$.fn.viewDeptGrouping = function(){
			var $obj = this;
			jom.modal('open',jom.loading);
			$.get(jom.url+$obj.attr('data--url'),function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));

	(function($){
		$.fn.controlAccessRights = function(){
			var $obj = this;
			var data = {
				id:$obj.attr('data--id'),
				type:$obj.attr('data--type'),
			};
			var $container = $obj.closest('[class*="col"]').find('.ctrl-output');
			$container.html(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$container.html(output);
			});
		}
	}(jQuery));

	(function($){
		$.fn.accessRightsControl = function(){
			var $obj = this;
			jom.modal('open',jom.loading);
			$.get(jom.url+$obj.attr('data--url'),function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));

	(function($){
		$.fn.accessRightsMgt = function(){
			var $obj = this;
			$('module-body').html(jom.loading);
			$.get(jom.url+$obj.attr('data--url'),function(output){
				$('module-body').html(output);
			});
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

	(function($){
		$.fn.removeUserAccess = function(){
			var $obj = this;
			var data = {
				accessId:$obj.attr('data--access-id')
			}
			$obj.trOutput('show');
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.trOutput(output);
				if(output.match(/success/ig) != null){
					$obj.closest('tr').remove();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.viewUserAccesslist = function(){
			var $obj = this;
			jom.modal('open',jom.loading);
			$.get(jom.url+$obj.attr('data--url'),function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));

	(function($){
		$.fn.assignEmpModule = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
				chkEmpName:$obj.next('.check-emp').length == 1 && $obj.next('.check-emp').attr('data--emp-code') == $obj.find('[name="code"]').val() ? 1 : 0,
			};
			var $ctr = {};

			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				var timerClose = 10000;
				$obj.nextAll().remove();
				$obj.after(output);
				$obj.next().prepend('<div class="pull-right badge" style="font-size:10px">This message will close in <b id="closeTimer">'+timerClose/1000+'</b> seconds</div>');
				$ctr.interval = setInterval(function(){
					var x = $('#closeTimer').text();
					x-= 1;
					$('#closeTimer').text(x);
				},1000);
				$obj.next().delay(timerClose).fadeOut(1000,function(){
					$(this).remove();
					clearInterval($ctr.interval);
				});
			});
		}
	}(jQuery));

	(function($){
		$.fn.cancelAccessRights = function(){
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
					var id = $obj.find('[name="id"]').val();
					$('[data--module="cancelAccessRightsForm"][data--id="'+id+'"]').closest('tr').remove()
				}
			});
		}
	}(jQuery));

	(function($){
		$.fn.cancelAccessRightsForm = function(){
			var $obj = this;
			jom.modal('open',jom.loading);
			$.get(jom.url+'it/cancelAccessRights/'+$obj.attr('data--access-rights-id'),function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));

	(function($){
		$.fn.removeHrefSysGroup = function(){
			var $obj = this;
			console.log($obj);

			$obj.removeAttr('data--module');
			$obj.attr('data--module','confirmModuleAccess')

			$('.ac,#selectedModule').removeGroupName($obj.attr('data--group-name'));
		}
	}(jQuery));

	(function($){
		$.fn.removeGroupName = function(groupName){
			var $obj = this;
			$obj.find('[data--group-name="'+groupName+'"]').remove()
		}
	}(jQuery));

	(function($){
		$.fn.parseAnchor = function($param){
			var $obj = this;
			var modules = $param.modules.split(',');
			
			$.each(modules,function(key,val){
				if(val != ''){
					$obj.append('<a href="#" data--complete-name="'+$param.completeName+'" data--group-name="'+$param.name+'" class="label label-primary" style="white-space:initial;margin:1px;display:inline-block"><b class="fa fa-remove"></b> '+val+'</a>');
				}
			});

			$('[data--group-name]').on('click',function(){
				if($(this).attr('data--group-name') == ''){
					$(this).remove()
				}else{
					$('.ac').find('[data--group-name="'+$(this).attr('data--group-name')+'"]').remove();
				}

				$(this).switchClass('btn-success','btn-primary');
			});

			$('#selectedModule .fa-remove').remove();
		}
	}(jQuery));

	(function($){
		$.fn.confirmModuleAccess = function(){
			var $obj = this;
			var data = {
				modules:$obj.closest('.group-container').find('.list-group-item').map(function(){
					return $(this).text();
				}).get().join(),
				txt:$('[data--form-id="saveAccessRights"]').find('[name="modules"]').val()
			};
			// if(data.txt != ''){
			// 	data.txt+= ','
			// }

			// $('[data--form-id="saveAccessRights"]').find('[name="modules"]').val(data.modules);
			// $('[name="modules"]').val('');
			// $('.ac').html(data.modules).parseAnchor($obj.attr('data--group-name'));

			$('.ac,#selectedModule').parseAnchor({
				modules:data.modules,
				name:$obj.attr('data--group-name'),
				completeName:$obj.attr('data--complete-name'),
			});

			// jom.modal('close');
			$obj.removeAttr('data--module');
			$obj.attr('data--module','removeHrefSysGroup');

			$obj.switchClass('btn-primary','btn-success');
		}
	}(jQuery));
});