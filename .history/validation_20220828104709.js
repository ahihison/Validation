function Validator(options){
    // lấy được form elements
    var formElement = document.querySelector(options.form);
    console.log(options.rules);
    if (formElement){
        
    }


}

Validator.isRequired = function(){
return 1;
}

Validator.isEmail = function(){
    return 2;

}
