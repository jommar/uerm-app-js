$(document).ready(()=>{
    (function($){
        $.fn.saveImapCharges = function(){
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
        $.fn.printReport = function(){
            var $obj = this;
            var data = {
                html:$('[data--form-id="searchReport"]').next().find('table').parent().parent().html(),
                from:$('#imapDateFrom').text(),
                to:$('#imapDateTo').text(),
                type:$('#imapType').text(),
                win:window.open(),
            };
            // if(data.type == 'Transmittal'){
                var dt = {
                    reqNo:$('[data--req-no]').map(function(){
                        return $(this).attr('data--req-no')
                    }).get().join(),
                    type:data.type
                }

                $.post(jom.url+'imap/saveTimer',{data:dt},function(output){
                    console.log(output);
                });
            // }
            data.win.document.title = 'UERM Imap Report: '+data.type+' '+data.from+' - '+data.to;
            $(data.win.document.body).html(data.html);
            $(data.win.document.body).find('.no-print').remove();
            $(data.win.document.body).find('table,td,th').css({
                'border':'solid .5px #000',
            });
            $(data.win.document.body).find('table').css({
                'border-spacing':'0',
                'border-collapse':'collapse',
                'width':'100%',
            });
            $(data.win.document.body).find('*').css({
                'font-size':'10px'
            });
            $(data.win.document.body).find('.sign-margin').css({
                'margin-top':'.5in'
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchReport = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray()
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
        $.fn.saveImap = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            jom.modal('open',jom.loading);
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                jom.modal('show',output);
                $('[data--module="viewAllCases"]').viewAllCases(function(){
                    $('[data--module="searchImapCase"][data--caseno="'+data.form[0].value+'"]').eq(0).searchImapCase();
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.viewAllCases = function(fn){
            var $obj = $('.case-list');
            $obj.nextAll().remove();
            $obj.html(jom.loading);
            $.post(jom.url+this.attr('data--url'),{},(output)=>{
                $obj.replaceWith(output);
                if(fn != undefined){
                    fn();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.tagCases = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            var url = jom.url+$obj.attr('data--url');
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post(url,{data:data},(output)=>{
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/ig) != null && $('[name="type"][data--opd="1"]').length > 0){
                    $.post(jom.url+'imap/caseList',{},function(output){
                        $obj.parent().next().replaceWith(output);
                    });
                    /*$obj.parent().next().prepend(`<a href="#" data--module="searchImapCase" data--caseno="${$obj.find('[name="caseNo"]').val()}" data--url="imap/searchImapCase" class="list-group-item">${$obj.find('[name="caseNo"]').val()}</a>`)*/
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.searchImapCase = function(){
            var $obj = this;
            var data = {
                caseno:$obj.attr('data--caseno'),
                reqno:$obj.attr('data--req-no'),
            };
            var url = jom.url+$obj.attr('data--url');
            $obj.closest('.list-group').nextAll().remove();
            $obj.closest('.list-group').parent().nextAll().remove();
            $obj.closest('.list-group').after(jom.loading);
            $obj.closest('.list-group').find('.list-group-item').not(this).remove();
            $.post(url,{data:data},(output)=>{
                $obj.closest('.list-group').nextAll().remove();
                $obj.closest('.list-group').parent().after(output);
            });
        }
    }(jQuery));
});