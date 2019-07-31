import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './CreateBlog.module.css';

class CreateBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            image: null,
            description: null,
            success: false,
            successMsg: <p>Post was successfully created</p>
        }
    }
    createNewBlog = (name, image, description) => {
        if ((this.state.name || this.state.image || this.state.description) == null) {
            console.log(this.state.name, this.state.image, this.state.description);
            console.log('is null');
            return;
        }
        fetch('/api/blog/create', {
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
                this.setState({success: true});

                console.log(this.state.success, res.status);
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
                                this.setState({name: e.target.value})
                            }}/>
                    </div>
                    <div className={styles.BlogPostInput}>
                        <label>Image</label>
                        <input type="text" onChange={e =>  {
                                this.setState({image: e.target.value})
                            }}/>
                    </div>
                    <div className={styles.BlogPostInput}>
                        <label>Body</label>
                        <textarea type="text" onChange={e =>  {
                                this.setState({description: e.target.value})
                            }}/>
                    </div>
                    <div className={styles.BlogPostSubmitHolder}>
                        <button className={styles.BlogPostBtn} onClick={() => this.createNewBlog(this.state.name, this.state.image, this.state.description)}>
                            Submit
                        </button>
                        {this.state.success ? this.state.successMsg : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateBlog);
