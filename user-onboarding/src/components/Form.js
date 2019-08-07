import React from 'react';
import { withFormik, Field} from 'formik';

import * as Yup from 'yup';
import axios from 'axios';


function InputForm({values, errors, touched, isSubmitting}) {
    // ??Why can just error be passed through??
    console.log('Hello')

    return (
        <div className='form'>
           <form> 
               <Field
                   type = 'text'
                   name = 'username'
                   placeholder = 'Username'
                />
              <div>
                 {/* Adding destructured 'error' to prop form. For password...what does the && do.*/}
                  
                  {touched.email && errors.password && <p>{errors.password}</p>}

                <Field
                   type = 'password'
                   name = 'password'
                   placeholder = 'Password'
                />
              </div>

              <div>
                  {/* Adding destructured 'error' to prop form. For email*/}
                  {errors.email && <p>{errors.email}</p>}

                <Field
                   type = 'email'
                   name = 'email'
                   placeholder = 'Email'
                />

               </div>

               <Field 
                component = 'select' 
                name = 'gender'
                // placeholder = 'Select Gender'??
               > 
               <option value = 'female'>Female</option>
               <option value = 'male'>Male</option>
               < option value = 'other'>Other</option>

               </Field>

               {/* Can this be an input?? */}
               <label>
                 <Field
                   type = 'checkbox'
                   name = 'tos'
                   checked = {values.tos}
                 />
                 Accept Terms of Service
                </label>
                <button disabled = {isSubmitting}>Submit!</button>
            </form>
        </div>
    );
}

const FormikInputForm = withFormik({
    mapPropsToValues({username, password, email, tos, gender}){

        return{
            username: username || '',
            password: password || '',
            email: email || '',
            tos: tos || false,
            gender: gender || 'female'
        };
    },

    //==========Validation Schema goes================
    // 1. telling Formkik what kind of shap of data it is supposed to be. (FROM TK)
    // 2. Adding custom error-- add into the arguments for the method!

    validationSchema: Yup.object().shape({
        email: Yup.string()
          .email('Email not valid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be longer than 6 characters, at least')
          .required('Password is required')
      }),

    //===========End Validation Schema ===============


    handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
        console.log('Values:',values)
        // Form submission will log here

        if (values.email === 'alreadytaken@atb.dev') {
            setErrors({ email: 'Email is already taken'});
        } else {
            axios.post('https://reqres.in/api/users',values)

            .then(response => {
                console.log('Axios Response', response)
                //This show is data was successfully loaded.
                resetForm();
                setSubmitting(false);
            })

            .catch(error => {
                console.log('Axios Error:', error)
                setSubmitting(false);
            });

        }
    },

})(InputForm)

export default FormikInputForm;

