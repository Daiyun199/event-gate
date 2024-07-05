/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import "./index.scss"
import Button from '../../component/button'
import {
    FacebookOutlined, AppleOutlined, GoogleOutlined, TwitterOutlined
} from '@ant-design/icons';
import { Checkbox } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { Link } from 'react-router-dom';

function Login({ title }) {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const [value, setValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setValue(value + "@fpt.edu.vn");
        }
    }
    const handleLoginGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // // The signed-in user info.
                // const user = result.user;
                // // IdP data available using getAdditionalUserInfo(result)
                console.log(result.user);
                // ...
            }).catch((error) => {
                console.log(error);
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.customData.email;
                // // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (
        <div className='login'>
            <div className="wrapper">
                <div className="login__logo">

                </div>
                <div className="login__form">
                    <h1>{title === 'Login' ? 'Log in' : 'Sign up'}</h1>
                    <div className="login__form__input">
                        <label htmlFor="email">Email address or user name</label>
                        <div className="input-with-addon">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <span>@fpt.edu.vn</span>
                        </div>
                    </div>
                    <div className="login__form__input">
                        <label htmlFor="password" id="password" name="password">Password</label>
                        <input type="password" required />
                    </div>
                    {title === 'Signup' && (
                        <div className="login__form__input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" required />
                        </div>
                    )}
                    <div className="login__form__remember">
                        <Checkbox style={{
                            color: '#ffffff', // Màu chữ của nhãn checkbox
                        }} className="custom-checkbox"
                            onChange={onChange} fontSize='18px'>Remember me</Checkbox>
                    </div>
                    <div className="login__form__agree">
                        By continuing, you agree to the&nbsp;
                        <Link to>Term of use</Link>
                        &nbsp;and&nbsp;
                        <Link to>Privacy Policy</Link>
                    </div>
                    <div className='login__form__button'>
                        <Button
                            variant="Login"
                            buttonText={title === 'Login' ? 'Log In' : 'Sign Up'}
                        />
                    </div>
                    {title === 'Login' && (
                        <div className="login__form__forget">
                            <Link to>Forget your password</Link>
                        </div>
                    )}
                    <div className="login__form__signup">
                        {title === 'Login' ? "Don't have an account. " : "Already have an account? "}
                        <Link to={title === 'Login' ? '/sign_up' : '/login'}>
                            &nbsp;{title === 'Login' ? 'Sign up' : 'Log in'}
                        </Link>
                    </div>
                    <div className="login__form__icon">
                        <FacebookOutlined style={{ fontSize: '30px', color: ' #000000' }} />
                        <AppleOutlined style={{ fontSize: '30px', color: ' #000000' }} />
                        <GoogleOutlined style={{ fontSize: '30px', color: ' #000000' }} onClick={handleLoginGoogle} />
                        <TwitterOutlined style={{ fontSize: '30px', color: ' #000000' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
