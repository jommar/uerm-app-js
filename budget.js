(function($){
  $.fn.processEstActual = function(){
    var $obj = $('.rowEstActual:first');
    if($obj.length > 0){
      var data = {
        accountCode:$obj.find('td:eq(0)').text(),
        deptCode:$obj.find('td:eq(1)').text(),
        amount:$obj.find('td:eq(2)').text(),
        fy:$obj.find('td:eq(3)').text(),
      }
      $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
        jom.modal('show','<div>'+output+'</div>');
        $obj.remove();
        $().processEstActual();
      });
    }else{
      $('.tblEstActual').remove();
    }
  }
}(jQuery));

(function($){
  $.fn.restoreFinalDept = function(){
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
  $.fn.resolveComments = function(){
    var $obj = this;
    var data = {
      dept:$obj.attr('data--dept'),
      fy:$obj.attr('data--fy'),
    };
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
  $.fn.fetchCommentHistory = function(){
    var $obj = this;
    var data = {
      id:$obj.attr('data--search'),
      type:$obj.attr('data--type'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.viewComment = function(){
    var $obj = this;
    var data = {
      commentId:$obj.attr('data--comment-id'),
      type:$obj.attr('data--type'),
      capexId:$obj.attr('data--capex-id'),
      opexCategory:$obj.attr('data--opex-category'),
      dept:$obj.attr('data--dept'),
      fy:$obj.attr('data--fy'),
    };
    $obj.trOutput('show');
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.trOutput(output);
      $('[data--form-id="saveCapex"]').attr('data--form-id','updateCapex');
      $('[data--form-id="updateCapex"]').attr('data--url','budget/updateCapex');
      jom.initCapex('updateCapex');
    });
  }
}(jQuery));

(function($){
  $.fn.saveRevenue = function(){
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
  $.fn.removeCapex = function(){
    var $obj = this;
    var data = {
      capexId:$obj.attr('data--capex-id'),
      dept:$obj.attr('data--dept'),
    };
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $('#capexList').load(jom.url+'budget/capexList/'+data.dept);
    });
  }
}(jQuery));

(function($){
  $.fn.saveNewItem = function(){
    var $obj = this;
    var data = {
      item:$obj.find('[name="item"]').val(),
      ucost:$obj.find('[name="ucost"]').val(),
      usage:$obj.find('[name="usage"]').val(),
    };
    $('.s-item-container').find('tbody').append('<tr><td>'+data.item+'</td><td></td><td></td><td></td><td></td><td data--unit-cost>'+data.ucost+'</td><td><input style="height:initial;padding:3px 8px;font-size:1.2rem" type="number" data--u-month step="any" required class="form-control" placeholder="Annual Usage" value="'+data.usage+'" data--item-code="'+data.item+'" /></td></tr>');
    $('.s-item-container,.s-item-btn').show();
    $('.s-item-search').hide().html('');
  }
}(jQuery));

(function($){
  $.fn.budgetReportDetail = function(){
    var $obj = this;
    
    $('#detailContainer').html(jom.loading).load($obj.attr('data--url'),function(){
      $('.panel-right>div').scrollTop($('#detailContainer').position().top);
    });
  }
}(jQuery));

(function($){
  $.fn.saveComment = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
      $('[data--form-id="searchDeptBudget"]').submit();
    });
  }
}(jQuery));

(function($){
  $.fn.commentOpex = function(){
    var $obj = this;
    var data = {
      data:$obj.attr('data--data'),
      category:$obj.attr('data--expense-category'),
      deptCode:$obj.attr('data--dept-code'),
    };
    $obj.closest('.panel').find('comment-opex').html(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.closest('.panel').find('comment-opex').html(output);
    });
  }
}(jQuery));

(function($){
  $.fn.commentCapex = function(){
    var $obj = this;
    var data = {
      data:$obj.attr('data--data'),
      deptCode:$obj.attr('data--dept-code'),
    };
    $obj.closest('.panel').find('comment-capex').html(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.closest('.panel').find('comment-capex').html(output);
    });
  }
}(jQuery));

(function($){
  $.fn.searchDeptBudget = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
      deptName:$obj.find('[name="department"]').children(':selected').text(),
      deptCode:$obj.find('[name="department"]').val(),
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
  $.fn.finalizeBudget = function(){
    var $obj = this;
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.addAccessRights = function(){
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
  $.fn.updateAccountDetail = function(){
    var $obj = this;
    var data = {
      form:$obj.attr('data--data'),
      val:$obj.closest('td').find('.form-control').val()
    };
    $obj.trOutput('show');
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.trOutput(output);
    });
  }
}(jQuery));

(function($){
  $.fn.saveConfig = function(){
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
  $.fn.viewAccountDetails = function(){
    var $obj = this;
    var data = {
      fy:$obj.attr('data--fy'),
      accountCategory:$obj.attr('data--account-category'),
      accountCode:$obj.attr('data--account-code'),
      accountDesc:$obj.attr('data--account-desc'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.saveEstActual = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.nextAll().remove();
      $obj.after(output);
      if(output.match(/error/ig) == null){
        jom.modal('open',jom.loading);
        $().processEstActual();
      }
    });
  }
}(jQuery));

(function($){
  $.fn.budgetReportSummary = function(){
    var $obj = this;

    $('#detailContainer').html(jom.loading).load($obj.attr('data--url'),function(){
      $('.panel-right>div').scrollTop($('#detailContainer').position().top);
    });
  }
}(jQuery));

(function($){
  $.fn.saveBudgetByDept = function(){
    var $obj = this;
    var data = {
      accountCode:$obj.attr('data--account-code'),
      dept:$obj.closest('form').find('[name="department"]').val(),
      val:$obj.val(),
      fy:$obj.attr('data--fy'),
    }
    $.post(jom.url+'budget/saveBudgetByDept',{data:data},function(output){
      console.log(output);
    });
  }
}(jQuery));

(function($){
  $.fn.deleteBudget = function(){
    var $obj = this;
    var data = {
      id:$obj.attr('data--b-id'),
      accountCode:$obj.attr('data--account-code'),
      fy:$obj.attr('data--fy'),
      dept:$obj.attr('data--dept'),
    };
    $('#honList').html(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $('#detailList').load(jom.url+'budget/detailList/'+data.fy+'/'+data.accountCode+'/'+data.dept+'/HON');
      $('#opexContainer').load(jom.url+'budget/opexForm/'+data.dept);
      console.log(output);
    });
  }
}(jQuery));

(function($){
  $.fn.saveDetails = function(){
    var $obj = $('[data--form-id="saveDetails"]');
    var data = {
      form:$obj.serializeArray(),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj[0].reset();
      $obj.nextAll().remove();
      $obj.after(output);
      $('#detailList').load(jom.url+'budget/detailList/'+$('[name="fy"]').val()+'/'+$('[name="account"]').val()+'/'+$('[name="dept"]').val()+'/HON');
      $('#opexContainer').load(jom.url+'budget/opexForm/'+$('[data--form-id="saveDetails"] [name="dept"]').val());
      if($('.tr-output').length > 0){
        $('[data--module="searchAccount"]').closest('tr').prev().find('[data--module="viewComment"]').click();
      }
    });
  }
}(jQuery));

(function($){
  $.fn.saveSupplies = function(){
    var $obj = this;
    var dept = $('[data--form-id="saveSupplies"]').find('[name="dept"]').val();
    $('[data--u-month]').filter(function(){
      return parseInt($(this).val()) == 0
    }).closest('tr').hide();
    var data = {
      vals:$('[data--u-month]:visible').map(function(){
        var data = {
          itemCode:$(this).attr('data--item-code'),
          usage:$(this).val(),
          ucost:parseFloat($(this).closest('tr').find('[data--unit-cost]').text()),
          account:$(this).closest('form').find('[name="account"]').val(),
          dept:$(this).closest('form').find('[name="dept"]').val(),
          fy:$(this).closest('form').find('[name="fy"]').val(),
        }
        return JSON.stringify(data);
      }).get().join(';;'),
      info:{
        dept:$obj.attr('data--dept'),
        account:$obj.attr('data--account'),
      }
    };
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $('#opexContainer').load(jom.url+'budget/opexForm/'+data.info.dept);
      $('.modal div').html(output);
    });
  }
}(jQuery));

(function($){
  $.fn.cancelItemSearch = function(){
    var $obj = this;
    $('.s-item-container,.s-item-btn').show();
    $('.s-item-search').hide().html('');
  }
}(jQuery));

(function($){
  $.fn.addItemList = function(){
    var $obj = this;
    var data = {
      itemCode:$obj.attr('data--item-code'),
      usage:$obj.closest('label').find('[name="usage"]').val(),
      details:$obj.data('-details')
    }
    if($('[data--item-code="'+data.itemCode+'"].form-control').length > 0){
      console.log($('[data--item-code="'+data.itemCode+'"]'));
      $('[data--item-code="'+data.itemCode+'"].form-control').val(parseInt($('[data--item-code="'+data.itemCode+'"].form-control').val()) + parseInt(data.usage));
      var $tr = $('[data--item-code="'+data.itemCode+'"].form-control').closest('tr');
      var ucost = parseFloat($tr.find('[data--unit-cost]').text());
      var usage = parseFloat($tr.find('[data--item-code]').val());

      $tr.find('[data--total-cost]').text(ucost * usage);
    }else{
      console.log(123);
      $('.s-item-container').find('tbody').append('<tr><td>'+data.details['ITEM CODE']+'</td><td>'+data.details['GENERIC']+'</td><td>'+data.details['BRAND']+'</td><td>'+data.details['MG']+'</td><td>'+data.details['UOM']+'</td><td data--unit-cost>'+data.details['UCOST']+'</td><td><input style="height:initial;padding:3px 8px;font-size:1.2rem" type="number" data--u-month step="any" required class="form-control" placeholder="Annual Usage" value="'+data.usage+'" data--item-code="'+data.details['ITEM CODE']+'" /></td></tr>');
    }
    $('.s-item-container,.s-item-btn').show();
    $('.s-item-search').hide().html('');
  }
}(jQuery));

(function($){
  $.fn.itemSearch = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url')+'/search',{data:data},function(output){
      $obj.nextAll().remove();
      $obj.after(output);
    });
  }
}(jQuery));

(function($){
  $.fn.searchItem = function(){
    var $obj = this;
    $('.s-item-container,.s-item-btn').hide();
    $('.s-item-search').show().html(jom.loading);
    $.post(jom.url+$obj.attr('data--url')+'/'+$obj.attr('data--account-code'),{},function(output){
      $('.s-item-search').html(output);
    });
  }
}(jQuery));

(function($){
  $.fn.searchAccount = function(){
    var $obj = this;
    var data = {
      account:$obj.attr('data--account-code'),
      dept:$obj.attr('data--dept'),
      template:$obj.attr('data--template'),
      accountDesc:$obj.attr('data--account-desc'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.saveDeptAccount = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.nextAll().remove();
      $obj.after(output);
      $('#groupList').load(jom.url+'budget/deptGroups');
      $('#deptList').load(jom.url+'budget/deptList');
    });
  }
}(jQuery));

(function($){
  $.fn.deptMaintenance = function(){
    var $obj = this;
    var data = {
      dept:$obj.attr('data--dept'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.saveHead = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.nextAll().remove();
      $obj.after(output);
      $('#groupList').load(jom.url+'budget/deptGroups');
    });
  }
}(jQuery));

(function($){
  $.fn.addHeadToGroup = function(){
    var $obj = this;
    var data = {
      group:$obj.attr('data--grp-no'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.updateCapex = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
      dept:$obj.attr('data--dept'),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      if($('[data--module="viewComment"]').length > 0){
        $obj.nextAll().remove();
        jom.modal('open',jom.loading);
        jom.modal('show','<div>'+output+'</div>');
        $obj.closest('tr').prev().remove();
        $obj.closest('tr').remove();
      }else{
        $obj.nextAll().remove();
        $obj.after(output);
        $('#capexList').load(jom.url+'budget/capexList/'+data.dept);
      }
    });
  }
}(jQuery));

(function(){
  $.fn.editCapexInfo = function(){
    var $obj = this;
    var data = {
      detail:$obj.attr('data--detail'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
      $('.modal [data--form-id="saveCapex"]').attr('data--form-id','updateCapex');
      $('.modal [data--form-id="updateCapex"]').attr('data--url','budget/updateCapex');
      jom.initCapex('updateCapex');
    });
    /*var json = JSON.parse(data.detail);
    $('[name="revenue"]').val(json.revenue);
    $('[name="category"]').val(json.category);
    $('[name="description"]').val(json.description).attr('readonly','readonly');
    $('[name="purpose"]').val(json.purpose);
    $('[name="benefits"]').val(json.benefits);
    $('[name="risks"]').val(json.risks);
    $('[name="alternatives"]').val(json.alternatives);
    $('[name="estimateProcedures"]').val(json.estimateProcedures);
    $('[name="estimateAcquisition"]').val(json.amt);
    $('[name="estimateDate"]').val(json.estimateDate);
    $('[name="estimateLife"]').val(json.estimateLife);
    $('[name="location"]').val(json.location);
    $('[name="renovation"]').val(json.renovation);
    $('[name="reqElectrical"]').val(json.electrical);
    $('[name="reqSafety"]').val(json.safety);
    $('[name="additionalManpower"]').val(json.additional);
    $('[name="trainings"]').val(json.trainings);*/
  }
})

(function($){
  $.fn.viewCapexDetail = function(){
    var $obj = this;
    var data = {
      //detail:$obj.data('-detail'),
      detail:$obj.attr('data--detail'),
    }
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.saveCapex = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
      dept:$obj.attr('data--dept'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      if(output.match(/success/ig)){
        $obj[0].reset();
      }
      jom.modal('show','<div>'+output+'</div>');
      $('#capexList').load(jom.url+'budget/capexList/'+data.dept);
    });
  }
}(jQuery));

(function($){
  $.fn.confirmChangeDept = function(){
    var $obj = this;
    var url = jom.url+$obj.attr('data--url')+$('[data--nav].active').attr('data--nav')+'/'+$obj.closest('.panel').find('[name="department"]').val();
    location.href = url;
  }
}(jQuery));

(function($){
  $.fn.changeDept = function(){
    var $obj = this;
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url')+'/'+$obj.attr('data--dept'),{},function(output){
      jom.modal('show','<div>'+output+'</div>');
    });
  }
}(jQuery));

(function($){
  $.fn.saveOpex = function(){
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
  $.fn.removeBudgetAccount = function(){
    var $obj = this;
    var data = {
      accCode:$obj.attr('data--account-code')
    };
    $container = $obj.closest('.map-container');
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      console.log(output);
      $obj.closest('.map-account').remove();
      if($container.find('.map-account').length == 0){
        $container.remove();
      }
    });
  }
}(jQuery));

(function($){
  $.fn.updateDeptGroup = function(){
    var $obj = this;
    var data = {
      form:$obj.serializeArray(),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.nextAll().remove();
      $obj.after(output);
      $('#groupList').load(jom.url+'budget/deptGroups');
    });
  }
}(jQuery));

(function($){
  $.fn.addDeptToGroup = function(){
    var $obj = this;
    var data = {
      group:$obj.attr('data--grp-no'),
    };
    jom.modal('open',jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      jom.modal('show','<div>'+output+'</div>');
      $('.modal').find('form').attr('data--form-id','updateDeptGroup');
      $('.modal').find('form').attr('data--url','budget/updateDeptGroup');
      $('.modal').find('form label:first').before('<input type="hidden" name="grp" value="'+data.group+'" />');
      $('.modal').find('form [name="department"]').attr('required','required');
    });
  }
}(jQuery));

(function($){
  $.fn.removeDeptFromGroup = function(){
    var $obj = this;
    var data = {
      id:$obj.attr('data--grp-id'),
    };
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      console.log(output);
      if(output.match(/success/ig) != null){
        var $div = $obj.closest('[class*="col"]');
        $obj.closest('.list-group-item').remove();
        if($div.find('.list-group-item').length == 1){
          $div.remove();
        }
      }
    });
  }
}(jQuery));

(function($){
  $.fn.saveDeptGroup = function(){
    var $obj = this;
    var data = {
      depts:$('[name="department"][name="department"]').filter(function(){
      	return $(this).val()
      }).map(function(){
      	return $(this).val()
      }).get().join(),
    };
    $obj.nextAll().remove();
    $obj.after(jom.loading);
    $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
      $obj.nextAll().remove();
      $obj.after(output);
      if(output.match(/success/ig) != null){
        $('#groupList').load(jom.url+'budget/deptGroups');
      }
    });
  }
}(jQuery));

(function($){
  $.fn.saveBudgetMap = function(){
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
        $('#mapList').load(jom.url+'budget/mapList');
      }
    });
  }
}(jQuery));

function initAmt(){
  $('form[data--form-id="saveSummary"] .form-group').each(function(){
    var amt = 0;
    $(this).find('.form-control').each(function(){
      amt+= parseFloat($(this).val());
    });
    $(this).find('[data--total-grp]').text(amt.toLocaleString());
  });
}

$(document).on('keyup change','form[data--form-id="saveSummary"] .form-control',function(){
  initAmt();
});

$(document).on('click focus','form[data--form-id="saveSummary"] .form-control',function(){
  $(this).select();
});

$(document).on('change','[data--form-id="uploadItemized"] [type="file"]',function(){
  var $obj = $(this);
  var data = {
    form:$obj.closest('form').serialize(),
  }
  console.log(data);
  $obj.uploadNew(jom.url+'budget/uploadItemized',{data:data},function(output){
    console.log(output);
  },$('progress'));
});

$(document).on('change','form[data--form-id="saveDeptGroup"] :input',function(){
  if($('.modal').is(':visible')){
    return;
  }
  if($(this).val() != '' &&
    $('form[data--form-id="saveDeptGroup"] [name="department"]').filter(function(){
    	return !$(this).val()
    }).length == 0
  ){
    var $obj = $(this).closest('form');
    var $clone = $(this).closest('label').clone();
    $clone.find(':input').val('');
    $(this).closest('label').after($clone);
  }
  var ar = [];
  $('form[data--form-id="saveDeptGroup"] [name="department"]').each(function(){
    var myVal = $(this).val();
    if(ar.indexOf(myVal) == -1){
      ar.push(myVal);
    }else{
      $(this).closest('label').remove();
    }
  });
});

$(document).on('click','[data--copy]',function(){
  var data = {};
  data.obj = $(this).attr('data--copy');
  data.val = $(this).closest('label').find(data.obj).val();
  console.log(data);
  $(this).closest('label').nextAll().each(function(){
    $(this).find(data.obj).val(data.val);
  })
});

$(document).on('change','[data--form-id="saveBudgetByDept"] .form-control',function(){
  $obj = $(this).closest('label').find('.account-save-container');
  if($(this).is('select')){
    $('#budgetAccounts').load(jom.url+'budget/budgetAccounts/'+$(this).val());
  }else{
    $obj.html('<b class="fa fa-check"></b>');
    $(this).saveBudgetByDept();
  }
});
$(document).on('keypress','[data--form-id="saveBudgetByDept"] .form-control',function(){
  $obj = $(this).closest('label').find('.account-save-container');
  $obj.html('');
});