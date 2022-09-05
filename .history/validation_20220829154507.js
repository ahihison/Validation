function Validator(options){
    // lấy được form elements
    function validate(inputElement, rule){
        var errorMessage = rule.test(inputElement.value);
        if(errorMessage){  
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
         }else{
            errorElement.innerText ='';
            inputElement.parentElement.classList.remove('invalid');
         }
    }
    var formElement = document.querySelector(options.form);

    if (formElement){
        options.rules.forEach(function(rule){
           
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = inputElement.parentElement.querySelector('.form-message');
           
            if(inputElement){
                
                inputElement.onblur = function(){
                    
                 

                 

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
Validator.isRequired = function(selector){
return {
    selector: selector,
    test : function(value){
        return value.trim() ? undefined : "Vui lòng nhập trường này"

    }
}
}

Validator.isEmail = function(selector){
    
    return {
    selector: selector,
    test : function(){
        
    }
}

}
