import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './List.module.css';
import ListServicesProvider from '../../services/ListServices';
import BodyHOC from '../../HOComponents/BodyHOC/BodyHoc';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        this.ListServicesProvider = new ListServicesProvider();
    }

    componentDidMount() {
        this.ListServicesProvider.getList().then(res => this.setState({ list: res }));
    }

    componentDidUpdate(prevState) {
        console.log(prevState, this.state);
    }

    deletePostHandler = _id => {
        console.log(_id);
        fetch(`/api/blog/delete/${_id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(list => this.setState({ list }));
    }

    isUserAdminHandler = item => {
        if (this.props.userType !== 'Admin') {
            console.log('not Admin');
            return;
        }
        console.log(item);
        return <div className={styles.BlogEditControlContainer}>
                <button className={styles.EditBtn}>Edit</button>
                <button className={styles.DeleteBtn} onClick={() => this.deletePostHandler(item._id)}>Delete</button>
            </div>
    }

    render() {
        console.log(this.state.list);
        return(
            <BodyHOC>
                <div className="App">
                {/* <h1>List of Blogs</h1> */}
                    {this.state.list.length ? (
                        <div className={styles.List}>
                            {this.state.list.map(item => {
                                console.log(`./blog-${item._id}`);
                                return(
                                    <div className={styles.Item} key={item._id}>
                                        <Link className={styles.ItemPreview} to={`./blog-${item._id}`} onClick={() => this.props.goToBlogClick(item._id)}>
                                            <img className={styles.Image} src={item.image} alt={item.name} />
                                            <div>
                                                <img src={item.authorImage} alt={item.author}/>
                                            </div>
                                            <div className={styles.ItemInfoPreview}>
                                                <p className={styles.Title}>{item.name}</p>
                                                <p>{item.body}</p>
                                            </div>
                                        </Link>
                                        {this.isUserAdminHandler(item)}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div>
                            <h2>No List items found</h2>
                        </div>
                        )
                    }
                </div>
            </BodyHOC>
        );
    }
}

export default List