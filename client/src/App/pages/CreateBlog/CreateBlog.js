import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './CreateBlog.module.css';
import BodyHOC from '../../HOComponents/BodyHOC/BodyHoc';

class CreateBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            image: null,
            authorImg: null,
            author: null,
            description: null,
            success: false,
            successMsg: <p>Post was successfully created</p>
        }
    }
    createNewBlog = (name, image, authorImg, author, description) => {
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
                authorImg: authorImg,
                author: author,
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
    // https://placeimg.com/1080/480/animals
    // https://photos.app.goo.gl/u3oD5toBVjr4WWow9
    render() {
        return (
            <BodyHOC>
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
                            <label>Author Image</label>
                            <input type="text" onChange={e =>  {
                                    this.setState({authorImg: e.target.value})
                                }}/>
                        </div>
                        <div className={styles.BlogPostInput}>
                            <label>Author</label>
                            <input type="text" onChange={e =>  {
                                    this.setState({author: e.target.value})
                                }}/>
                        </div>
                        <div className={styles.BlogPostInput}>
                            <label>Body</label>
                            <textarea type="text" onChange={e =>  {
                                    this.setState({description: e.target.value})
                                }}/>
                        </div>
                        <div className={styles.BlogPostSubmitHolder}>
                            <button className={styles.BlogPostBtn} onClick={() =>
                                this.createNewBlog(this.state.name, this.state.image, this.state.authorImg, this.state.author, this.state.description)}>
                                Submit
                            </button>
                            {this.state.success ? this.state.successMsg : null}
                        </div>
                    </div>
                </div>
            </BodyHOC>
        )
    }
}

export default withRouter(CreateBlog);
