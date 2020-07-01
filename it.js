$(document).ready(function(){
	(function($){
		$.fn.generate_id = function(){
			var $obj = this;
			var data = {
				type:$obj.attr('data--type'),
			};
			$.get(jom.url+$obj.attr('data--url'),function(output){
				$('[name="code"]').val(output.id);
				$('[name="type"]').val($obj.attr('data--type').toUpperCase());
				
				$('[name="validUntil"]').val(output.valid_until);
			},'json');
		}
	}(jQuery));

	(function($){
		$.fn.save_new_id = function(){
			var $obj = this;
			if($obj.find('.hidden').length > 0){
				$('[data--module="search_id"]').trigger('click');
				// alert('Please use the search function first before saving');
			}else{
				var data = {
					form:$obj.serializeArray(),
				};
				$('#modal').html(jom.loading).modal();
				$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
					$('#modal').html(output).modal();
					$('form[data--form-id="save_new_id"]')[0].reset();
					$('form[data--form-id="save_new_id"]').find('.h-container').addClass('hidden')
				});
			}
		}
	}(jQuery));

	(function($){
		$.fn.set_fields = function(){
			var $obj = this;
			$('[name="lastName"]').val($obj.attr('data--lastname'));
			$('[name="firstName"]').val($obj.attr('data--firstname'));
			$('[name="middleName"]').val($obj.attr('data--middlename'));
			$('[name="middleInitial"]').val($obj.attr('data--middleinitial'));
			$('[name="college"]').val($obj.attr('data--department'));
			$('[name="course"]').val($obj.attr('data--position'));
			$('[name="address"]').val($obj.attr('data--address'));
			$('[name="sss"]').val($obj.attr('data--sss'));
			$('[name="tin"]').val($obj.attr('data--tin'));
			$('[name="contactName"]').val($obj.attr('data--contactName'));
			$('[name="contactNo"]').val($obj.attr('data--contactNo'));
			$('[name="contactAddress"]').val($obj.attr('data--contactAddress'));

			$('.close-modal ').click();
		}
	}(jQuery));

	(function($){
		$.fn.search_id = function(){
			var $obj = this;
			var data = {
				code:$obj.closest('form').find('[name="code"]').val(),
				type:$obj.closest('form').find('[name="type"]').val(),
			};
			$('#modal').html(jom.loading).modal();
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$('#modal').html(output).modal();
				$('form[data--form-id="save_new_id"]').find('.hidden').removeClass('hidden');
			});
		}
	}(jQuery));

	(function($){
		$.fn.batchAssignModules = function(){
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
		$.fn.batchAssignAccess = function(){
			var $obj = this;
			var data = {
				system:$obj.attr('data--system-name'),
			};
			$('#modal').html(jom.loading).modal();
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$('#modal').html(output).modal();
			});
		}
	}(jQuery));

	(function($){
		$.fn.searchUserAccess = function(){
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
		$.fn.createApp = function(){
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
		$.fn.generateIconFileName = function(){
			var $obj = this;
			$.get(jom.url+$obj.attr('data--url'),function(output){
				$('[data--form-id="createApp"]').find('[name="icon"]').val(output);
			});
		}
	}(jQuery));

	(function($){
		$.fn.toggleApps = function(){
			var $obj = this;
			if($obj.attr('data--type') == 'toggle'){
				$obj.next().toggle();
			}else if($obj.attr('data--type') == 'show'){
				$('.app-container').show();
			}else if($obj.attr('data--type') == 'hide'){
				$('.app-container').hide();
			}
		}
	}(jQuery));

	(function($){
		$.fn.searchAccess = function(){
			var $obj = this;
			var data = {
				appid:$obj.attr('data--app-id'),
				status:$obj.attr('data--app-status'),
				name:$obj.attr('data--app-name'),
				module:$obj.attr('data--app-module'),
				code:$obj.attr('data--code'),
			};
			$('#modal').html(jom.loading).modal();
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$('#modal').html(output).modal();
			});
		}
	}(jQuery));

	(function($){
		$.fn.getRequestDetails = function(){
			var $obj = this;
			var data = {
				formno:$obj.attr('data--form-no'),
			};
			$('#modal').html(jom.loading).modal();
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$('#modal').html(output).modal();
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
		$.fn.updateAccessRights = function(){
			var $obj = this;
			var data = {
				type:$obj.attr('data--type'),
				code:$obj.attr('data--code'),
				appid:$obj.attr('data--app-id'),
				status:$obj.attr('data--app-status'),
				name:$obj.attr('data--app-name'),
				module:$obj.attr('data--app-module'),
				code:$obj.attr('data--code'),
			};
			$('#modal').html(jom.loading).modal();
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				if(output.match(/success/ig) != null){
					console.log(output);
					jom.modal('close');
					if(data.type == 'remove'){
						$obj.closest('.access-container').switchClass('bg-success','bg-danger');
						$obj.attr('data--type','add');
						$obj.html(`<b class="fa fa-plus"></b>`);
					}else{
						$obj.attr('data--type','remove');
						$obj.closest('.access-container').switchClass('bg-danger','bg-success');
						$obj.html(`<b class="fa fa-check"></b>`);
					}
				}else{
					$('#modal').html(output).modal();
				}
			});
		}
	}(jQuery));

	(function($){
		$.fn.loadAccess = function(){
			var $obj = this;
			var data = {
				code:$obj.attr('data--code'),
			};
			var $tr = $obj.closest('tr');
			$obj.closest('tbody').find('tr').not($tr).remove();
			$obj.closest('.panel').nextAll().remove();
			$obj.closest('.panel').after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.closest('.panel').nextAll().remove();
				$obj.closest('.panel').after(output);

				$('#access-list [name="request"]').on('change',function(){
					$(`#access-list [data--form-no]`).not($(`[data--form-no="${$(this).val()}"]`)).hide();
					$(`#access-list [data--form-no="${$(this).val()}"]`).show();
				});

				$('.app-filter').on('keyup',function(){
					var search = $(this).val();
					$('.app-item').each(function(){
						if(!$(this).attr('data--app-module').match(new RegExp(search,'ig'))){
							$(this).hide();
							if($(this).closest('.panel').find('.app-item:visible').length == 0){
								$(this).closest('.panel').hide();
							}
						}else{
							$(this).show();
							$(this).closest('.panel').show();
						}
					});
				});
			});
		}
	}(jQuery));

	(function($){
		$.fn.searchEmp = function(){
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
		$.fn.searchResult = function(){
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
		$.fn.deleteSysModules = function(){
			var $obj = this;
			var data = {
				modules:$('.sys-group li').map(function(){
					return $(this).attr('data--module-id')
				}).get().join(),
			};
			if(data.modules == ''){
				jom.modal('open',jom.loading);
				jom.modal('show','<div><div class="alert alert-danger">Please select modules to be deleted.</div></div>');
				return;
			}
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
				$('.clear-group').click();
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.renameSysGroup = function(){
			var $obj = this;
			var data = {
				newName:$obj.closest('label').find('.form-control').val(),
				oldName:$obj.attr('data--group-name'),
			};
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				console.log(output);
				if(output.match(/success/ig) != null){
					alert('SUCCESS: Group renamed.')
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.addSysToGroup = function(){
			var $obj = this;
			var data = {
				groupName:$obj.attr('data--group-name'),
				moduleId:$obj.closest('label').find('select').val()
			}
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				console.log(output);
				if(output.match(/success/ig) != null){
					$('[data--module="viewSysGroup"]').viewSysGroup();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.removeModuleFromGroup = function(){
			var $obj = this;
			var data = {
				id:$obj.attr('data--group-id')
			};
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				console.log(output);
				if(output.match(/success/ig) != null){
					$('[data--module="viewSysGroup"]').viewSysGroup();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.saveSystemMasterList = function(){
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
		$.fn.viewSysGroup = function(){
			var $obj = this;
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{},function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.saveSysGroup = function(){
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
					$('.clear-group').click();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.createSysGroup = function(){
			var $obj = this;
			var data = {
				modules:$('.sys-group li').map(function(){
					return $(this).attr('data--module-id')
				}).get().join(),
			};
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.updateSystemRequest = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
				$('[data--form-id="filterSysRequest"]').filterSysRequest();
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.changeSystemRequest = function(){
			var $obj = this;
			var data ={
				formNo:$obj.attr('data--form-no'),
				id:$obj.attr('data--id'),
			};
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.cancelSystemRequest = function(){
			if($(this).attr('data--save') == '1'){
				var $obj = $(this).closest('.cancelReason');
				var data = {
					formNo:$obj.find('[name="formNo"]').val(),
					id:$obj.find('[name="id"]').val(),
					reason:$obj.find('[name="reason"]').val(),
				};
				jom.modal('open',jom.loading);
				$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
					jom.modal('show','<div>'+output+'</div>');
					$('[data--form-id="filterSysRequest"]').filterSysRequest();
					/*$obj.prev().remove();
					$obj.remove();*/
				});
			}else{
				$('.cancelReason').remove();
				var $obj = this;
				var data = {
					formNo:$obj.attr('data--form-no'),
					id:$obj.attr('data--id'),
				}
				console.log(data);
				$obj.closest('tr').after(`<tr class="cancelReason danger" data--url="it/cancelSystemRequest">
					<td colspan="${$obj.closest('tr').find('td').length}">
						<input type="hidden" value="${data.formNo}" name="formNo" />
						<input type="hidden" value="${data.id}" name="id" />
						<label class="full-width">
							<b>Reason</b>
							<textarea rows="8" class="form-control" name="reason" placeholder="Reason for cancellation"></textarea>
						</label>
						<button class="btn btn-primary btn-sm" data--module="cancelSystemRequest" data--save="1"><b class="fa fa-save"></b> Save</button>
					</td>
				</tr>`);
			}
			/*jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
				$('[data--form-id="filterSysRequest"]').filterSysRequest();
			});*/
		}
	}(jQuery));
	
	(function($){
		$.fn.completeSysRequest = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
				$('[data--form-id="filterSysRequest"]').filterSysRequest();
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.completeSystemRequest = function(){
			var $obj = this;
			var data = {
				formNo:$obj.attr('data--form-no'),
			};
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.filterSysRequest = function(){
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
	
	$(document).on('click','form[data--form-id="changePW"] [data--type]',function(){
		var $obj = $(this).closest('form').find('[name="password"]');
		if($(this).attr('data--type') == 'show'){
			$(this).attr('data--type','hide');
			$(this).find('.btn-show').hide();
			$(this).find('.btn-hide').show();
			$obj.attr('type','text');
		}else{
			$(this).attr('data--type','show');
			$(this).find('.btn-show').show();
			$(this).find('.btn-hide').hide();
			$obj.attr('type','password');
		}
	});
	
	$(document).on('click','.show-hide-btn',function(){
		console.log(123);
		var $obj = $(this).closest('form').find('.show-hide-password');
		if($(this).attr('data--type') == 'show'){
			$(this).attr('data--type','hide');
			$(this).find('.btn-show').hide();
			$(this).find('.btn-hide').show();
			$obj.attr('type','text');
		}else{
			$(this).attr('data--type','show');
			$(this).find('.btn-show').show();
			$(this).find('.btn-hide').hide();
			$obj.attr('type','password');
		}
	});
	
	(function($){
		$.fn.changePW = function(){
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
					$('.form-group').remove();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.setSecretQuestion = function(){
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
					$('form').remove();
				}
			});
		}
	}(jQuery));
	
	$('.appStatTbl').highchartTable();

	$(document).on('keyup','[data--form-id="createApp"] [name="name"]',function(){
		var str = $(this).val();
		var url = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
			if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
			return index == 0 ? match.toLowerCase() : match.toUpperCase();
		});

		$(this).closest('form').find('[name="url"]').val('app/'+url);
	});
});