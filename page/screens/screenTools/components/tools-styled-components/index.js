import React from 'react';
import { WebView } from 'react-native-webview';

class StyledComponents extends React.Component {
  constructor(props) {
    super(props);
    this.url = `https://styled-components.com/docs/basics#react-native`;
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

export default StyledComponents;
