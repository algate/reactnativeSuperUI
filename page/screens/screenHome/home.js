import React from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import LoadFailedView from '../../components/failed/loadFailedView';


const echarts = require('../../html/webview.html');

const FailedContainer = styled.View`
  width: 100%;
  height: 100%;
`;

class EchartsView extends React.Component {
  constructor(props) {
    super(props);
    this.url = `http://127.0.0.1:5500/rn/reactnativeSuperUI/html/webview.html`;
    /* this.url = `https://www.h2clab.com/open_h5/#/?app_id=test_app_id&app_secret=test_app)secrete&redirect_uri=https://www.example.com/auth&response_type&scope=&state=&mode=OAuth2`; */
  }

  renderError = () => {
    // const {mode} = this.props.mode;
    return (
      <FailedContainer>
        <LoadFailedView onRetry={this.webView.reload} theme={this.props.theme}/>
      </FailedContainer>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <WebView
          ref={webView => this.webView = webView}
          source={{uri: this.url}}
          renderError={this.renderError}
        />
      </View>
    );
  }
}

export default EchartsView;