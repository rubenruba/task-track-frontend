import { FC, useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import './verifyEmail.sass';

export const VerifyEmail: FC = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const userService = new UserService();
        const url = new URLSearchParams(window.location.search);
        const token = url.get('token');
        const user = url.get('user');
        const verify = async () => {
            if (!token || !user) return;
            setRedirect(true)
            await userService.verifyEmail(user, token);
        }
        verify();
    }, []);

    return <div className="verify-email-container">
        {redirect && (<>
            <h1>Verify Completed</h1>
            <h2>Thanks for using Task Track.</h2>
            <h2>Yo will redirect to calendar in 5 seconds.</h2>
        </>)}
        {!redirect && (<>
            <h1>Verification Email Sended</h1>
            <h2>Please check your email to verify.</h2>
            <h2>If yo don't see any mail, check in spam.</h2>
        </>)}
    </div>
}