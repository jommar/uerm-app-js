(function($){
	$.fn.attachQuizImg = function(){
		var $obj = this;
		jom.modal('open',jom.loading);
		$obj.upload(jom.url+$obj.attr('data--url'),{},function(output){
			console.log(output);
			jom.modal('show','<div>'+output+'</div>');
			$obj.next().val($('.modal').find('[data--filename]').attr('data--filename'));
		},$('progress'));
	}
}(jQuery));

(function($){
	$.fn.saveQuiz = function(){
		var $obj = this;
		var quiz = $obj.closest('.panel').find('[data--quiz-type="name"]').val();

		$('[data--quiz-type="option"]').each(function(){
			if($(this).val() == ''){
				$(this).closest('label').remove();
			}
		});

		if(quiz == ''){
			alert('Please enter quiz name to continue.');
		}else{
			$.post(jom.url+'pages/quiz/generateBatchNo',{},function(output){
				var batch = output;
				var $container = $obj.closest('.panel').find('.questionContainer');
				$container.each(function(){
					if($(this).find('[data--quiz-type="option"]') .length > 0 && $(this).find('[data--quiz-type="question"]').length > 0){
						var data = {}
						data.option = $(this).find('[data--quiz-type="option"]').map(function(){
								return $(this).val();
							}).get();
						data.question = $(this).find('[data--quiz-type="question"]').val();
						data.description = $(this).find('[data--quiz-type="description"]').val();
						data.attachment = $(this).find('[data--quiz-type="attachment"]').val();
						data.quiz = quiz;
						data.batch = batch;
						var $cont = $(this);

						$cont.find('.quizOutput').html(jom.loading);
						$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
							if(output.match(/success/ig) != null){
								$cont.remove();

								jom.modal('open',jom.loading);
								jom.modal('show','<div>'+output+'</div>');
								location.reload();
							}else{
								$cont.find('.quizOutput').html(output);
							}
						});
					}else{
						$(this).remove();
					}
				});
			});
		}
	}
}(jQuery));

(function($){
	$.fn.cancelQuiz = function(){
		var $obj = this;
		var data = {
			batchNo:$obj.attr('data--batchno'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
			if(output.match(/success/ig) != null){
				$obj.closest('.my-quiz-container').remove();
			}
			location.reload();
		});
	}
}(jQuery));

(function($){
	$.fn.updateQuestion = function(){
		var $obj = this;
		var data = {
			batchNo:$obj.attr('data--batchno'),
			quizId:$obj.attr('data--quiz-id'),
		}
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));

(function($){
	$.fn.attachFileBtn = function(){
		var $obj = this;
		$obj.closest('label').find('[name="upload"]').attachQuizImg();
	}
}(jQuery));

(function($){
	$.fn.setQuizOption = function(){
		var $obj = this;
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$obj.replaceWith(output);
		});
	}
}(jQuery));
(function($){
	$.fn.addQuizOption = function(){
		var $obj = this;
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$obj.before(output);
			$obj.prev().find('[data--module="setQuizOption"]').click();
		});
	}
}(jQuery));
(function($){
	$.fn.removeQuizQuestion = function(){
		var $obj = this;
		$obj.closest('.questionContainer').remove();
	}
}(jQuery));
(function($){
	$.fn.addQuizQuestion = function(){
		var $obj = this;
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$('.questionParent').append(output);
		});
	}
}(jQuery));
(function($){
	$.fn.setQuizDetail = function(){
		var $obj = this;
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$obj.replaceWith(output);
		});
	}
}(jQuery));

(function($){
	$.fn.publishQuiz = function(){
		var $obj = this;
		var data = {
			batchno:$obj.attr('data--batchno'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));
(function($){
	$.fn.saveQuizDetail = function(){
		var $obj = this;
		var data ={
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
	$.fn.answerQuiz = function(){
		var $obj = this;
		var data = {
			quizid:$obj.attr('data--quizid'),
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			if(output.match(/success/ig) != null){
				$obj.closest('.list-group').find('.list-group-item').each(function(){
					$(this).removeClass('active');
				});
				jom.modal('close');
				$obj.addClass('active');
			}else{
				jom.modal('show','<div>'+output+'</div>');
			}
			console.log(output);
			//jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));
(function($){
	$.fn.showPostTest = function(){
		var $obj = this;
		var data = {
			batchno:$obj.attr('data--batchno')
		};
		jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
	}
}(jQuery));
(function($){
	$.fn.viewQuizChart = function(){
		var $obj = this;
		var data = {
			batchno:$obj.attr('data--batchno')
		};
		$('#postOutput').html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$('#postOutput').html(output);
		});
	}
}(jQuery));
(function($){
	$.fn.viewQuiz = function(){
		$obj = this;
		$('#postOutput').html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			$('#postOutput').html(output);
		});
	}
}(jQuery));
(function($){
	$.fn.editQuizDetail = function(){
		var $obj = this;
		var data = {
			type:$obj.attr('data--type'),
			detailid:$obj.attr('data--detailId'),
			val:$obj.next('i').text(),
		};
		$('[data--module="editQuizDetail"]').closest('div').nextAll().remove();
		$obj.closest('div').nextAll().remove();
		$obj.closest('div').after(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$obj.closest('div').nextAll().remove();
			$obj.closest('div').after(output);
		});
	}
}(jQuery));
(function($){
	$.fn.updateQuizDetail = function(){
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
	$.fn.setCorrectAns = function(){
		var $obj = this;
		var data = {
			quizid:$obj.attr('data--quizid')
		};
		$obj.closest('.list-group').find('.list-group-item').each(function(){
			$(this).removeClass('active');
		});
		$obj.closest('.list-group-item').addClass('active');
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			console.log(output);
		});
	}
}(jQuery));
(function($){
	$.fn.viewQuizScore = function(){
		var $obj = this;
		var data = {
			batchno:$obj.attr('data--batchno'),
		};
		$('#postOutput').html(jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
			$('#postOutput').html(output);
		});
	}
}(jQuery));

$(document).on('change','.questionForm [name="upload"]',function(){
	$(this).attachQuizImg();
});