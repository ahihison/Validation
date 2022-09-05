function Validator(options){
    // lấy được form elements
    var formElement = document.querySelector(options.form);
    if (formElement){
        console.log(formElement.rules);
    }


}

Validator.isRequired = function(){
return 1;
}

Validator.isEmail = function(){

}
