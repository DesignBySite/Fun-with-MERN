import React, { Component } from 'react';
import styles from './List.module.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        fetch('/api/getList')
        .then(res => res.json())
        .then(list => this.setState({ list }));
    }
    render() {
        const { list } = this.state;
        console.log(list);
        return(
            <div className="App">
                <h1>List of Blogs</h1>
                    {list.length ? (
                        <div className={styles.List}>
                            {list.map(item => {
                                return(
                                    <div className={styles.Item} key={item._id}>
                                        <p className={styles.Title}>{item.name}</p>
                                        <img className={styles.Image} src={item.image} alt={item.name}/>
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