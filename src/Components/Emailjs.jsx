import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';




function email() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ox9d3mc', 'template_j3tf45e', form.current, 'QVR7n5mHWrLvokMl_')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div>
            Mensaje de tu encuesta creada.


            <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="admin_user" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
            </form>
        </div>
    )
}

export default email;