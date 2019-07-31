import React, { Component } from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

class Footer extends Component {

    setCopyrightYear = () => {
        if (new Date().getFullYear() === 2019) {
            return;
        }
        return ` - ${new Date().getFullYear()}`
    }
    render() {
        const copyRightYear = this.setCopyrightYear();
        return(
            <footer className={styles.FooterContainer}>
                <div></div>
                <div>Info about Owner</div>
                <div className={styles.CopyRight}>
                    <FontAwesomeIcon icon={faCopyright}/>
                    <p>2019{copyRightYear}</p>
                </div>
            </footer>
        );
    }
}

export default Footer