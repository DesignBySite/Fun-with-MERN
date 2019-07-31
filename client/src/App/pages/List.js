import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './List.module.css';
import ListServicesProvider from '../services/ListServices';

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


    render() {
        return(
            <div className="App">
                <h1>List of Blogs</h1>
                    {this.state.list.length ? (
                        <div className={styles.List}>
                            {this.state.list.map(item => {
                                console.log(`./blog-${item._id}`);
                                return(
                                    <div className={styles.Item} key={item._id}>
                                        <Link to={`./blog-${item._id}`} onClick={() => this.props.goToBlogClick(item._id)}>
                                            <p className={styles.Title}>{item.name}</p>
                                            <img className={styles.Image} src={item.image} alt={item.name} />
                                        </Link>
                                        <button>Edit</button>
                                        <button onClick={() => this.deletePostHandler(item._id)}>Delete</button>
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
        );
    }
}

export default List