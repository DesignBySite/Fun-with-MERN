import React from 'react';
import styles from './latestBlog.module.css';

class LatestBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        list: []
    }
}
    componentDidMount() {
        this.saveCat();
    }

    saveCat = () => {
        fetch('/newest-blog')
        .then(res => res.json())
        .then(list => {
          this.setState({ list: [list] })
        });
    }
  render() {
    let { list } = this.state;
    console.table(list);
    console.log(list.length);
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
export default LatestBlog