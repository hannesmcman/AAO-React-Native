/**
 * @flow
 * All About Olaf
 * Index view
 */

import './globalize-fetch'
import './setup-moment'
import OneSignal from 'react-native-onesignal'

import React from 'react'
import {Provider} from 'react-redux'
import {store} from './flux'
import {tracker} from './analytics'
import {AppNavigator} from './navigation'
import type {NavigationState} from 'react-navigation'

// gets the current screen from navigation state
function getCurrentRouteName(navigationState: NavigationState): ?string {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

export default class App extends React.Component {
  componentDidMount() {
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('registered', this.onRegistered)
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('registered', this.onRegistered)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived(notification: any) {
    console.log('Notification received:', notification)
  }

  onOpened(openResult: any) {
    console.log('Message:', openResult.notification.payload.body)
    console.log('Data:', openResult.notification.payload.additionalData)
    console.log('isActive:', openResult.notification.isAppInFocus)
    console.log('openResult:', openResult)
  }

  onRegistered(notifData: any) {
    console.log('Device is now registered for push notifications!', notifData)
  }

  onIds(device: any) {
    console.log('Device info:', device)
  }

  trackScreenChanges(
    prevState: NavigationState,
    currentState: NavigationState,
  ) {
    const currentScreen = getCurrentRouteName(currentState)
    const prevScreen = getCurrentRouteName(prevState)

    if (currentScreen !== prevScreen) {
      tracker.trackScreenView(currentScreen)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator onNavigationStateChange={this.trackScreenChanges} />
      </Provider>
    )
  }
}
