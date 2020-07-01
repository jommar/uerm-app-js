$(document).ready(function(){
	(function($){
		$.fn.showModal = function(){
			var $obj = this;
			jom.modal('open');
			//jom.modal('show','<div>'+$($obj.attr('data-target')).get(0).outerHTML+'</div>');
			var html = $($obj.attr('data-target')).get(0).outerHTML;
			jom.modal('show','<div class="margin"><div></div>'+html+'</div>');
			$('.modal .hidden').removeClass('hidden').highchartTable();
		}
	}(jQuery));

	(function($){
		$.fn.setAnalyticsDate = function(){
			var $obj = this;
			var data = {
				prompt:prompt('Plese enter year: '),
			};
			if(!parseInt(data.prompt) || data.prompt.length != 4){
				alert('Please enter a valid year.');
			}else{
				data.url = jom.url+$obj.attr('data--url')+'/'+data.prompt;
				console.log(data.url);
				window.location.replace(''+data.url+'');
			}
		}
	}(jQuery));

	(function($){
		$.fn.saveDiseasePatient = function(){
			var $obj = this;
			var data = {
				disease:$('.disease-form a.active').map(function(){
					return $(this).attr('data--disease-id');
				}).get().join(),
				caseno:$obj.attr('data--caseno'),
				patientno:$obj.attr('data--patientno'),
			};
			if(data.disease == ''){
				alert('Please select at lease one disease');
			}else{
				jom.modal('open');
				$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
					jom.modal('show','<div>'+output+'</div>');
				});
			}
		}
	}(jQuery));

	(function($){
		$.fn.selectDisease = function(){
			var $obj = this;
			$obj.toggleClass('active');
		}
	}(jQuery));

	(function($){
		$.fn.loadDisease = function(){
			var $obj = this;
			$obj.load(jom.url+'infirmary/disease/disease-list');
		}
	}(jQuery));
	(function($){
		$.fn.removeDisease = function(){
			var $obj = this;
			var data = {
				diseaseId:$obj.attr('data--disease-id'),
			};
			jom.modal('open');
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
				$('#diseaseList').loadDisease();
			});
		}
	}(jQuery));

	(function($){
		$.fn.saveDiseaseForm = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
				$('#diseaseList').loadDisease();
			});
		}
	}(jQuery));

	(function($){
		$.fn.filterPatient = function(){
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
		$.fn.toggleComplete = function(){
			var $obj = this;

			if($obj.hasClass('btn-default')){
				$obj.removeClass('btn-default').addClass('btn-success');
			}else{
				$obj.removeClass('btn-success').addClass('btn-default');
			}

			var data = {
				caseno:$obj.attr('data--caseno'),
				complete:$obj.hasClass('btn-success') === true ? 1 : 0,
			};
			jom.modal('open');
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));
	(function($){
		$.fn.physicalExam = function(){
			if(jom.changeCtr > 0 && $('[data--form-id="savePe"]').is(':visible') === true){
				var conf = confirm('Save current form?');
				if(conf === true){
					$('[data--form-id="savePe"]').savePe();
				}
			}
			var $obj = this;
			var data = {
				caseno:$obj.attr('data--caseno'),
			};
			jom.modal('open');
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
				jom.changeCtr = 0;
			});
		}
	}(jQuery));
	(function($){
		$.fn.setUrinalysisValue = function(){
			var $obj = this;
			$obj.closest('ul').prev().find(':input').val($obj.text());
		}
	}(jQuery));
	(function($){
		$.fn.savePe = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.changeCtr = 0;
				$obj.nextAll().remove();
				$obj.after(output);
			});
		}
	}(jQuery));
	(function($){
		$.fn.flagPatient = function(){
			var $obj = this;
			var data = {
				code:$obj.attr('data--code'),
				caseno:$obj.attr('data--caseno'),
			};
			jom.modal('open');
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));
	(function($){
		$.fn.saveFlagRemarks = function(){
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
		$.fn.registerPatient = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				if(output.match(/success/ig) != null){
					$('form[data--form-id="registerPatient"]').after('<div class="alert alert-danger">Click here to <a target="_blank" href="'+jom.url+'pages/infirmary/printReg/'+$obj.find('[name="code"]').val()+'/1"><b>reprint</b></a> registration</div>');
					var $win = window.open();
					$($win.document.body).html(output);
					$win.window.print();
				}else{
					$obj.after(output);
				}
			});
		}
	}(jQuery));
	(function($){
		$.fn.searchReport = function(){
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
		$.fn.export = function(){
			var $obj = this;
			var data = {
				form:$($obj.attr('data--form')).serializeArray(),
			};
			window.open(jom.url+$obj.attr('data--url'));
		}
	}(jQuery));
	(function($){
		$.fn.saveAttendance = function(){
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
		$.fn.saveXrTemplate = function(){
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
		$.fn.setXrTemplate = function(){
			var $obj = this;
			$('form[data--form-id="savePe"] [name="xray"]').val($obj.attr('data--val'));
		}
	}(jQuery));
	(function rePrintReg($){
		$.fn.rePrintReg = function(){
			// var $obj = this;
			// var data = {
			// 	caseno:$obj.attr('data--caseno'),
			// };
			// jom.modal('open');
			// $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			// 	jom.modal('show','<div>'+output+'</div>');
			// });
			var $obj =this;
			var data = {
				caseno:$obj.attr('data--caseno')
			}
			$.get(jom.url+'pages/infirmary/printReg/'+data.caseno,function(output){
				var $win = window.open();
				$($win.document.body).html(output);
				$win.window.print();
			});
		}
	}(jQuery));

	(function($){
		$.fn.saveBatchXR = function(){
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
		$.fn.addItem = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			}
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
				$('#reqContainer').load(jom.url+'infirmary/inventory/loadReqItems');
			});
		}
	}(jQuery));

	(function($){
		$.fn.processRIV = function(){
			var $obj = $(this).closest('.panel');
			var data = {
				req:$('[data--req]').map(function(){
					return $(this).attr('data--req')+';;'+$(this).attr('data--req-qty');
				}).get().join(),
			}
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$(this).attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
			});
		}
	}(jQuery));

	jom.changeCtr = 0;
	$(document).on('keyup change','[data--form-id="savePe"] :input',function(){
		jom.changeCtr++;
	});

	$(document).on('click','[data--form-id="registerPatient"] .nav.nav-pills a',function(){
		$(this).closest('label').find('[name="type"]').val($(this).attr('data--val'));
	});
});
