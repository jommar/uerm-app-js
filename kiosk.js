$(document).ready(function(){
    $(function(){
        $.fn.printOTSelected = function(){
            var $obj = this;
            var data = {
                otid:$('[name="otcheckbox"]:checked').map(function(){
                    return $(this).val()
                }).get().join(),
            };
            var url = jom.url+$obj.attr('data--url')+'/'+btoa(data.otid);
            window.open(url);
        }
    });
});