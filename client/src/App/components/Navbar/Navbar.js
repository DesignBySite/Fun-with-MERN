import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.name = props.userName;
        this.auth = props.auth;
    }
    create = () => {
        fetch('/create-user', {
            method: 'POST'
        })
        .then(res => console.log(res));
    }

    render() {
        return (
            <nav className={styles.Navbar}>
                <div className={styles.homeBtn}>
                    <Link to={'./'}>
                        <button className={styles.NavbarBtn}>
                            home
                        </button>
                    </Link>
                </div>
                <div className={styles.OptionBtns}>
                    <Link to={'./list'}>
                        <button className={styles.NavbarBtn}>
                            My blogs
                        </button>
                    </Link>
                    <Link to={'./latestBlog'}>
                        <button className={styles.NavbarBtn}>
                            Latest Blog
                        </button>
                    </Link>
                    <Link to={'./Contact'}>
                        <button className={styles.NavbarBtn}>
                            Contact Me
                        </button>
                    </Link>
                    <Link to='./create-new-blog'>
                        <button className={styles.NavbarBtn}>
                            Create
                        </button>
                    </Link>
                    <Link to={'./users'}>
                        <button className={styles.NavbarBtn}>
                            Sign in
                        </button>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Navbar
