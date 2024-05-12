import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";
import './menu.sass';

export const MenuComponent: FC = () => {
    const userService = new UserService();
    const user = userService.getCurrentUser()?.user;
    const menuRef = useRef<HTMLDivElement | null>(null);
    const actionIcons = { color: "#47B4EB", cursor: "pointer" };
    const listIcons = { color: '#0197F6', marginRight: '10px' }

    const openMenu = () => {
        if (!menuRef.current) return;
        if (menuRef.current.style.display === 'none') menuRef.current.style.display = 'flex';
        else menuRef.current.style.display = 'none';
    }

    return (
        <nav>
            <MenuIcon className='menu-icon' onClick={openMenu} sx={actionIcons} />
            <img src={require('../../assets/logo.png')} alt="logo" className='mobile-logo' /> 
            <div className='menu-container' ref={menuRef}>
                <div>
                    <img src={require('../../assets/logo.png')} alt="logo" /> 
                    <ul>
                        <li>
                            <CalendarMonthIcon sx={listIcons} />
                            <Link to='/calendar'>Calendar</Link>
                        </li>
                        <li>
                            <TaskAltIcon sx={listIcons} />
                            <Link to='/tasks'>All Tasks</Link>
                        </li>
                        <li>
                            <AssignmentIcon sx={listIcons} />
                            <Link to=''>Lists</Link>
                        </li>
                    </ul>
                </div>

                <div className='nav-username'>
                    <p>{user?.username}</p>
                    <LogoutIcon 
                        titleAccess='Logout' 
                        onClick={userService.logout} 
                        sx={actionIcons} 
                    />
                </div>
            </div>
        </nav>  
    )
}