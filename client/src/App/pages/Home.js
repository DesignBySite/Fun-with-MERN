import React, { Component } from 'react';

class Home extends Component {
    render() {
        const user = this.props.user ? <h2>Hello {this.props.user}</h2> : null;
        return (
            <div className="App">
                <h1>Project Home</h1>
                {user}
            </div>
        )
    }
}

export default Home;
