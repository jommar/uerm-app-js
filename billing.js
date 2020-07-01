$(document).ready(function(){
    (function($){
        $.fn.view_running_balance = function(){
            var $obj = this;
            // $obj.closest('tr').find('.bal-a').html(jom.loading);
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get(jom.url+$obj.attr('data--url'),function(output){
                // $obj.closest('tr').find('.bal-a').html(`<div style="display-none">${output}</div>`);

                // $obj.closest('tr').find('.bal-a').html($obj.closest('tr').find('.bal-a').find('.bal-b').text());
                $('#modal').html(output).modal({clickClose:false});
                $('#modal div tfoot tr')[0].scrollIntoView();
                $('#modal tr.filter-item').on('dblclick',function(){
                    $(this).toggleClass('danger')
                });
            });
        }
    }(jQuery));

    $('[name="date"][data--filter-date="discharged"]').on('change',function(){
        location.href = jom.url+'billing/discharged/'+$(this).val();
    });

    $('#filter-screener').on('change',function(){
        location.href = jom.url+'billing/mss-screener/'+$(this).val();
    });
});