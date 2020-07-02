$(document).ready(function () {
    // (function ($) {
    //     $.fn.getClinicalAbstract = async function (caseno) {
    //         let response = await fetch(
    //             `${jom.apiUrl}clinical-abstract/result?auth=${jom.apiKey}`,
    //             {
    //                 method: 'GET',
    //                 body: JSON.stringify({ caseno }),
    //             }
    //         );
    //         console.log(response);
    //     }
    // }(jQuery));

    (function ($) {
        $.fn.undefined = function () { }
    }(jQuery));

    (function ($) {
        $.fn.saveClinicalAbstract = async function () {
            var $obj = this;
            var data = {
                form: $obj.serializeArray(),
                newForm: {}
            };
            for (item in data.form) {
                data.newForm[data.form[item].name] = data.form[item].value;
            }
            data.newForm.user = document.cookie.split('; ').find(item => item.startsWith('user')).split('=')[1];
            $('#modal').html(jom.loading).modal({ clickClose: false });
            let response = await fetch(
                `${jom.apiUrl}clinical-abstract/result?auth=${jom.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.newForm),
                }
            );
            response = await response.json();
            if (response.result.ERR == 1) {
                $('#modal').html(`<div class="alert alert-danger">${response.result.MSG}</div>`).modal({ clickClose: false });
                return;
            }
            $.modal.close();
            location.reload();
            window.open(`${jom.url}hospital/print-clinical-abstract/${data.newForm.caseno}`);
        }
    }(jQuery));
});