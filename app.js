const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
   if(!validateInputs()){
    e.preventDefault();
   }
})

function validateInputs(){
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passVal = password.value.trim();
    const cpassVal = cpassword.value.trim();
    let success = true;


    if(usernameVal === ''){
        success = false;
        setError(username,'Username is required');
    }
    else{
        setSuccess(username);
    }


    if(emailVal === ''){
        success= false;
        setError(email, 'Email is required');
    }
    else if(!validateEmail(emailVal)){
        success = false;
        setError(email,'Please enter a valid email');
    }
    else{
        setSuccess(email);
    }


    if(passVal === ''){
        success = false;
        setError(password,'Password is required');
    }
    // Only changed one line below

  else if(passVal.length < 8){
      success = false; // <-- fixed here
      setError(password,'Password must be at least 8 characters');
  }

    else {
       setSuccess(password) ;
    }


    if(cpassVal === ''){
        success = false;
        setError(cpassword,'Confirm Password is required');
    }
    else if(cpassVal!== passVal){
        success = false;
        setError(cpassword,"Passwords don't match");
    }
    else{
        setSuccess(cpassword);
    }

    if (success) {
      successMessage.classList.add('show');

      // Clear form inputs
      form.reset();

      // Remove all success borders
      const inputGroups = document.querySelectorAll('.input-group');
      inputGroups.forEach(group => group.classList.remove('success'));

      // Hide message after 3 seconds
      setTimeout(() => {
          successMessage.classList.remove('show');
      }, 3000);
  } else {
      successMessage.classList.remove('show');
  }



    return success;
}

function setError(element,message){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element){
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
