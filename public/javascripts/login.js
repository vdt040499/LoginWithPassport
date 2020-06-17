$(document).ready(
    function(){
        $('.needs-validation').validate({
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },

            messages: {
                username: {
                    required: "Yêu cầu nhập tên đăng nhập"
                },
                password: {
                    required: "Yêu cầu nhập mật khẩu"
                }
            }
        })
    }
);