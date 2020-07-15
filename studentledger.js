$(document).ready(function () {
  (function ($) {
    $.fn.search_student = function () {
      var $obj = this;
      var data = {
        form: $obj.serializeArray(),
      };
      $obj.closest(".row").find(".op").html(jom.loading);
      $.post(`${$obj.attr("data--url")}`, { data: data }, function (output) {
        $obj.closest(".row").find(".op").html(output);
        console.log(output);
      });
    };
  })(jQuery);

  (function ($) {
    $.fn.search_student_payments = async function () {
      // const $obj = this;
      // const data = {
      //   name: $obj.find('[name="name"]').val(),
      //   orno: $obj.find('[name="orno"]').val(),
      // };
      // const url = `${$obj.attr('data--url')}payments/search?auth=${$obj.attr('data--key')}&name=${data.name}&orno=${data.orno}`;

      // const response = await fetch(
      //   url,
      //   {method:'GET'}
      // );
      // const responseJson = await response.json();
      
      // console.log(responseJson);
    };
  })(jQuery);

  (function ($) {
    $.fn.replaceNameByCode = function () {
      var $obj = this;
      $obj.closest(".row").find('[name="sn"]').val($obj.attr("data--code"));
      $obj.closest(".row").find("form").search_student();
    };
  })(jQuery);
});
