$(document).ready(function(){
    (function($){
        $.fn.changeYear = function(){
            var $obj = this;
            var data = {
                year:$obj.closest('label').find('[name="year"]').val(),
            };
            $.get(jom.url+'analytics/employee/setYear/'+data.year,function(output){
                location.reload();
            });
        }
    }(jQuery));

    (function($){
        $.fn.drillDown = function(){
            var $obj = this;
            var data = {
                qry:$obj.attr('data--qry'),
                col:$obj.attr('data--col'),
                heading:$obj.attr('data--heading'),
            };
            $('#modal').html(jom.loading).modal('show');
            $.get(jom.url+$obj.attr('data--url')+'/'+data.qry+'/'+data.col+'/'+data.heading,function(output){
                $('#modal').html(output).modal();
            });
        }
    }(jQuery));

    $('table.highchart').highchartTable();
    // $('table.highchart').parent().hide();

    // Generate links
    $('table.highchart').find('td').each(function(){
        $firstCol = $(this).closest('tr').find('td:eq(0)');
        qry = $(this).closest('table').attr('data--qry-type');
        heading = $(this).closest('table').find(`th:eq(${$(this).index()})`).text();

        // $(this).text(parseFloat($(this).text().trim()).toLocaleString());
        $(this).text($(this).text().trim());
        $(this).wrapInner(`<a href="#" data--url="analytics/employee/details" data--heading="${heading}" data--module="drillDown" data--col="${$firstCol.text()}" data--qry="${qry}"></a>`);
        $(this).prepend(`<a href="${jom.url+'analytics/employee/detailsPrnt/'+qry+'/'+$firstCol.text()+'/'+heading}" target="_blank"><b class="fa fa-print"></b></a> `);
    });
});