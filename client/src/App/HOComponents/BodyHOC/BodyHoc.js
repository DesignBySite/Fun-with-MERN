import React from 'react';
import styles from './BodyHOC.module.css';

const hocComponent = props => {
    return (
        <div className={styles.BodyHOC} {...props}>
            {props.children}
        </div>
    )
}

export default hocComponent;

