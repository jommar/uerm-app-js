$(document).ready(function(){
    (function($){
        $.fn.save_cif_personnel = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post($obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output);
                if(output.match(/success/ig) != null){
                    $('.cif-p-list').html(jom.loading);
                    $.get(`${jom.url}CIF/cif-personnel-list`,function(output){
                        $('.cif-p-list').html(output);
                    });
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.search_by_name = function(){
            var $obj = this;
            var data = {
                search:$obj.closest('label').find(':input').val()
            };
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post($obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                $('.emp-search tbody tr').css({
                    'cursor':'pointer'
                }).on('click',function(){
                    var code = $(this).find('td:eq(0)').text();

                    $obj.closest('label').find(':input').val(code);
                    $('.close-modal').trigger('click');
                });
            });
        }
    }(jQuery));

    (function($){
        $.fn.delete_cif = function(){
            $.fn.delete_cif = function(){
                var $obj = this;
                $('#modal').html(jom.loading).modal({clickClose:false});
                $.get($obj.attr('data--url'),function(output){
                    $('#modal').html(output).modal({clickClose:false});

                    if(output.match(/success/ig) != null){
                        $(`tr[data--id="${$obj.attr('data--id')}"]`).remove();
                    }
                });
            }
        }
    }(jQuery));

    (function($){
        $.fn.reset_filters = function(){
            $('[name="f_name"]').val('');
            $('[name="f_tag"]').val('Any');
            $('[name="f_disposition"]').val('Any');
            $('[name="f_pui"]').val('Any');
            $('[name="f_finaldisposition"]').val('Any');

            $('.filter-item').show();
            $('.filters').populate_filters();
        }
    }(jQuery));

    (function($){
        $.fn.populate_filters = function(){
            var $obj = this;
            var $filter = {
                classification:[...new Set($('.filter-classification:visible').map(function(){
                    return $(this).attr('data--search') != '' ? $(this).attr('data--search').toUpperCase() : null;
                }).get())].sort(),
                disposition:[...new Set($('.filter-disposition:visible').map(function(){
                    return $(this).attr('data--search') != '' ? $(this).attr('data--search').toUpperCase() : null;
                }).get())].sort(),
                puitest:[...new Set($('.filter-puitest:visible').map(function(){
                    return $(this).attr('data--search') != '' ? $(this).attr('data--search').toUpperCase() : null;
                }).get())].sort(),
                fdisposition:[...new Set($('.filter-fdisposition:visible').map(function(){
                    return $(this).attr('data--search') != '' ? $(this).attr('data--search').toUpperCase() : null;
                }).get())].sort(),
            }
            var data = {
                classification:$('[name="f_tag"]').val(),
                disposition:$('[name="f_disposition"]').val(),
                puitest:$('[name="f_pui"]').val(),
                fdisposition:$('[name="f_finaldisposition"]').val(),
            }
            $obj.find('[name="f_tag"]').children('option:gt(0)').remove();
            $.each($filter.classification,function(key,val){
                if(val.trim() != ''){
                    $obj.find('[name="f_tag"]').append(`<option>${val}</option>`).val(data.classification);
                }
            });
            $obj.find('[name="f_disposition"]').children('option:gt(0)').remove();
            $.each($filter.disposition,function(key,val){
                if(val.trim() != ''){
                    $obj.find('[name="f_disposition"]').append(`<option>${val}</option>`).val(data.disposition);
                }
            });
            $obj.find('[name="f_pui"]').children('option:gt(0)').remove();
            $.each($filter.puitest,function(key,val){
                if(val.trim() != ''){
                    $obj.find('[name="f_pui"]').append(`<option>${val}</option>`).val(data.puitest);
                }
            });
            $obj.find('[name="f_finaldisposition"]').children('option:gt(0)').remove();
            $.each($filter.fdisposition,function(key,val){
                if(val.trim() != ''){
                    $obj.find('[name="f_finaldisposition"]').append(`<option>${val}</option>`).val(data.fdisposition);
                }
            });
        }
    }(jQuery));

    (function($){
        $.fn.upd_search_cif = function(){
            var $obj = this;
            var data = {
                id:$obj.attr('data--id'),
                val:$obj.attr('data--val'),
                type:$obj.attr('data--type'),
            };
            var select = '';

            switch(data.type){
                case 'testresult':
                    select = `<label class="full-width">
                        <b>PUI Test Result</b>
                        <select class="form-control" name="value" required>
                            <option value="">- Select One -</option>
                            <option ${data.val == 'POSITIVE' ? 'selected' : ''}>POSITIVE</option>
                            <option ${data.val == 'NEGATIVE' ? 'selected' : ''}>NEGATIVE</option>
                            <option ${data.val == 'PENDING' ? 'selected' : ''}>PENDING</option>
                        </select>
                    </label>`;
                    break;
                case 'disposition':
                    select = `<label class="full-width">
                        <b>Disposition</b>
                        <select class="form-control" name="value" required>
                            <option value="">- Select One -</option>
                            <option ${data.val == 'Admitted' ? 'selected' : ''}>Admitted</option>
                            <option ${data.val == 'Admitted - Non COVID Room' ? 'selected' : ''}>Admitted - Non Covid Room</option>
                            <option ${data.val == 'Home-Quarantine' ? 'selected' : ''}>Home-Quarantine</option>
                            <option ${data.val == 'Transferred' ? 'selected' : ''}>Transferred</option>
                        </select>
                    </label>`;
                    break;
                case 'classification':
                    select = `<label class="full-width">
                        <b>Classification</b>
                        <select class="form-control" name="value" required>
                            <option value="">- Select One -</option>
                            <option ${data.val.toLowerCase() == 'pui' ? 'selected' : ''} value="pui">Patient Under Investigation (PUI)</option>
                            <option ${data.val.toLowerCase() == 'pum' ? 'selected' : ''} value="pum">Patient Under Monitoring (PUM)</option>
                            <option ${data.val.toLowerCase() == 'covid' ? 'selected' : ''} value="covid">Confirmed COVID-19 Case</option>
                        </select>
                    </label>`;
                    break;
                case 'finaldisposition':
                    select = `<label class="full-width">
                        <b>Final Disposition</b>
                        <select class="form-control" name="value" required>
                            <option value="">- Select One -</option>
                            <option ${data.val.toLowerCase() == 'Discharged' ? 'selected' : ''}>Discharged</option>
                            <option ${data.val.toLowerCase() == 'Expired' ? 'selected' : ''}>Expired</option>
                            <option ${data.val.toLowerCase() == 'Sent Home' ? 'selected' : ''}>Sent Home</option>
                        </select>
                    </label>`;
                    break;
            }
            $('#modal').html(`<div class="panel panel-primary"><div class="panel-body"><form data--form-id="update_cif_record" data--url="${jom.url}CIF/upd_cif_record">
                <input type="hidden" value="${data.id}" name="id">
                <input type="hidden" value="${data.type}" name="type">
                ${select}
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-primary"><b class="fa fa-save"></b> Save</button>
                    <a href="#close-modal" rel="modal:close" class="btn btn-danger"><b class="fa fa-remove"></b> Close</a>
                </div>
            </form></div></div>`).modal({clickClose:false});
        }
    }(jQuery));

    (function($){
        $.fn.update_cif_record = function(){
            var $obj = this;
            var data = {
                form:$obj.serializeArray(),
            };
            $obj.nextAll().remove();
            $obj.after(jom.loading);
            $.post($obj.attr('data--url'),{data:data},function(output){
                $obj.nextAll().remove();
                $obj.after(output.msg);
                console.log(output);
                $(`[data--module="upd_search_cif"][data--type="${$obj.find('[name="type"]').val()}"][data--id="${$obj.find('[name="id"]').val()}"]`).closest('td').find('.txt').text(output.str);
            },'json');
        }
    }(jQuery));

    (function($){
        $.fn.search_cases = function(){
            var $obj = this;
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.get($obj.attr('data--url'),function(output){
                $('#modal').html(output).modal({clickClose:false});
            });
        }
    }(jQuery));

    (function($){
        $.fn.copy_address = function(){
            var data = {
                HouseNoLot:$('[name="HouseNoLot"]'),
                Street:$('[name="Street"]'),
                Municipality:$('[name="Municipality"]'),
                Province:$('[name="Province"]'),
                Region:$('[name="Region"]'),
                HomePhone:$('[name="HomePhone"]'),
                Cellphone:$('[name="Cellphone"]'),
                Emailaddress:$('[name="Emailaddress"]'),
            };
            var $select = {
                Municipality:data.Municipality.clone(),
                Province:data.Province.clone(),
            }
            $('[name="cHouseNoLot"]').val(data.HouseNoLot.val());
            $('[name="cStreet"]').val(data.Street.val());
            $('[name="cRegion"]').val(data.Region.val());
            $('[name="cHomePhone"]').val(data.HomePhone.val());
            $('[name="cCellphone"]').val(data.Cellphone.val());
            $('[name="cEmailaddress"]').val(data.Emailaddress.val());

            $('[name="cMunicipality"]').children().remove();
            $('[name="cMunicipality"]').append($select.Municipality.map(function(){
                return $(this).html();
            }).get().join());
            $('[name="cMunicipality"]').val(data.Municipality.val());
            $('[name="cProvince"]').children().remove();
            $('[name="cProvince"]').append($select.Province.map(function(){
                return $(this).html();
            }).get().join());
            $('[name="cProvince"]').val(data.Province.val());
        }
    }(jQuery));

    (function($){
        $.fn.save_cif = function(){
            var $obj = this;
            var data = {
                id:$('[name="id"]').val(),
                date:$('[name="DateofInterview"]').val(),
                personal:$('.personal').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                pRes:$('.pRes').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                oRes:$('.oRes').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                travel:$('.travel').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                exposure:$('.exposure').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                clinical:$('.clinical').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                specimen:$('.specimen').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                final:$('.final').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
                outcome:$('.outcome').map(function(){
                    return $(this).find(':input').serializeArray()
                }).get(),
            }
            $('#modal').html(jom.loading).modal({clickClose:false});
            $.post($obj.attr('data--url'),{data:data},function(output){
                $('#modal').html(output).modal({clickClose:false});
                if(output.match(/success/ig) != null){
                    // if($obj.find('[name="id"]').val() == ''){
                    //     $obj[0].reset();
                    // }
                    $obj[0].reset();
                    // $obj.find('[name="id"]').val($('#cif-id').text());
                }
            });

            console.log(data);
        }
    }(jQuery));

    $('.zip-code').on('change',function(){
        // var $obj = $(this);
        // var data = {
        //     municipality:$obj.closest('.panel').find('[name="municipality"]'),
        //     province:$obj.closest('.panel').find('[name="province"]'),
        //     region:$obj.closest('.panel').find('[name="region"]'),
        // };
        // if($obj.is('[name="municipality"]')){
        //     data.province.find('option:not(.default)').remove();
        //     data.region.find('option:not(.default)').remove();
        //     $.each($zipcode[data.municipality.val()],function(key,val){
        //         data.province.append(`<option>${key}</option>`);
        //     });
        // }else if($obj.is('[name="province"]')){
        //     data.region.find('option:not(.default)').remove();
        //     $.each($zipcode[data.municipality.val()][data.province.val()],function(key,val){
        //         data.region.append(`<option>${key}</option>`);
        //     });
        // }

        var $obj = $(this);
        var data = {
            municipality:$obj.closest('.address-container').find('.municipality'),
            province:$obj.closest('.address-container').find('.province'),
        };

        if($obj.is('.municipality')){
            data.province.children().remove();
            $.each($zipcode[data.municipality.val()],function(key,val){
                data.province.append(`<option>${key}</option>`);
            });
            // data.province.find('option:not(.default)').remove();
            // $.each($zipcode[data.municipality.val()],function(key,val){
            //     data.province.append(`<option>${key}</option>`);
            // });
        }
    });

    $(document).on('keyup change','.p-filter',function(){
        var data = {
            name:$('.p-filter[name="f_name"]').val(),
            tag:$('.p-filter[name="f_tag"]').val() == '' ? '.+' :
                $('.p-filter[name="f_tag"]').val().match(/\+/) ? $('.p-filter[name="f_tag"]').val().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : $('.p-filter[name="f_tag"]').val(),
            disposition:$('.p-filter[name="f_disposition"]').val() == '' ? '.+' : $('.p-filter[name="f_disposition"]').val(),
            puitest:$('.p-filter[name="f_pui"]').val() == '' ? '.+' : $('.p-filter[name="f_pui"]').val(),
            fdisposition:$('.p-filter[name="f_finaldisposition"]').val() == '' ? '.+' : $('.p-filter[name="f_finaldisposition"]').val(),
        }

        console.log(data);

        // new RegExp(data.find,'ig')

        $('.filter-item').each(function(){
            var obj = {
                name:$(this).find('.filter-name').attr('data--search'),
                classification:$(this).find('.filter-classification').attr('data--search') == '' ? ' ' : $(this).find('.filter-classification').attr('data--search'),
                disposition:$(this).find('.filter-disposition').attr('data--search') == '' ? ' ' : $(this).find('.filter-disposition').attr('data--search'),
                puitest:$(this).find('.filter-puitest').attr('data--search') == '' ? ' ' : $(this).find('.filter-puitest').attr('data--search'),
                fdisposition:$(this).find('.filter-fdisposition').attr('data--search') == '' ? ' ' : $(this).find('.filter-fdisposition').attr('data--search'),
            }
            var regex = {
                name:new RegExp(data.name,'ig'),
                classification:new RegExp('^'+data.tag+'$','ig'),
                disposition:new RegExp('^'+data.disposition+'$','ig'),
                puitest:new RegExp('^'+data.puitest+'$','ig'),
                fdisposition:new RegExp('^'+data.fdisposition+'$','ig'),
            }

            console.log(obj.disposition,regex.disposition);
            if(
                obj.name.match(regex.name)
                && obj.classification.match(regex.classification)
                && obj.disposition.match(regex.disposition)
                && obj.puitest.match(regex.puitest)
                && obj.fdisposition.match(regex.fdisposition)
            ){
                $(this).show();
            }else{
                $(this).hide();
            }

            // if(!obj.name.match(regex.name)){
			// 	$(this).hide();
			// }else if(!obj.classification.match(regex.classification)){
			// 	$(this).hide();
            // }else if(!obj.disposition.match(regex.disposition)){
			// 	$(this).hide();
            // }else if(!obj.puitest.match(regex.puitest)){
			// 	$(this).hide();
            // }else if(!obj.fdisposition.match(regex.fdisposition)){
			// 	$(this).hide();
            // }else{
			// 	$(this).show();
			// }
        });
        var len = $('tr.filter-item:visible').length

        $('#ctr').text(len);

        $('.filters').populate_filters();
    })
});