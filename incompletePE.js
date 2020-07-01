$(document).ready(function(){

(function($){
    $.fn.search = function(){
        var $obj = this;
        var param = {
            form:$obj.serializeArray(),
        };
        $('.names-container').html(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:param},function(output){
            $('.names-container').html(output);
            $('.table').dataTable({            
                dom: 'Blfrtip',
                buttons: [
                    'excelHtml5',
                ],
                lengthMenu: [[10, 25, 50, 100, -1 ], [10, 25,50, 100, "All"]]
            });
        });        
    }
}(jQuery));

(function($){
    $.fn.setAppointment = function (){
        var $obj = this;
        var data= {
            name:$obj.attr('data--name'),
            sn:$obj.attr('data--sn'),
            semester:$obj.attr('data--semester'),
            yearLevel:$obj.attr('data--yearLevel'),
            college:$obj.attr('data--college'),
            Course:$obj.attr('data--course')
        };
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $('#modal').html(output).modal({clickClose:false});
        });
    }
}(jQuery));

(function($){
    $.fn.saveAppointment = function() { 
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };    
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){     
            $('#msg').html(output).modal();   
            
        });  
    }  
}(jQuery));  

(function($){
    $.fn.searchAppointment = function(){
        var $obj = this;
        var data = {
            form:$obj.serializeArray(),
        };
        $(".list-container").html(jom.loading);
        $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
            $('.list-container').html(output);
            $('.table').DataTable({
                "pagingType": "full_numbers"
            });    
        });
    }
}(jQuery));

(function($){
    $.fn.destroy = function(){
        var pageNum = $('.paginate_button.active').text();
        $('.table').DataTable().destroy();
        $('.comply').show();
        $('#download').exportToExcel();
        $('.table').DataTable(); 
        $('.comply').hide();
        $('.paginate_button').each(function(){
            if($(this).text() == pageNum){
                $(this).click();
            }
        });
    }
}(jQuery))

//start event listener
    $('#dateRange').click();
//end event listener
});

// var rows = $('.table').find('tbody').find('tr').length;
// var rows = $('.table tbody tr').length;
// var rows = $obj.parent().next().find('table tbody tr').length;