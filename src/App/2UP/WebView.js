import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Vibration,
  View,
  WebView,
} from 'react-native';

import {text} from './themes';
import Input from './Input';
import ReactNativeHaptic from 'react-native-haptic';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

import { navigate } from "../../../utils/navigationWrapper";

let {height, width} = Dimensions.get('window');

export default class WebViewTx extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle:
        {
          position: 'absolute',
          backgroundColor: 'transparent',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
          borderBottomWidth: 0,
        },
    }
  };

  constructor() {
    super();
    this.state = {
      visibleModal: null,
      receiverAddress: '',
      amount: null,
    };
  }

  render() {
    const {} = this.state;
    const {isVisible, _this} = this.props;
    return (
      <WebView
        source={{uri: 'https://ropsten.etherscan.io/tx/0xa5805a8dce18db130cdc7eae7ea3835b503882c3f35ab72e5aae4758bf600e51'}}
        style={{marginTop: 25, backgroundColor: 'white'}}
      />
    )
  }
}


const styles = StyleSheet.create({
  accountBox: {
    padding: 10,
    width: width/2 - 20,
    height: width/2 - 70,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  accountBoxText: {
    fontFamily: 'DIN Condensed',
    color: 'grey',
    fontSize: 15,
  },
  button: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "transparent",
    flexDirection: 'row',
    padding: 22,
    justifyContent: "space-between",
    alignItems: "stretch",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "yellow"
  },
  modalInput: {
    fontFamily: 'DIN Condensed',
    backgroundColor: "transparent",
    height: 35,
    width: 200,
    padding: 5,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "yellow",
    color: 'white',
  },
  topNavText: {
    fontFamily: 'DIN Condensed',
    color: 'white',
    fontSize: 16,
  },
});