// DimmingFilter.js
import React from 'react';
import styles from './DimmingFilter.module.css';

export default function DimmingFilter({ onClose }) {
    return (
        <div className={styles.dimmingFilter} onClick={onClose}></div>
    );
}
