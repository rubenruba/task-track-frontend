import { FC } from "react";
import { useNavigate } from "react-router-dom";
import './notFound.sass';

export const NotFound: FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        const user = localStorage.getItem('user');
        if (!user) navigate('/login');
        else navigate('/calendar');
    }

    return <div className="not-found-container">
        <h1>404</h1>
        <h2>Page not found or unnaccesible</h2>
        <button onClick={goHome}>Go home</button>
    </div>
}