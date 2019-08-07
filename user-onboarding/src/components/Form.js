import React, { useState } from 'react';

function Form() {
    const [user, setUser] = useState({ username: '' })

    const handleChange = event => {
        setUser({ ...user, [event.target.name]: event.target.value })
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(user.username)
    };

    return (
        <div className='form'>
         {console.log(user)}
           <form onSubmit={event => handleSubmit(event)}>
               <label>
                   Username:
                   <input
                   type = 'text'
                   name = 'username'
                   onChange = {event => handleChange(event)}
                    />
                </label>
                <button>Submit!</button>
            </form>
        </div>
    );



}

export default Form;