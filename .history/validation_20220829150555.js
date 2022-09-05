function Validator(options){
    // lấy được form elements
    var formElement = document.querySelector(options.form);
    console.log(options.rules);
    if (formElement){
        options.rules.forEach(element = {
            
        });
        
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
