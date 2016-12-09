// @flow
/**
 * All About Olaf
 * iOS Home page
 */

import React from 'react'
import type {Element} from 'react'
import {
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Platform,
  TouchableNativeFeedback,
} from 'react-native'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'
import * as c from './components/colors'
import sortBy from 'lodash/sortBy'
import LinearGradient from 'react-native-linear-gradient'
import type {TopLevelViewPropsType} from './types'

const Dimensions = require('Dimensions')
let Viewport = Dimensions.get('window')

import type {ViewType} from './views'
import {allViews} from './views'

const Touchable = ({children, onPress}: {onPress: () => any, children?: Element<any>}) => {
  return Platform.OS === 'ios'
    ? <TouchableOpacity onPress={onPress} activeOpacity={0.65}>{children}</TouchableOpacity>
    : <TouchableNativeFeedback onPress={onPress}>{children}</TouchableNativeFeedback>
}

function HomeScreenButton({view, onPress}: {view: ViewType, onPress: () => any}) {
  if (view.gradient) {
    return <Touchable onPress={onPress}>
      <LinearGradient start={[0, 0.35]} end={[1, .75]} colors={view.gradient} style={[styles.rectangle]}>
        <Icon name={view.icon} size={32} style={styles.rectangleButtonIcon} />
        <Text style={styles.rectangleButtonText}>
          {view.title}
        </Text>
      </LinearGradient>
    </Touchable>
  }

  return (
    <Touchable onPress={onPress}>
      <View style={[styles.rectangle, {backgroundColor: view.tint}]}>
        <Icon name={view.icon} size={32} style={styles.rectangleButtonIcon} />
        <Text style={styles.rectangleButtonText}>
          {view.title}
        </Text>
      </View>
    </Touchable>
  )
}

function HomePage({navigator, route, order, views=allViews}: {order: string[], views: ViewType[]} & TopLevelViewPropsType) {
  const sortedViews = sortBy(views, view => order.indexOf(view.view))

  return (
    <ScrollView
      overflow='hidden'
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.cells}
    >
      <StatusBar barStyle='light-content' backgroundColor={c.gold} />

      {sortedViews.map(view =>
        <HomeScreenButton
          view={view}
          key={view.view}
          onPress={() => navigator.push({
            id: view.view,
            index: route.index + 1,
            title: view.title,
            sceneConfig: Navigator.SceneConfigs.PushFromRight,
          })}
        />)
      }
    </ScrollView>
  )
}

function mapStateToProps(state) {
  return {
    order: state.homescreen.order,
  }
}
export default connect(mapStateToProps)(HomePage)


let cellMargin = 10
let cellSidePadding = 10
let cellEdgePadding = 4
let cellWidth = (Viewport.width / 2) - (cellMargin * 1.5)

let styles = StyleSheet.create({
  // Body container
  cells: {
    marginHorizontal: cellMargin / 2,
    marginTop: cellMargin / 2,
    paddingBottom: cellMargin / 2,

    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  rows: {},

  scrollView: {
    // elevation: 2,
  },

  // Main buttons for actions on home screen
  rectangle: {
    width: cellWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: cellSidePadding,
    paddingBottom: cellSidePadding / 2,
    paddingHorizontal: cellEdgePadding,
    borderRadius: Platform.OS === 'ios' ? 6 : 3,
    elevation: 2,

    marginTop: cellMargin / 2,
    marginBottom: cellMargin / 2,
    marginLeft: cellMargin / 2,
    marginRight: cellMargin / 2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(224, 224, 224)',
  },

  listIcon: {
    paddingLeft: 15,
    paddingRight: 30,
  },
  listText: {
    fontSize: 16,
  },

  // Text styling in buttons
  rectangleButtonIcon: {
    color: c.white,
    backgroundColor: 'transparent',
  },
  rectangleButtonText: {
    color: c.white,
    backgroundColor: 'transparent',
    marginTop: cellSidePadding / 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
    textAlign: 'center',
    fontSize: 14,
  },
})
