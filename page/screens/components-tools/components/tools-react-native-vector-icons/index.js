import React from 'react';
import { WebView } from 'react-native-webview';

class vectorIcons extends React.Component {
  constructor(props) {
    super(props);
    this.url = `https://oblador.github.io/react-native-vector-icons/`;
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

export default vectorIcons;
