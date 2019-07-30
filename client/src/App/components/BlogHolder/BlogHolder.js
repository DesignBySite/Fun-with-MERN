import React, { Component } from 'react';
import styles from './BlogHolder.module.css';

class BlogHolder extends Component {
    constructor(props) {
        super(props);
        this.props = this.props;
    }
    render() {
        console.log(this.props);
        return (
            <div className={styles.Container}>
                <div className={styles.BlogContainer}>
                    <h1 className={styles.Title}>{this.props.title}</h1>
                    <div className={styles.ImageContainer}>
                        <img className={styles.Image} src={this.props.image} alt={this.props.title}/>
                    </div>
                    <div>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogHolder
