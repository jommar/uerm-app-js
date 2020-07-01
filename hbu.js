$(document).ready(function(){
    (function($){
        $.fn.search_report = function(){
            var $obj = this;
            var data = {
                type:$obj.find('[name="type"]').val(),
                from:$obj.find('[name="dateFrom"]').val(),
                to:$obj.find('[name="dateTo"]').val(),
            };
            location.href = `${$obj.attr('data--url')}${data.type}/${data.from}/${data.to}`;
        }
    }(jQuery));
});