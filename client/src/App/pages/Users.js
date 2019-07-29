import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Users.module.css';

class Users extends Component {
  constructor(props) {
    super(props)
    this.user = null;
    this.pass = null;
  }

  componentDidMount() {
    if (this.props.auth) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.Title}>
          <h1>Please Sign In</h1>
        </div>
        <div className={styles.InputGrid}>
          <div className={styles.InputField}>
            <label className={styles.InputLabel}>Username</label>
            <input defaultValue={this.user}
              onChange={e =>  {
                this.user = e.target.value
              }}
              id="userName"
              className={styles.InputInput}
              type="text"/>
          </div>
          <div className={styles.InputField}>
            <label className={styles.InputLabel}>Password</label>
            <input defaultValue={this.pass}
              onChange={e =>  {
                this.pass = e.target.value
              }}
              id="password"
              className={styles.InputInput}
              type="text"/>
          </div>
          <button onClick={() => this.props.click(this.user, this.pass)} className={styles.SignIn}>
            Sign in
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Users)