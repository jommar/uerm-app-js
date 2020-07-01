$(document).ready(function(){
    (function($){
        $.fn.remove_approver = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            var $container = $obj.closest('.g-container');
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                console.log(output);
                if(output.match(/success/ig) != null){
                    $obj.closest('.list-group-item').remove();
                    if($container.find('.list-group-item').length == 0){
                        $container.remove();
                    }
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.set_approver_code = function(){
            var $obj = this;
            $('[data--form-id="saveApprover"] [name="code"]').val($obj.attr('data--code'));
            $('[data--form-id="saveApprover"] [name="code"]').closest('.panel')[0].scrollIntoView();
        }
    }(jQuery));

    (function($){
        $.fn.saveApprover = function(){
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
                    location.reload();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.receive_all = function(){
            $('[data--module="tag_received"]:first').tag_received(function(){
                if($('[data--module="tag_received"]').length == 0){
                    $('#modal').html(`<div class="alert alert-success">
                        <progress class="progress full-width" value="100" max="100"></progress>
                        <div class="status">All leaves are tagged as received.</div>
                    </div>`).modal();
                }else{
                    var proc = $('[data--proc="1"]').length;
                    var total = $('[data--module="tag_received"]').closest('tbody').find('tr').length;
                    $('[data--module="receive_all"]').receive_all();
                    $('#modal').html(`<div class="alert alert-info">
                        <progress class="progress full-width" value="${proc/total*100}" max="100"></progress>
                        <div class="status">Please wait while we process the leaves: <b>${proc} / ${total}</b></div>
                    </div>`).modal();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.tag_received = function(fn){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                leaveType:$obj.closest('tr').find('[name="leaveType"]').val(),
            };
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal();
                console.log(output);
                if(output.match(/success/) != null){
                    var $tr = $obj.closest('tr');
                    $tr.attr('data--proc','1');
                    $tr.find('[data--module="tag_received"]').remove();
                    $tr.find('td').addClass('small');
                    $tr.find('td:eq(5)').html($tr.find('td:eq(5)').find(':input').val());

                    if(fn){
                        fn();
                    }
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.change_receiving_date = function(){
            var $obj = this;
            var data = {
                from:$obj.find('[name="dateFrom"]').val(),
                to:$obj.find('[name="dateTo"]').val(),
            }
            location.href = jom.url+'approving/receiving/'+data.from+'/'+data.to;
        }
    }(jQuery));

    (function($){
        $.fn.updateLeave = function(){
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
                    location.reload();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.editLeave = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                lvl:$obj.attr('data--level'),
                code:$obj.attr('data--code'),
            }
            $('#modal').html(jom.loading).modal();
            $.get(jom.url+$obj.attr('data--url'),function(output){
                $('#modal').html(output).modal();
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
                $('.table').DataTable({
                    dom: 'Blfrtip',
                    buttons: [
                        'excelHtml5',
                        'copy'
                    ],
                    "lengthMenu":[[10,25,50,100,-1],[10,25,50,100,"All"]]
                });
            });
        }
    }(jQuery));


    (function($){
        $.fn.disapproveTransmittal = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                lvl:$obj.attr('data--level'),
                code:$obj.attr('data--code'),
            }
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal();
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.approveTransmittal = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                lvl:$obj.attr('data--level'),
                code:$obj.attr('data--code'),
            }
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal();
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.disapproveOvertime = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                lvl:$obj.attr('data--level'),
                code:$obj.attr('data--code'),
            }
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal();
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.approveOvertime = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                lvl:$obj.attr('data--level'),
                code:$obj.attr('data--code'),
            }
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal();
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.disapproveLeave = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                lvl:$obj.attr('data--level'),
                code:$obj.attr('data--code'),
            }
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal();
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.approveLeave = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                lvl:$obj.attr('data--level'),
                code:$obj.attr('data--code'),
            }
            $('#modal').html(jom.loading).modal();
            $.post(jom.url+$obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal();
                if(output.match(/success/ig) != null){
                    $obj.closest('tr').remove();
                }
            });
        }
    }(jQuery));
});