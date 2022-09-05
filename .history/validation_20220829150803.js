function Validator(options){
    // lấy được form elements
    var formElement = document.querySelector(options.form);

    if (formElement){
        options.rules.forEach(function(rule){
            
            var inputElement = formElement.querySelector(rule.selector);

        }
            
        );
        
    }


}

Validator.isRequired = function(selector){
return {
    selector: selector,
    test : function(){

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
