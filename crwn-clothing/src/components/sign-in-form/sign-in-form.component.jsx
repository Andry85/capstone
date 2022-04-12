import { useState, useContext } from "react";

import {
    signInWithGooglePopup, 
    createUserDocumentfromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {UserContext} from "../../contexts/users.context";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);
    
    const resetFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();
         await createUserDocumentfromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);

            resetFields();
            

        } catch(error) {

            if (error.code === 'auth/wrong-password') {
                alert('incorrect password for email');
            } else if (error.code === 'auth/user-not-found') {
                alert('no eser assosiated with the email');
            } else {
                console.log(error)
            }

            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;