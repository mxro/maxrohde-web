import React from 'react';
import styles from './Background.module.css';

export default function Background(): JSX.Element {
  return (
    <div className={`${styles.background} fixed z-0`}>
      <ul className={styles.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
