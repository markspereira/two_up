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
import {text} from "./themes";

let { height, width } = Dimensions.get('window');
import {navigate} from "../../../utils/navigationWrapper";


type Props = {};
export default class WalletMain extends Component<Props> {
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
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({exchangeRate: responseJson.USD})
      })
      .catch((error) => {
        console.error(error);
      });
    web3.eth.getTransactionCount('0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7')
      .then(txCount => this.setState({txCount}));
    web3.eth.getCoinbase((err, coinbase) => {
      const balance = web3.eth.getBalance('0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7', (err2, balance) => {
        console.log('balance ' + balance);
        this.setState({balance});
      });
    });
  }

  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  render() {
    const {account, balance, publicAddress, exchangeRate, txCount} = this.state;
    return (
      <View style={{flex: 1}}>
        <Drawer
          ref={(ref) => this._drawer = ref}
          type="overlay"
          content={<DrawerView close={this.closeControlPanel}/>}
          side="right"
          tapToClose={true}
          style={styles.drawerStyles}
          openDrawerOffset={width/2}
        >
          <View style={styles.container}>
            <View style={{ width: width - 40, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={this._pressHandler}>
                <Image style={{width: 22, height: 22, marginBottom: 3, resizeMode:'contain'}} source={require('../../../public/send_icon.png')} />
              </TouchableOpacity>
              <Text style={styles.topNavText}>{account.toUpperCase()} ACCOUNT</Text>
              <TouchableOpacity style={{zIndex: 99999999999}} onPress={this.openControlPanel}>
                <Image style={{width: 25, height: 25, marginBottom: 3, resizeMode:'contain'}} source={require('../../../public/vault.png')} />
              </TouchableOpacity>
            </View>
            <Text style={text.greyMedium}>{publicAddress}</Text>
            <QRCode
              balance={balance}
              toast={this.refs.toast}
            />
            //TODO: reset account
            <TxPopUp
              isVisible={this.state.visibleModal === 1}
              _this={this}
            />
            <View style={styles.bottomNav}>
              <View style={styles.linesAndLogo}>
                <View
                  style={{
                    flex: 1,
                    borderBottomColor: '#F8E71C',
                    borderBottomWidth: 1,
                  }}
                />
                <Image style={{width: 15, height: 15, resizeMode:'contain', marginLeft: 5}} source={require('../../../public/valt_v.png')} />
                <View
                  style={{
                    flex: 1,
                    borderBottomColor: '#F8E71C',
                    borderBottomWidth: 1,
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text style={styles.bottomNavTextLarge}>{txCount}</Text>
                  <Text style={styles.bottomNavTextSmall}>TX COUNT</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.bottomNavTextLarge}>${Math.round(parseInt(balance)/10e17 * parseInt(exchangeRate))}</Text>
                  <Text style={styles.bottomNavTextSmall}>USD VALUE</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={() => this.setState({ visibleModal: 1 })}><Image style={{width: 35, height: 35, marginBottom: 4, resizeMode:'contain'}} source={require('../../../public/send_icon.png')} /></TouchableOpacity>
                  <Text style={styles.bottomNavTextSmall}>TRANSFER ETH</Text>
                </View>
              </View>
            </View>
          </View>
        </Drawer>
        <Toast
          ref='toast'
          style={{backgroundColor:'black', borderRadius: 4, borderColor: 'yellow', borderWidth: 2 }}
          position='top'
          positionValue={150}
          fadeInDuration={50}
          fadeOutDuration={500}
          opacity={0.8}
          textStyle={{color:'white'}}
        />
      </View>
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
