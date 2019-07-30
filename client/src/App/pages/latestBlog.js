import React from 'react';
import { Link } from 'react-router-dom';
import styles from './latestBlog.module.css';

class LatestBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list: []
    }
}
    componentDidMount() {
        this.getLatestBlog();
    }

    getLatestBlog = () => {
        fetch('/newest-blog')
        .then(res => res.json())
        .then(list => {
        this.setState({ list: [list] })
        });
    }
  render() {
    let { list } = this.state;
    if (list.length) {
      // list = list.splice(0, 1);
    }
    return(
        <div className="App">
            <h1>List of Items</h1>
                {list.length ? (
                    <div className={styles.List}>
                        {list.map(item => {
                            return(
                                <div className={styles.Item} key={item._id}>
                                    <Link to={`./blog-${item._id}`} onClick={() => this.props.goToBlogClick(item._id)}>
                                        <p className={styles.Title}>{item.name}</p>
                                        <img className={styles.Image} src={item.image} alt={item.name}/>
                                    </Link>
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
export default LatestBlog