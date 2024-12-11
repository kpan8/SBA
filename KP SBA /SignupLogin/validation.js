//Here are our variables, each element is selected based on its id and put into a const variable
const form = document.getElementById('form')
const name_input = document.getElementById('name-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const confirm_password_input = document.getElementById('confirm-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) =>{ //Event listener listens for errors when the form is submitted, (e) => is call back function, runs whenever form is submitted
    let errors = []//we start with an empty array where we will store our errors if any
    
    if(name_input){ //if we have name input we are in sign up, below is where we fill our array with potential errors
        errors = getSignupFormErrors(name_input.value, email_input.value, password_input.value, confirm_password_input.value )
    }
    else{ //if we don't have username then we are in log in
        errors = getLoginFormErrors(email_input.value, password_input.value)

    }
    if (errors.length > 0){ //if there are some errors
        e.preventDefault() //then don't submit the form (the default is to submit)
        error_message.innerText = errors.join(". "); //show me the errors and add a period and space between them, please
    }
})

function getSignupFormErrors(name, email, password, confirmpassword){ //this function checks all the fields for any errors (eg empty fields)
    let errors=[] 

    const nameRegEx =/^[A-Za-z\s]{3,15}$/;
    if (!nameRegEx.test(name)) {
        errors.push('Name should be 3-15 characters long and contain only letters and spaces')
        name_input.parentElement.classList.add('incorrect')
    }

    const emailRegEx =/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegEx.test(email)) {
        errors.push('Please enter a valid email address')
        email_input.parentElement.classList.add('incorrect')
    }

    const passwordRegEx =/^.{8,}$/;
    if (!passwordRegEx.test(password)) {
        errors.push('Password must be at least 8 characters long')
        password_input.parentElement.classList.add('incorrect')
    }

    if(password !== confirmpassword){
        errors.push('Passwords do not match')
        password_input.parentElement.classList.add('incorrect')
        confirm_password_input.parentElement.classList.add('incorrect')
    }
    return errors; //give me all the errors you found please
}

function getLoginFormErrors(email, password){ //this one checks for errors in the log in form hence its name
    let errors = []
    if(email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    return errors;
}
const allInputs = [name_input, email_input, password_input, confirm_password_input].filter(input => input != null)

allInputs.forEach(input => { //
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ' '
        }
    })

})

