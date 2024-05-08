import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";
import './menu.sass';

export const MenuComponent: FC = () => {
    const userService = new UserService();
    const user = userService.getCurrentUser()?.user;
    const icon = { color: "#47B4EB", cursor: "pointer" };
    const menuRef = useRef<HTMLDivElement | null>(null);

    const openMenu = () => {
        if (!menuRef.current) return;
        if (menuRef.current.style.display === 'none') menuRef.current.style.display = 'flex';
        else menuRef.current.style.display = 'none';
    }

    return (
        <nav>
            <MenuIcon className='menu-icon' onClick={openMenu} sx={icon} />
            <img src={require('../../assets/logo.png')} alt="logo" className='mobile-logo' /> 
            <div className='menu-container' ref={menuRef}>
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
                        sx={icon} 
                    />
                </div>
            </div>
        </nav>  
    )
}