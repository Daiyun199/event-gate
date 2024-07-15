/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import "./index.scss"
import Button from '../../component/button'
import { toast } from "react-toastify";
import {
    FacebookOutlined, AppleOutlined, GoogleOutlined, TwitterOutlined
} from '@ant-design/icons';
import { Checkbox } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../redux/features/userSlice';

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://eventgateapi.azurewebsites.net/api/Authentication/login', {
                username: username,
                password: password
            });

            const userData = response.data;

            // Lưu thông tin người dùng vào Redux store
            dispatch(setUser(userData));
            toast.success("Login successfully");
            // Điều hướng người dùng đến trang chính hoặc bất kỳ trang nào bạn muốn
            navigate('/'); // Thay thế '/dashboard' bằng đường dẫn bạn muốn điều hướng tới
        } catch (error) {
            console.error('Login failed:', error);
            // Xử lý lỗi nếu có
        }
    };
    const handleSignup = async () => {
        try {
            const response = await axios.post("https://eventgateapi.azurewebsites.net/api/Authentication/register/member", {
                username: username,
                email: email,
                password: password,
                confirmedPassword: confirmPassword
            });
            toast.success("Register successfully");
            navigate("/");
        } catch (err) {
            console.log();
            // Check if errors is an object and display each error message
            const errors = err.response.data.errors;
            if (errors && typeof errors === 'object') {
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((message) => {
                        toast.error(message);
                    });
                });
            } else {
                toast.error(err.response.data);
            }
        }
    };

    const handleLoginGoogle = async () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // // The signed-in user info.
                // const user = result.user;
                // // IdP data available using getAdditionalUserInfo(result)
                console.log(result.user.email);
                const response = await axios.post('https://eventgateapi.azurewebsites.net/api/Authentication/loginByGoogleMail',
                    { email: result.user.email }, // Gửi dữ liệu dưới dạng JSON
                    {
                        headers: {
                            'Content-Type': 'application/json', // Sử dụng application/json
                        },
                    }
                );
                const userData = response.data;

                // Lưu thông tin người dùng vào Redux store
                dispatch(setUser(userData));
                toast.success("Login successfully");
                // Điều hướng người dùng đến trang chính hoặc bất kỳ trang nào bạn muốn
                navigate('/'); // Thay thế '/dashboard' bằng đường dẫn bạn muốn điều hướng tới
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
    const handleRegisterGoogle = async () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // // The signed-in user info.
                // const user = result.user;
                // // IdP data available using getAdditionalUserInfo(result)
                console.log(result.user.displayName.replace(/\s+/g, ''));
                const response = await axios.post('https://eventgateapi.azurewebsites.net/api/Authentication/register/member/byGG',
                    {
                        email: result.user.email,
                        username: result.user.displayName.replace(/[\s()"]/g, ''),
                        password: "",
                        confirmedPassword: "",
                        avatar: result.user.photoURL,
                    }, // Gửi dữ liệu dưới dạng JSON
                    {
                        headers: {
                            'Content-Type': 'application/json', // Sử dụng application/json
                        },
                    }
                );
                toast.success("Register successfully");
                // Điều hướng người dùng đến trang chính hoặc bất kỳ trang nào bạn muốn
                navigate('/'); // Thay thế '/dashboard' bằng đường dẫn bạn muốn điều hướng tới
                // ...
            }).catch((error) => {
                console.log(error);
                const errors = error.response.data.errors;
                if (errors && typeof errors === 'object') {
                    Object.keys(errors).forEach((key) => {
                        errors[key].forEach((message) => {
                            toast.error(message);
                        });
                    });
                } else {
                    toast.error(error.response.data);
                }
            });
    }
    const handleClick = title === 'Login' ? handleLoginGoogle : handleRegisterGoogle;

    return (
        <div className='login'>
            <div className="wrapper">
                <div className="login__logo"></div>
                <div className="login__form">
                    <h1>{title === 'Login' ? 'Log in' : 'Sign up'}</h1>
                    <div className="login__form__input">
                        <label htmlFor="user_name">User name</label>
                        <div className="input-with-addon">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />

                        </div>
                    </div>
                    <div className="login__form__input">
                        <label htmlFor="password" id="password" name="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {title === 'Signup' && (
                        <>
                            <div className="login__form__input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="login__form__input">
                                <label htmlFor="email">Email</label>
                                <div className="input-with-addon">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <span>@fpt.edu.vn</span>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="login__form__remember">
                        <Checkbox
                            style={{ color: '#ffffff' }}
                            className="custom-checkbox"
                            onChange={(e) => setRememberMe(e.target.checked)}
                        >
                            Remember me
                        </Checkbox>
                    </div>
                    <div className="login__form__agree">
                        By continuing, you agree to the&nbsp;
                        <Link to="#">Term of use</Link>
                        &nbsp;and&nbsp;
                        <Link to="#">Privacy Policy</Link>
                    </div>
                    <div className='login__form__button'>
                        <Button
                            variant="Login"
                            onClick={title === 'Login' ? handleLogin : handleSignup}
                            buttonText={title === 'Login' ? 'Log In' : 'Sign Up'}
                        >
                        </Button>
                    </div>
                    {title === 'Login' && (
                        <div className="login__form__forget">
                            <Link to="#">Forget your password</Link>
                        </div>
                    )}
                    <div className="login__form__signup">
                        {title === 'Login' ? "Don't have an account. " : "Already have an account? "}
                        <Link to={title === 'Login' ? '/sign_up' : '/login'}>
                            &nbsp;{title === 'Login' ? 'Sign up' : 'Log in'}
                        </Link>
                    </div>
                    <div className="login__form__icon">
                        <FacebookOutlined style={{ fontSize: '30px', color: '#000000' }} />
                        <AppleOutlined style={{ fontSize: '30px', color: '#000000' }} />
                        <GoogleOutlined style={{ fontSize: '30px', color: '#000000' }} onClick={handleClick} />
                        <TwitterOutlined style={{ fontSize: '30px', color: '#000000' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
