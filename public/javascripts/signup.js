$(document).ready(function () {
    jQuery.validator.addMethod('customphone', function (value, element) {
        return this.optional(element) || /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Vui lòng nhập số điện thoại hợp lệ");

    $(".needs-validation").validate({
        rules:{
            username :{
                required: true,
                minlength :4,
            },
            name: {
                required: true
            },
            email :{
                required :true,
            },
            password: {
                required : true,
                minlength : 5
            },
            repass : {
                required : true,
                minlength : 5,
                equalTo : "#password"
            },
            phone :{
                required: true,
                customphone: true
            },
        },

        messages : {
            username : {
                required : "Vui lòng nhập tên đăng nhập",
                minlength : "Username quá ngắn"
            },
            name: {
                required: "Vui lòng nhập tên"
            },
            phone:{
                required : "Vui lòng nhập số điện thoại",
            },

            email:{
                required :"Vui lòng nhập email đăng ký",
            },

            password: {
                required : "Vui lòng nhập mật khẩu.",
                minlength : "Vui lòng nhập nhiều hơn 5 ký tự."
            },
            repass: {
                required : "Vui lòng nhập lại mật khẩu lần nữa",
                equalTo : "Mật khẩu không trùng nhau.",
                minlength : "Vui lòng nhập nhiều hơn 5 ký tự."
            },
        }
    })
});