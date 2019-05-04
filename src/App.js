import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom' 
import Home from './containers/Home/Home.react.js';
import NewPost from './containers/NewPost/NewPost.react.js';
import Post from './containers/Post/Post.react.js';
import EditPost from './containers/EditPost/EditPost.react.js';

import {
  Collapse,
  Navbar,
  NavbarBrand,
  Container, Row, Col } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>

    <Navbar color="light" light expand="md">
      <Container>
          <NavbarBrand href="/">Udacity</NavbarBrand>
          </Container>     
      </Navbar>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/newpost" component={NewPost} />
            <Route path="/post/:id"  component={Post} />
            <Route path="/home/:id" exact={true} component={Home} />
            <Route path="/editpost/:id"  component={EditPost} />

        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
