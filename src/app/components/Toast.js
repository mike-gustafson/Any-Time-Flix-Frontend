// Toast.js
import React, { useEffect, useState } from 'react';
import style from '../styles/Toast.module.css'; // Ensure you have this CSS file

const Toast = ({ message, duration = 2000, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        // Wait for the slide-out animation to finish before removing the toast
        const animationTimer = setTimeout(() => {
            onDismiss();
        }, duration + 500); // 500ms for the slide-out animation

        return () => {
            clearTimeout(timer);
            clearTimeout(animationTimer);
        };
    }, [duration, onDismiss]);

    return (
        <div className={`${style.toast} ${isVisible ? style.slideIn : style.slideOut}`}>
            {message}
        </div>
    );
};

export default Toast;
