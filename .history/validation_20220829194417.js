function Validator(options) {

    //hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    // lấy được form elements
    var formElement = document.querySelector(options.form);

    if (formElement) {
        options.rules.forEach(function (rule) {

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                //Xử lí trường hợp blur ra khỏi input
                inputElement.onblur = function () {

                    validate(inputElement, rule);

                }
                // Xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function (){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
                }
            }

        }

        );

    }


}

//định nghĩa rules
//Nguyên tắc rules
//1. khi có lỗi : => trả về message
//2. Khi hợp lệ: => ko trả về gì hết (undefined)
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"

        }
    }
}

Validator.isEmail = function (selector) {

    return {
        selector: selector,
        test: function (value) {
            var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }

}
Validator.minLength = function (selector, min) {

    return {
        selector: selector,
        test: function (value) {
           return value.length >= min ? undefined : `Vui lòng nhập tối thiếu ${min} ký tự` 
        }
    }

}

Validator.isConfirmed = function (selector,){
    return {Ư}

}
