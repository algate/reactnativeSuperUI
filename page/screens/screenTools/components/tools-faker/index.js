import React from 'react';
import { WebView } from 'react-native-webview';

class Faker extends React.Component {
  constructor(props) {
    super(props);
    this.url = `http://marak.github.io/faker.js/`;
  }
  render() {
    return (
      <WebView
        ref={webView => this.webView = webView}
        source={{uri: this.url}}
      />
    );
  }
}

export default Faker;
