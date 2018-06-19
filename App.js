import React, {Component} from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './src/components/common';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = {loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAEwH4_x1lp4zEjk4Lj1d2zKUThi0Psq20",
      authDomain: "auth-reactnative-6a621.firebaseapp.com",
      databaseURL: "https://auth-reactnative-6a621.firebaseio.com",
      projectId: "auth-reactnative-6a621",
      storageBucket: "auth-reactnative-6a621.appspot.com",
      messagingSenderId: "56551966568"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );

      case false:
        return <LoginForm />

      default:
        return <Spinner size="large" />;
    }    
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication"></Header>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
