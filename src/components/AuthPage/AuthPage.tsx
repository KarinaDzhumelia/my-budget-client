import React, { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthClient } from '../../api/authClient';
import { handleAlertMessage } from '../../utils/auth';
import { Spinner } from '../Spinner/Spinner';
import './style.css';

export const AuthPage = ({ type }: { type: 'login' | 'registration' }) => {
    const [spinner, setSpinner] = useState(false);
    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();
    const currentAuthTitle = type === 'login' ? 'Вхід' : 'Реєстрація';
    
    const handleAuthResponse = (
        result: boolean | undefined, 
        navigatePath: string, 
        alertText: string
        ) => {
            if (!result) {
                setSpinner(false);
                return;
            }
    
            setSpinner(false);
            navigate(navigatePath);
            handleAlertMessage({ alertText, alertStatus: 'success' });
    }

    const handleLogin = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false);
            handleAlertMessage({ alertText: 'Будь-ласка, заповніть всі поля', alertStatus: 'warning' });
            return;
        }

        const result = await AuthClient.login(username, password);
        
        handleAuthResponse(result, '/costs', 'Успішний вхід');
    }

    const handleRegistration = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false);
            handleAlertMessage({ alertText: 'Будь-ласка, заповніть всі поля', alertStatus: 'warning' });
            return;
        }

        if (password.length < 8) {
            setSpinner(false);
            handleAlertMessage({ alertText: 'Пароль повинен містити не менше 8 символів', alertStatus: 'warning' });
            return;
        }

        const result = await AuthClient.registration(username, password);
    
        handleAuthResponse(result, '/login', 'Успішна реєстрація');
    }

    const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSpinner(true);

        switch (type) {
            case 'login':
                handleLogin(usernameRef.current.value, passwordRef.current.value)
                break;
            case 'registration':
                handleRegistration(usernameRef.current.value, passwordRef.current.value)
                break;
            default:
                break;
        }
    }
    
    return (
        <div className="container auth-page">
            <h1>{currentAuthTitle}</h1>
            <form onSubmit={handleAuth} className="form-group">
                <label className="auth-label">
                    Введіть ім'я користувача
                    <input ref={usernameRef} type="text" className="form-control" />
                </label>
                <label className="auth-label">
                    Введіть пароль
                    <input ref={passwordRef} type="password" className="form-control" />
                </label>
                <button className="btn btn-primary auth-btn">
                    {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
                    </button>
            </form>
            {
                type === 'login'
                ? <div>
                    <span className='auth-span'>Немає акаунту?</span>
                    <Link to={'/registration'} className='auth-link'>Реєстрація</Link>
                </div>
                : <div>
                    <span className='auth-span'>Вже маєте акаунт?</span>
                    <Link to={'/login'} className='auth-link'>Вхід</Link>
                </div>
            }
        </div>
    )
}