import React, { useState } from 'react';
import { withFormik, Form, Field} from 'formik';


function InputForm() {
    //❌❌Remove all previous state management and change/submit handlers

    // const [user, setUser] = useState({ username: '' })

    // const handleChange = event => {
    //     setUser({ ...user, [event.target.name]: event.target.value })
    // };

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     console.log(user.username)
    // };❌❌

    return (
        <div className='form'>
           <form> 
               <Field
                   type = 'text'
                   name = 'username'
                   placeholder = 'Username'
                />
                <Field
                   type = 'password'
                   name = 'password'
                   placeholder = 'Password'
                />
                <Field
                   type = 'email'
                   name = 'email'
                   placeholder = 'Email'
                />
               {/* Can this be an input?? */}
                {/* <Field
                   type = 'checkbox'
                   name = 'terms'
                   placeholder = 'Terms of Service'
                /> */}
                <button>Submit!</button>
            </form>
        </div>
    );
}

const FormikInputForm = withFormik({
    mapPropsToValues({username, password, email}){

        return{
            username: username || '',
            password: password || '',
            email: email || '',
        };
    },
    
    handleSubmit(values) {
        console.log(values)
        // Form submission will log here
    },

})(InputForm)

export default FormikInputForm;

