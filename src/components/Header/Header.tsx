import { useStore } from "effector-react";
import { $auth, $username } from "../../context/auth";
import { removeUser } from "../../utils/auth";
import './style.css';

export const Header = () => {
    const username = useStore($username);
    const loggetIn = useStore($auth);

    return (
        <header className={`navbar bg-dark`}>
            <div className="container header">
                <h1>Мій бюджет</h1>
                {username.length ? <h2>{username}</h2> : ''}
                {loggetIn && <button onClick={removeUser} className='btn btn-logout btn-primary' >Вихід</button>}
            </div>
        </header>
    )
}