import LogoutIcon from '@mui/icons-material/Logout';
import { FC } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";
import './menu.sass';

export const MenuComponent: FC = () => {
    const userService = new UserService();
    const user = userService.getCurrentUser()?.user;
    const darkBlue = { color: "#47B4EB", cursor: "pointer" };

    return (
        <nav>
            <div>
                <img src={require('../../assets/logo.png')} alt="logo" /> 
                <ul>
                    <li><Link to='/calendar'>Calendar</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            </div>

            <div className='nav-username'>
                <p>{user?.username}</p>
                <LogoutIcon 
                    titleAccess='Logout' 
                    onClick={userService.logout} 
                    sx={darkBlue} 
                />
            </div>
        </nav>  
    )
}