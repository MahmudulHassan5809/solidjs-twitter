import { login } from '../api/auth';
import { AuthForm } from '../types/Form';

const useLogin = () => {
    const loginUser = async (authForm: AuthForm) => {
        const user = await login(authForm);
    };

    return {
        loginUser
    };
};

export default useLogin;
