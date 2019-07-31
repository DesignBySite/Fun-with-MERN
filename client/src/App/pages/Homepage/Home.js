import React, { Component } from 'react';
import BodyHOC from '../../HOComponents/BodyHOC/BodyHoc';

class Home extends Component {
    render() {
        const user = this.props.user ? <h2>Hello {this.props.user}</h2> : null;
        return (
            <BodyHOC>
                <div className="App">
                    <h1>Project Home</h1>
                    {user}
                </div>
            </BodyHOC>
        )
    }
}

export default Home;
