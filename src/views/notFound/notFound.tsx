import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import './notFound.sass';

export const NotFound: FC = () => {
    const userService = new UserService();
    const navigate = useNavigate();

    const goHome = () => {
        const userDecoded = userService.getCurrentUser();
        if (!userDecoded) navigate('/login');
        else navigate('/calendar');
    }

    return <div className="not-found-container">
        <h1>404</h1>
        <h2>Page not found or unnaccesible</h2>
        <button onClick={goHome}>Go home</button>
    </div>
}