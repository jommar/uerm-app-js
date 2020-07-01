$(document).ready(function(){
    //start plugin
    (function($){
        $.fn.limitChar = function(){
            $(this).on({
                'input':function(){
                    length = {
                        max:$(this).attr('-maxlength'),
                        cur:$(this).val().length
                    }; 
                    if (length.cur >= length.max) {
                        $(".count").text("You reached the limit");            
                    }
                    else {
                        $(".count").text(length.max - length.cur + '  characters left');
                    }
                    var chars = $(this).val().substr(0,length.max);
                    $(this).val(chars);
                },           
            })
        }
    }(jQuery));

    (function($){
        $.fn.callPage = function(){
            $(this).on({
                'click':function(){
                    $(".pages-container").show();
                }
            })
        }
    }(jQuery));
    //end plugin

    //start  event listener
    $('#tblPhonebook').DataTable( {
        "pagingType": "full_numbers"
    });
    $(".message").limitChar();  
    $('a[href="#"]').callPage(); 
    //end  event listener
});
