$(document).ready(function(){
	(function($){
		$.fn.copy_permanent_address = function(){
			var $obj = {
				personalHouseNo:$('[name="personalHouseNo"]'),
				personalStreet:$('[name="personalStreet"]'),
				personalSubdivision:$('[name="personalSubdivision"]'),
				personalProvince:$('[name="personalProvince"]'),
				personalCity:$('[name="personalCity"]'),
				personalBrgy:$('[name="personalBrgy"]'),
			};
			$('[name="mailingHouseNo"]').val($obj.personalHouseNo.val());
			$('[name="mailingStreet"]').val($obj.personalStreet.val());
			$('[name="mailingSubdivision"]').val($obj.personalSubdivision.val());

			$('[name="mailingProvince"]').children().remove();
			$('[name="mailingProvince"]').append($obj.personalProvince.map(function(){
				return $(this).html();
			}).get().join()).val($obj.personalProvince.val());
			$('[name="mailingCity"]').children().remove();
			$('[name="mailingCity"]').append($obj.personalCity.map(function(){
				return $(this).html();
			}).get().join()).val($obj.personalCity.val());
			$('[name="mailingBrgy"]').children().remove();
			$('[name="mailingBrgy"]').append($obj.personalBrgy.map(function(){
				return $(this).html();
			}).get().join()).val($obj.personalBrgy.val());
		}
	}(jQuery));

	(function($){
		$.fn.addFamilyMember = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post($obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
				$('[data--url="pages/hr/loadInfo/familyInfo"]').loadEmpInfo();
			});
		}
	}(jQuery));

	(function($){
		$.fn.updFamilyMember = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post($obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
				$('[data--url="pages/hr/loadInfo/familyInfo"]').loadEmpInfo();
			});
		}
	}(jQuery));

	(function($){
		$.fn.updateMyPersonalInfo = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			}
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post($obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
			});
		}
	}(jQuery));

	(function($){
		// $.fn.update_sched_leave = function(){
		$.fn.set_sched_leave = function(){
			var $obj = this;
			var data = {
				code:$obj.attr('data--code'),
				date:$obj.attr('data--date'),
			};
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				console.log(output);
			});
		}
	}(jQuery));

	(function($){
		$.fn.print_sched_leave = function(){
			var $obj = this;
			var data = {
				url:$obj.attr('data--url'),
				dates:btoa($('.c-date.active').map(function(){
					return $(this).attr('data--date');
				}).get().join()),
			}
			console.log(data);
			window.open(`${data.url}/${data.dates}`);
		}
	}(jQuery));

	(function($){
		$.fn.mgt_sched_leave = function(){
			var $obj = this;
			$('#modal').html(jom.loading).modal({clickClose:false});
			$.get(jom.url+$obj.attr('data--url'),function(output){
				$('#modal').html(output).modal({clickClose:false});
			});
		}
	}(jQuery));

	(function($){
		$.fn.loadEmpSched = function(){
			var $obj = this;
			$obj.trOutput('show');
			$.get(jom.url+$obj.attr('data--url'),function(output){
				$obj.trOutput(output);
			});
		}
	}(jQuery));

	(function($){
        $.fn.saveLeaveEmp = function(){
            $obj = $('[data--form-id="saveLeaveEmp"]:eq(0)');
            if($obj.length > 0){
                $obj.find('.output').html('');
                var data = {
                    form:$obj.serializeArray(),
                }
                $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                    if(output.match(/success/ig) != null){
                        console.log(output);
                        $obj.remove();
                        $().saveLeaveEmp();
                    }else{
                        $obj.find('.output').html(output);
                        alert('There was a problem processing your leave!');
                    }
                });
            }else{
                $('#modal').find('.close-modal').click();
                $('#modal').html('');
                alert('Leave posting success');
            }
        }
    }(jQuery));

    (function($){
        $.fn.removeLeaveDate = function(){
            $obj = this;

            $obj.closest('.row').remove();
            if($('#modal').find('form').length == 0){
                $('#modal').find('.close-modal').click();
                $('#modal').html('');
            }
        }
    }(jQuery));

    (function($){
        $.fn.computeLeavePosting = function(){
            var $obj = this;
            var data ={
                form:$obj.closest('form').serializeArray(),
            };
            $('#modal').html(jom.loading);
            $('#modal').modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output);
                $('#modal').modal();
            });
        }
    }(jQuery));

	(function($){
		$.fn.searchSystemRequest = function(){
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
		$.fn.searchCalendarReport = function(){
			var $obj = this;
			var data = {
				report:$obj.find('[name="report"]').val(),
				from:$obj.find('[name="from"]').val(),
				to:$obj.find('[name="to"]').val(),
			};
			location.href = jom.url+'pages/hr/calendar-report/'+data.report+'/'+data.from+'/'+data.to;
		}
	}(jQuery));

	(function($){
		$.fn.getCalendarDetail = function(){
			var $obj = this;
			var data = {
				eventId:$obj.find('[name="eventId"]').val()
			};
			var $tr = $obj.closest('tr');
			// Get column length of table
			var tdLen = $obj.closest('table').find('th').length;
			// Subtract 3 columns
			tdLen = tdLen-3;

			// Remove colspan
			$tr.find('td').each(function(){
				$(this).removeAttr('colspan');
			});
			// Add cells
			for(x=0;x<tdLen;x++){
				$tr.append('<td></td>')
			}
			// Remove form
			$tr.find('td:gt(1)').html('');
			// Populate with new data
			$.post(jom.url+'pages/hr/getCalendarDetail',{data:data},function(output){
				console.log(output);
				$tr.find('td:eq(2)').html(output.detail.department);
				$tr.find('td:eq(3)').html('<div>'+output.detail.timeFrom+'</div>'+'<div>'+output.detail.timeTo+'</div>');
				$tr.find('td:eq(4)').html('<b>'+output.detail.venue+'</b>'+'<div>'+output.detail.activity+'</div>');
				$tr.find('td:eq(5)').html(output.detail.isPosted);
				$tr.find('td:eq(6)').html(output.detail.isCancelled);
			},'json');
		}
	}(jQuery));

	(function($){
		$.fn.deleteEvent = function(){
			var $obj = this;
			var data = {
				eventId:$obj.attr('data--evt-id'),
			};
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				console.log(output);
				if(output.match(/success/ig) != null){
					$obj.closest('tr').removeClass('warning').addClass('danger').find('td').eq(6).html(1);
				}
			});
		}
	}(jQuery));

	(function($){
		$.fn.updateCalendarDetail = function(){
			var $obj = this;
			var data = {
				form:$obj.serializeArray(),
			};
			$obj.nextAll().remove();
			$obj.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.nextAll().remove();
				$obj.after(output);
				$obj.getCalendarDetail()
			});
		}
	}(jQuery));

	(function($){
		$.fn.editEvent = function(){
			var $obj = this;
			var data = {
				eventId:$obj.attr('data--evt-id'),
			};
			$obj.closest('td').next().next().attr({
				'colspan':$obj.closest('table').find('th').length-2,
			}).css({
				'text-align':'left'
			}).html(jom.loading).nextAll().remove();
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$obj.closest('td').next().next().html(output);
			});
		}
	}(jQuery));

	(function($){
		$.fn.postEvent = function(){
			var $obj = this;
			var data = {
				eventId:$obj.attr('data--evt-id'),
			};
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				console.log(output);
				if(output.match(/success/ig) != null){
					$obj.closest('tr').removeClass('warning').addClass('success').find('td').eq(5).html(1);
				}
			});
		}
	}(jQuery));

	(function($){
		$.fn.saveCalendarActivity = function(){
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
		$.fn.changeCalendarDate = function(){
			var $obj = this;
			var date = {
				month:$obj.closest('form').find('[name="month"]').val(),
				year:$obj.closest('form').find('[name="year"]').val(),
			}
			var data = {
				type:$obj.attr('data--calendar-type'),
			}
			location.href = jom.url+'pages/hr/'+data.type+'/'+date.year+'-'+date.month;
		}
	}(jQuery));

	(function($){
		$.fn.toggleCalendarForm = function(){
			var $obj = this;
			var $form = $('form[data--form-id="saveCalendarActivity"]');

			if($form.next('.alert').length > 0){
				location.reload();
			}else{
				$('.calendar-box').toggle();
				$form[0].reset();
				$form.nextAll().remove();
				$form.toggle();
				$form.find('[name="dateFrom"],[name="dateTo"]').val($obj.attr('data--date'));
			}
		}
	}(jQuery));

	(function($){
		$.fn.changeStatDate = function(){
			var $obj = this;
			var data = {
				from:$('#statFrom').text().trim(),
				to:$('#statTo').text().trim(),
			};
			data.prompt = {
				from:data.from,
				to:data.to
			}
			if($obj.is('#statFrom')){
				data.prompt.from = prompt('Enter new date: (6 digit number only yyyymm)',data.from);
				data.prompt.from = data.prompt.from.substring(0,6);
			}else{
				data.prompt.to = prompt('Enter new date',data.to);
				data.prompt.to = data.prompt.to.substring(0,6);
			}

			if(isNaN(data.prompt.from) || isNaN(data.prompt.to)){
				alert('Please enter numbers only!');
			}else if(data.prompt.to < data.prompt.from){
				alert('Invalid date!');
			}else if(data.prompt.to.length < 6 || data.prompt.from.length < 6){
				alert('Date must be in yyyymm format');
			}else{
				$('#statFrom').text(data.prompt.from);
				$('#statTo').text(data.prompt.to);

				$.get(jom.url+'pages/hr/itStat/'+data.prompt.from+'/'+data.prompt.to,function(output){
					$obj.closest('.panel').replaceWith(output);
				});
			}
		}
	}(jQuery));

	(function($){
		$.fn.setDtrTimeManual = function(){
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
		$.fn.printTimeAdjust = function(){
			var $obj = this;
			var data = {
				inputs:$('#timeAdjust :input').map(function(){
					if($(this).closest('.row').find(':input').filter(function(){
						return this.value == ''
					}).length == 0){
						/*var ar = new Array();
						ar[$(this).closest('label').find('b').text()] = $(this).val();
						return ar;*/
						return $(this).val()+';;'+$(this).attr('name');
					}
				}).get(),
				size:$('.time-adjust-row').eq(0).find(':input').length
			}
			if(data.inputs.length > 0){
				$('#timeAdjust').nextAll().remove();
				$('#timeAdjust').after(jom.loading);
				$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
					$('#timeAdjust').nextAll().remove();
					//$('#timeAdjust').after(output);
					var data = {
						win:window.open()
					};
					data.win.document.title = "UERM Time Adjustment Form";
					$(data.win.document.body).html(output);
					//jom.modal('close');
				});
			}
		}
	}(jQuery));

	(function($){
		$.fn.timeAdjustment = function(){
			var $obj = this;
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{},function(output){
				jom.modal('show',output);
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.createSystem = function(){
			var $obj = this;
			var $container = $obj.closest('label');
			var data = {
				sysName:$container.find('.form-control').val()
			};
			$container.nextAll().remove();
			$container.after(jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				$container.nextAll().remove();
				$container.after(output);
				if(output.match(/success/ig) != null){
					location.reload();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.removeSystem = function(){
			var $obj = this;
			var data = {
				id:$obj.attr('data--sys-id'),
			}
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				console.log(output);
				$obj.closest('[class*=col]').remove();
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.updateMobileNo = function(){
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
		$.fn.changePassword = function(){
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
		$.fn.saveSysRequest = function(){
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
					$obj[0].reset();
					$obj.find('[name="newSystem"]').closest('label').hide();
					$('#sysReqHistory').refreshSysReqHistory();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.refreshSysReqHistory = function(){
			var $obj = this;
			$obj.html(jom.loading);
			$.post(jom.url+'pages/hr/sysReqHistory',{},function(output){
				$obj.replaceWith(output);
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.cancelSysReq = function(){
			var $obj = this;
			if($obj.is('form')){
				var data = {
					form:$obj.serializeArray()
				}
			}else{
				var data = {
					id:$obj.attr('data--id'),
				};
			}
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
				jom.modal('show','<div>'+output+'</div>');
				if(output.match(/success/ig) != null){
					$('#sysReqHistory').refreshSysReqHistory();
				}
			});
		}
	}(jQuery));
	
	(function($){
		$.fn.viewHistory = function(){
			var $obj = this;
			jom.modal('open',jom.loading);
			$.post(jom.url+$obj.attr('data--url'),{},function(output){
				jom.modal('show','<div>'+output+'</div>');
			});
		}
	}(jQuery));

	$(document).on('change','form[data--form-id="saveSysRequest"] [name="type"]',function(){
		if($(this).val() == 'n'){
			$(this).closest('form').find('[name="newSystem"]').closest('label').show();
			$(this).closest('form').find('[name="system"]').removeAttr('required');
			$(this).closest('form').find('[name="newSystem"]').attr('required','required');
		}else{
			$(this).closest('form').find('[name="newSystem"]').closest('label').hide();
			$(this).closest('form').find('[name="system"]').attr('required','required');
			$(this).closest('form').find('[name="newSystem"]').removeAttr('required');
		}
		$(this).closest('form').find('[name="newSystem"]').val('');
		$(this).closest('form').find('[name="system"]').prop('checked',false);
	});

	// CHECK NEW ANNOUNCEMENT AND MAKE MODAL
	if($('body').find('.new').length > 0){
		var newItems = $('body').find('.new').map(function(){
			var maxLife = 3;
			var $date = {
				item:new Date($(this).attr('data-date')).getTime(),
				today:new Date().getTime(),
			}
			$date.diff = parseInt(($date.today - $date.item) / (24*3600*1000));
			console.log($date);
			if($date.diff < maxLife){
				console.log({
					'date':$(this).attr('data-date'),
					'days':$date.diff,
				});
				return '<div style="margin:15px;position:relative" title="This message will disappear in '+(maxLife - $date.diff)+' day/s" data--life="'+(maxLife - $date.diff)+'">'+$(this).get(0).outerHTML+'</div>';
			}
		}).get();

		// console.log(newItems);return;

		if(newItems.length > 0){
			var items = '';
			newItems.forEach(function(val,key){
				items+= val;
			});
			var labelNew = '<div class="label label-danger" style="display: block;font-size: 2rem;padding: 1rem 2rem;text-align: left;"><b class="fa fa-warning"></b> New announcements are displayed for 3 days</div>';
			var closeBtn = '<a href="#close-modal" rel="modal:close" class="label label-primary" style="display: block;font-size: 1.3rem;padding: 1rem 2rem;text-align: center;"><b class="fa fa-remove"></b> Close</a>';
			jom.modal('open',jom.loading);
			jom.modal('show',labelNew + items + closeBtn);
		}
	}

	$(document).on('change','#dtr-summary select',function(){
		var url = jom.url+'pages/hr/getDTRSummary/'+$(this).attr('data--code')+'/'+$(this).val();
		$.get(url,function(output){
			$('#dtr-summary').replaceWith(output);
		});
	});
});