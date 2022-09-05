function Validator(options) {

    function geParent(elements, selector) {
        while (elements.parentElement) {
            if (elements.parentElement.matches(selector)) {
                return elements.parentElement;
            }
            elements = elements.parentElement;
        }
    }

    var selectorRule = {};
    //hàm thực hiện validate
    function validate(inputElement, rule) {

        var errorElement = geParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        //lấy ra các rule của các selector
        var rules = selectorRule[rule.selector];
        //lập qua từng rules và kiểm tra
        //Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
           
            if (errorMessage) break;

        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            geParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            geParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
        return !!errorMessage;
    }
    // lấy được form elements
    var formElement = document.querySelector(options.form);

    if (formElement) {
        //Lắng nghe sự kiện onsubmit

        formElement.onsubmit = function (e) {

            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isInValid = validate(inputElement, rule);
                if (isInValid) {
                    isFormValid = false;
                }
            });


            if (isFormValid) {
                //Trường hợp submit với js
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        switch (input.type){
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                case 'checkbox':
                                    if(!input.matches(':checked')) return 
                                  if(!Array.isArray(values[input.name])) {
                                    values[input.name] = [];

                                  }
                                  values[input.name] 
                                    break;
                                    default: values[input.name] = input.value;
                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues)
                }
                //submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }

        }





        //Lặp qua mỗi rule xử lí sự kiện (blur click....)
        options.rules.forEach(function (rule) {
            //Lưu lại các  rules cho mỗi input
            if (Array.isArray(selectorRule[rule.selector])) {
                selectorRule[rule.selector].push(rule.test);
            }
            else {
                selectorRule[rule.selector] = [rule.test];
            }


            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement){
                //Xử lí trường hợp blur ra khỏi input
                inputElement.onblur = function () {

                    validate(inputElement, rule);

                }
                // Xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = geParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    geParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            
            });

    });



    }


}

//định nghĩa rules
//Nguyên tắc rules
//1. khi có lỗi : => trả về message
//2. Khi hợp lệ: => ko trả về gì hết (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || "Vui lòng nhập trường này"

        }
    }
}

Validator.isEmail = function (selector, message) {

    return {
        selector: selector,
        test: function (value) {
            var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }

}
Validator.minLength = function (selector, min, message) {

    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiếu ${min} ký tự`
        }
    }

}

Validator.isConfirmed = function (selector, getconfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getconfirmValue() ? undefined : message || "Giá trị nhập vào không chính xác"
        }

    }

}
