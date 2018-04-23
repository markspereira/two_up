import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import NavigatorService from './utils/navigationWrapper';
import WalletMain from './src/App/2UP/WalletMain'
import ScanPublicKey from './src/App/2UP/ScanPublicKey'
import QRCode from './src/App/2UP/QRCode'
import WebView from './src/App/2UP/WebView'
import Landing from './src/App/2UP/Landing'
import Kip from './src/App/2UP/Kip'
import JoinGame from './src/App/2UP/JoinGame'
import GameList from './src/App/2UP/GameList'
import WinnerScreen from './src/App/2UP/WinnerScreen'


export const Tabs = TabNavigator({
  Home: {screen: Landing },
  Weigh: { screen: ScanPublicKey },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    backgroundColor: 'white',
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    style: {
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    },
    labelStyle: {},
    allowFontScaling: true,
    activeTintColor: 'yellow',
    inactiveTintColor: 'white'
  }});

export const Main = StackNavigator({
  Home: { screen: Tabs },
  WalletMain: { screen: WalletMain },
  ScanPublicKey: { screen: ScanPublicKey },
  WebView: { screen: WebView },
  Kip: { screen: Kip },
  JoinGame: { screen: JoinGame },
  GameList: { screen: GameList },
  QRCode: { screen: QRCode },
  WinnerScreen: { screen: WinnerScreen },
});

export default class App extends Component {
  render() {
    return (
      <Main
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
      />
    );
  }
}
