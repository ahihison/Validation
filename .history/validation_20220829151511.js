function Validator(options){
    // lấy được form elements
    var formElement = document.querySelector(options.form);

    if (formElement){
        options.rules.forEach(function(rule){
            
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                inputElement.onblur = function(){
                   inputElement.classList.add('invalid');
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
        return value ?

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
