import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './CreateBlog.module.css';

class CreateBlog extends Component {
    constructor(props) {
        super(props)
        this.name = null;
        this.image = null;
        this.description = null;
        this.success = false;
    }
    createNewBlog = (name, image, description) => {
        if ((this.name || this.image || this.description) == null) {
            console.log(this.name, this.image, this.description);
            console.log('is null');
            return;
        }
        fetch('/create', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                image: image,
                body: description
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            if (res.status === 200 ) {
                this.success = true;
                console.log(this.success, res.status);
            }
        });
    }

    render() {
        return (
            <div className={styles.BlogPostHolder}>
                <div className={styles.BlogPostForm}>
                    <div className={styles.BlogPostInput}>
                        <label>Name</label>
                        <input type="text" onChange={e =>  {
                                this.name = e.target.value
                            }}/>
                    </div>
                    <div className={styles.BlogPostInput}>
                        <label>Image</label>
                        <input type="text" onChange={e =>  {
                                this.image = e.target.value
                            }}/>
                    </div>
                    <div className={styles.BlogPostInput}>
                        <label>Body</label>
                        <textarea type="text" onChange={e =>  {
                                this.description = e.target.value
                            }}/>
                    </div>
                    <div className={styles.BlogPostSubmitHolder}>
                        <button className={styles.BlogPostBtn} onClick={() => this.createNewBlog(this.name, this.image, this.description)}>
                            Submit
                        </button>
                        {this.success ? <p>Post was successfully created</p> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateBlog);
