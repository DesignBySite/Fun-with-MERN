import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.css';
import Home from './pages/Homepage/Home';
import List from './pages/List/List';
import Users from './pages/SignIn/Users';
import Contact from './pages/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import BlogHolder from './components/BlogHolder/BlogHolder';
import ListServicesProvider from './services/ListServices';
import Footer from './components/Footer/Footer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userType: null,
      userAuth: false,
      list: [],
      listItem: {
        _id: '',
        name: '',
        image: '',
        body: ''
      }
    }
    this.ListServicesProvider = new ListServicesProvider();
  }

  componentDidMount() {
    this.ListServicesProvider.getList().then(res => this.setState({ list: res }));
  }

  signInHandler = async(userName, password) => {
    try {
      await fetch(`/api/sign-in/${userName}/${password}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(res => res.json())
      .then(data => this.setState({
        user: data[0].first_name,
        userType: data[0].userType,
        userAuth: true
      }));
    } catch (err) {
      console.log(err);
    }
  }

  createUserHandler = () => {
    fetch('/api/user/create', {
      method: 'POST'
    })
  }
  getListItem = id => {
    console.log('called');
    this.state.list.forEach(x => {
      console.log(x);

      if (x._id === id) {
        this.setState({ listItem: x}, () => console.log(this.state.listItem));
      }
    })
  }

  render() {
    const App = () => (
      <div>
        <Navbar userName={this.state.user} />
        <div className={styles.RouteDisplayBody}>
          <Switch>
            <Route exact path='/' render={() => <Home user={this.state.user}/>}/>
            <Route path='/list' render={() => <List goToBlogClick={this.getListItem} userType={this.state.userType}/>}/>
            <Route path='/users' render={() => <Users auth={this.state.userAuth} click={this.signInHandler} />}/>
            <Route path='/create-new-blog' render={() => <CreateBlog auth={this.state.userAuth} click={this.signInHandler} />}/>
            <Route path='/contact' component={Contact}/>
            <Route path={`/blog-${this.state.listItem._id}`} render={() => <BlogHolder title={this.state.listItem.name} image={this.state.listItem.image} description={this.state.listItem.body}/>}/>
          </Switch>
        </div>
        <Footer/>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;