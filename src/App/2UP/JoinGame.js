'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
  SafeAreaView,
  Image,
  View,
} from 'react-native';

import {navigate, resetAction} from "../../../utils/navigationWrapper";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReactNativeHaptic from 'react-native-haptic';

// import { decodeTransaction, getTxFields, toAddress, serialize, unserialize, ec, sign, fromPhrase } from '../../common';
import {color} from "./themes";

import Camera from 'react-native-camera';

const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/rqmgop6P5BDFqz6yfGla'));
// web3.setProvider(new web3.providers.HttpProvider('https://www.etherdevswamp.org/rtethrpc'));
const privKey = 'cf06f0b35515af10b5dfef470e3a1e743470bf9033d06f198b4e829cb2e7ef05';


export default class ScanPublicKey extends Component {

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

  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      balance: '',
      privKey: false,
      pubKey: false,
      mode: 'loading',
      transaction: null,
      result: null,
      signedTx: null,
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        orientation: Camera.constants.Orientation.auto,
      },
    };
  }

  _saveKeys = () => {
    let {pubKey} = this.state;
    navigate('WalletMain', {pubKey});
  };


  _onBarcodeRead = (data) => {
    navigate('GameList', {data})
  };

  render() {
    // const { name } = this.props.navigation.state.params.data;
    const name = 'hello';
    const {pubKey, privKey, balance} = this.state;
    privKey && pubKey ? this._saveKeys() : null;
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={this.state.camera.aspect}
        captureTarget={this.state.camera.captureTarget}
        defaultTouchToFocus
        mirrorImage={false}
        onBarCodeRead={_.debounce(this._onBarcodeRead, 300, {
          'leading': true,
          'trailing': false
        })}
      >
        <FontAwesome name="qrcode"
                     color={color.blue}
                     size={30}
                     style={{
                       marginTop: 50,
                       shadowColor: 'black',
                       shadowOpacity: 0.5,
                       shadowRadius: 5,
                       shadowOffset: {
                         width: 3,            // These can't both be 0
                         height: 6,           /* i.e. the shadow has to be offset in some way*/
                       }
                     }}
          />
        { name !== 'publicAddressRequest' &&
          <View style={styles.boxContent}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.topNavText}>SCAN QRCODE</Text>
              </View>
            </View>
          </View>

        }
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  topNavText: {
    fontFamily: 'DIN Condensed',
    color: 'white',
    fontSize: 16,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  tickBoxActive: {
    width: 10,
    height: 10,
    backgroundColor: color.magenta,
    borderRadius: 2,
  },
  tickBoxInactive: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTouchable: {
    padding: 16,
  },
  boxContent: {
    backgroundColor: "transparent",
    flexDirection: 'column',
    padding: 22,
    justifyContent: "space-between",
    alignItems: "stretch",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: color.blue,
    marginBottom: 40
  },
});