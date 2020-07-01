
(function($){
    $.fn.selectAdmissionPatient = function(){
        var $obj = this;
        var data = {
            patientno:$obj.attr('data--patient-no'),
        };
        $form = $obj.closest('form');
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            console.log(output);
            console.log($form);
            $form.find('[name="patientno"]').val(data.patientno);
            $form.find('[name="lastname"]').val(output.LASTNAME);
            $form.find('[name="firstname"]').val(output.FIRSTNAME);
            $form.find('[name="middlename"]').val(output.MIDDLENAME);
            $form.find('[name="extensionname"]').val(output.EXTNAME);
            $form.find('[name="gender"]').val(output.GENDER.substring(0,1));
            $form.find('[name="birthdate"]').val(output.BIRTHDATE);
            $form.find('[name="presentAddress"]').val(output.PRESENTADDRESS);
            $form.find('[name="permanentAddress"]').val(output.PERMANENTADDRESS);
            $form.find('[name="zipcode"]').val(output.ZIPCODE);
            $form.find('[name="religion"]').val(output.RELIGION);
            $form.find('[name="nationality"]').val(output.NATIONALITY);
            $form.find('[name="occupation"]').val(output.OCCUPATION);
            jom.modal('close');
            $obj.closest('#patientSearchOutput').html('');
        },'json');
    }
}(jQuery));

(function($){
    $.fn.setRoom = function(){
        var $obj = this;
        var data = {
            room:$obj.attr('data--room'),
            status:$obj.attr('data--status'),
            rand:(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,4).toUpperCase(),
        };
        if(data.status != 'VACANT CLEAN'){
            var str = prompt('Room is already occupied, to continue admission to occupied room please type the code: '+data.rand);
        }
        if(str==data.rand || typeof str == 'undefined'){
            $('[data--form-id="admissionInfo"]').find('[name="room"]').val(data.room);
            jom.modal('close');
        }else{
            alert('Invalid Code.');
        }
    }
}(jQuery));

(function($){
    $.fn.loadPatientCred = function(){
        var $obj = this;
        var data = {
            code:$obj.attr('data--code'),
            campus:$obj.attr('data--campus'),
            last:$obj.attr('data--name-l'),
            first:$obj.attr('data--name-f'),
            middle:$obj.attr('data--name-m'),
        };
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            var json = $.parseJSON(output);
            if(json === false){
                console.log('not jason');
            }else{
                console.log(json);
            }
        });
    }
}(jQuery));

(function($){
    $.fn.searchActiveInf = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray()
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
    $.fn.searchUEPatient = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray()
        }
        jom.modal('open',jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            jom.modal('show','<div>'+output+'</div>');
        });
    }
}(jQuery));

(function($){
    $.fn.roomList = function(){
        var $obj = this;
        jom.modal('open',jom.loading);
		$.post(jom.url+$obj.attr('data--url'),{},function(output){
			jom.modal('show','<div>'+output+'</div>');
		});
    }
}(jQuery));

(function($){
    $.fn.searchExistingPatients = function(){
        var $obj = this;
        var data = {
            last:$obj.closest('.panel').find('[data--name-type="last"]').val(),
            first:$obj.closest('.panel').find('[data--name-type="first"]').val(),
            middle:$obj.closest('.panel').find('[data--name-type="middle"]').val(),
        };
        $('#patientSearchOutput').html(jom.loading);
        if(jom.xhr){
            jom.xhr.abort();
        }
        jom.xhr = $.post(jom.url+'admitting/searchPatient',{data:data},function(output){
            $('#patientSearchOutput').html(output);
            jom.xhr = null;
        });
        /*var data = {};
        data.type = $obj.attr('data--name-type');
        data.value = $obj.val();
        data.src = jom.url+'post/hospital/getPatientName/'+data.type+'/'+data.value;
        $obj.autocomplete({
            minLength:2,
            source:data.src,
        });*/
    }
}(jQuery));

(function($){
    $.fn.assignRoom = function($param){
        var $obj = this;
        if($param.closest('.btn-group').find('.btn').hasClass('btn-danger')){
            alert('Room already taken. Please select a vacant room.');
            $obj.find('[name="room"]').val('');
        }else{
            $obj.find('[name="room"]').val($param.attr('data--room-id'));
            $obj.find('[name="room"]').focus();
        }
    }
}(jQuery));

$(document).on('keyup','[data--form-id="patientInfo"] [data--name-type]',function(e){
    /*var key = e.which.toString();
    if(key.match(/9|13|16|20|144|17|18/) != null){
        e.preventDefault();
    }else{
        $(this).searchExistingPatients();
    }*/
    $(this).searchExistingPatients();
    $(this).closest('form').find('[name="patientno"]').val('');
});