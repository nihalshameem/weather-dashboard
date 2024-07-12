import React from 'react';
import { toast } from 'react-toastify';

const ErrorToast: React.FC<{ message: string }> = ({ message }) => {
    const notify = () => toast.error(message);

    React.useEffect(() => {
        if (message) {
            notify();
        }
    }, [message]);

    return null;
};

export default ErrorToast;
