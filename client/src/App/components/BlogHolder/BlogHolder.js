import React, { Component } from 'react';
import styles from './BlogHolder.module.css';
import BodyHOC from '../../HOComponents/BodyHOC/BodyHoc';

class BlogHolder extends Component {
    constructor(props) {
        super(props);
        this.props = this.props;
    }
    render() {
        console.log(this.props);
        return (
            <BodyHOC>
                <div className={styles.Container}>
                    <div className={styles.BlogContainer}>
                        <div className={styles.ImageContainer}>
                            <img className={styles.Image} src={this.props.image} alt={this.props.title}/>
                        </div>
                        <div className={styles.BlogBodyContainer}>
                            <h1 className={styles.Title}>{this.props.title}</h1>
                            <div>
                                <p>{this.props.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </BodyHOC>
        )
    }
}

export default BlogHolder
