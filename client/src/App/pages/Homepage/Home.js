import React, { Component } from 'react';
import BodyHOC from '../../HOComponents/BodyHOC/BodyHoc';
import styles from './Home.module.css';

class Home extends Component {
    render() {
        const user = this.props.user ? this.props.user : null;
        return (
            <BodyHOC>
                <div className="App">
                    <div className={styles.HomepageContainer}>
                        <div className={styles.TopContainer}>
                            <h1>Welcome to my blog {user}</h1>
                        </div>
                        <div className={styles.HomepageText}>
                            <p>This is a blog I built from scratch as a prototype to leverage in my freelance projects. A few friends have asked for the blog to be created for their own small businesses and reached out to me to create one for them.</p>
                            <p>I could try to think of more to say to fill up space, but I can't so look around and enjoy!</p>
                        </div>
                    </div>
                </div>
            </BodyHOC>
        )
    }
}

export default Home;
