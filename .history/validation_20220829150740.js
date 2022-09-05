function Validator(options){
    // lấy được form elements
    var formElement = document.querySelector(options.form);

    if (formElement){
        options.rules.forEach(function(rule){
            
            var in

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
