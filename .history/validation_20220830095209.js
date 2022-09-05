function Validator(options) {
    var selectorRule = {};
    //hàm thực hiện validate
    function validate(inputElement, rule) {
        
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        var isFormValid = true;
        //lấy ra các rule của các selector
        var rules = selectorRule[rule.selector];
      //lập qua từng rules và kiểm tra
      //Nếu có lỗi thì dừng việc kiểm tra
      for(var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if(errorMessage) break;
        
    }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !!errorElement;
    }
    // lấy được form elements
    var formElement = document.querySelector(options.form);

    if (formElement) {
        //Lắng nghe sự kiện onsubmit
        formElement.onsubmit = function(e){
            e.preventDefault();
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
               v validate(inputElement, rule);

            })

        }


        //Lặp qua mỗi rule xử lí sự kiện (blur click....)
        options.rules.forEach(function (rule) {
             //Lưu lại các  rules cho mỗi input
        if(Array.isArray(selectorRule[rule.selector])){
            selectorRule[rule.selector].push(rule.test);
        }
        else{
            selectorRule[rule.selector] =[rule.test]; 
        }

          
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
Validator.isRequired = function (selector,message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined :message||  "Vui lòng nhập trường này"

        }
    }
}

Validator.isEmail = function (selector,message) {

    return {
        selector: selector,
        test: function (value) {
            var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            return regex.test(value) ? undefined :message||  'Trường này phải là email'
        }
    }

}
Validator.minLength = function (selector, min,message) {

    return {
        selector: selector,
        test: function (value) {
           return value.length >= min ? undefined :message||  `Vui lòng nhập tối thiếu ${min} ký tự` 
        }
    }

}

Validator.isConfirmed = function (selector,getcomfirmValue,message){
    return {
        selector: selector,
        test: function (value) {
            return value === getcomfirmValue() ? undefined :message|| "Giá trị nhập vào không chính xác"
        }
            
    }

}
