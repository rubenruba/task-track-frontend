import { DeleteOutline } from '@mui/icons-material';
import { IconButton, Input, Modal } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ListModel } from '../../models/list';
import { UserEmail } from '../../models/user';
import { UserService } from '../../services/UserService';
import './addUserModal.sass';

interface AddUserModalProps {
    list: ListModel;
    open: boolean;
    handleClose: () => void;
    handleEdit: (list: ListModel) => void;
}

export const AddUserModal: FC<AddUserModalProps> = ({ list, open, handleEdit, handleClose }) => {
    const userService = new UserService();
    const [userEmails, setUserEmails] = useState<UserEmail[]>([]);
    const [addUserEmail, setAddUserEmail] = useState('');

    useEffect(() => {
        const getEmails = async () => {
            const userEmails = await userService.getAllEmails();
            setUserEmails(userEmails.filter(us => us.email !== userService.getCurrentUser()?.user.email));
        }
        getEmails();
    }, []);

    const addUser = () => {
        const userId = userEmails.find(us => us.email === addUserEmail)?.userId;
        if (!userId) return;
        list.users.push(userId);
        handleEdit(list);
        setAddUserEmail('');
    }

    const deleteUser = (userId: string) => {
        list.users = list.users.filter(us => us !== userId);
        handleEdit(list);
    }

    const getUserEmail = (userId: string) => {
        return userEmails.find(us => us.userId === userId)?.email ?? '';
    }

    return <Modal open={open} className='modal-base' onClose={handleClose}>
        <div className='modal-content'>
            <h2>Users of "{list.title}"</h2>
            <Input
                value={addUserEmail}
                onChange={(e) => setAddUserEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addUser()}
                onBlur={addUser}
                style={{ width: '100%' }}
                placeholder='User email to add...'
            />
            {list.users.map(us => {
                if (us === userService.getCurrentUser()?.user.id) return '';
                else return <div key={us} className='task-list-user'>
                    <p>- {getUserEmail(us)}</p>
                    <IconButton
                        onClick={() => deleteUser(us)}
                        size="small"
                        sx={{ padding: "5px" }}
                    >
                        <DeleteOutline className="delete-task-list-user-icon" sx={{ color: "#d33838" }} />
                    </IconButton>
                </div>;
            })}
        </div>
    </Modal>
}