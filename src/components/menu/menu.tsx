import { FC } from "react";
import { Link } from "react-router-dom";
import './menu.sass';

export const MenuComponent: FC = () => {

    return (
        <nav>
            <div>
                <img src="" alt="" /> 
                <ul>
                    <li><Link to='/calendar'>Calendar</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            </div>
            <p>Username</p>
        </nav>  
    )
}