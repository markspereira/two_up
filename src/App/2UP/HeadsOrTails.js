import React, { Component } from 'react';
import {
  AppRegistry,
  Clipboard,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
const Web3 = require('web3');
import Toast from 'react-native-easy-toast';
import Drawer from 'react-native-drawer';

import DrawerView from './DrawerView';
import TxPopUp from './TxPopUp';
import QRCode from './QRCode';

const privateKey = new Buffer('cf06f0b35515af10b5dfef470e3a1e743470bf9033d06f198b4e829cb2e7ef05', 'hex');

const privateKeyString = 'cf06f0b35515af10b5dfef470e3a1e743470bf9033d06f198b4e829cb2e7ef05';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/rqmgop6P5BDFqz6yfGla'));
import {color} from "./themes";

let { height, width } = Dimensions.get('window');
import {navigate} from "../../../utils/navigationWrapper";

type Props = {};
export default class Main extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarVisible: false,
      headerVisible: false,
      headerStyle:
        {
          position: 'absolute',
          marginTop: -100,
          backgroundColor: 'transparent',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
          borderBottomWidth: 0,
        },
    }
  };

  state = {
    exchangeRate: 0,
    balance: null,
    account: 'alpha',
    visibleModal: null,
    publicAddress: '',
    txCount: 0
  };

  componentDidMount() {
    // web3.eth.accounts.create()
    //   .then(res => console.log('CREATED ACCOUNT: ', res));
    // fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({exchangeRate: responseJson.USD})
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    web3.eth.getTransactionCount('0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7')
      .then(txCount => this.setState({ txCount }));
    web3.eth.getCoinbase((err, coinbase) => {
      const balance = web3.eth.getBalance('0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7', (err2, balance) => {
        console.log('balance ' + balance);
        this.setState({balance});
      });
    });
  }

  _joinGame = () => {
    navigate('JoinGame');
  };
  _createGame = () => {
    navigate('QRCode')
  };

  render() {
    const {account, balance, publicAddress, exchangeRate, txCount} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'space-around', padding: 50}}>
        <Text style={{fontSize: 40, color: color.darkBlue, fontWeight: 'bold'}}>Choose either Heads</Text>
        <Image style={{height: 200, resizeMode: 'contain'}} source={require('../../../public/ethereum_coin.png')} />
        <Text style={{fontSize: 40, color: color.darkBlue, fontWeight: 'bold'}}>or Tails</Text>
        <Image style={{height: 200, resizeMode: 'contain'}} source={require('../../../public/tails.png')} />      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  drawer: {
    backgroundColor: 'black',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    zIndex: -9999,
  },
  balanceButton: {
    backgroundColor: '#0dab7f',
    padding: 10,
    width: 200,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  topNavText: {
    fontFamily: 'DIN Condensed',
    color: 'white',
    fontSize: 16,
  },
  bottomNavTextLarge: {
    fontFamily: 'DIN Condensed',
    color: 'white',
    fontSize: 40,
    marginBottom: -10
  },
  bottomNavTextSmall: {
    fontFamily: 'DIN Condensed',
    color: 'grey',
    fontSize: 13,
    marginBottom: -5
  },
  balanceText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
  bottomNav: {
    flexDirection: 'column'
  },
  linesAndLogo: {
    width: width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "transparent",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "yellow"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});
