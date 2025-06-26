import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // auto close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#38a169', // Tailwind's green-600
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                fontSize: '16px',
            }}
        >
            {message}
        </div>
    );
};

export default Toast;
