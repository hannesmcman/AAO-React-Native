/**
 * @flow
 * All About Olaf
 * iOS Home page
 */

import React from 'react'
import {ScrollView, StyleSheet, StatusBar} from 'react-native'

import {connect} from 'react-redux'
import * as c from '../components/colors'
import sortBy from 'lodash/sortBy'
import type {TopLevelViewPropsType} from '../types'
import type {ViewType} from '../views'
import {allViews} from '../views'
import {Column} from '../components/layout'
import {partitionByIndex} from '../../lib/partition-by-index'
import {HomeScreenButton, CELL_MARGIN} from './button'
import {trackedOpenUrl} from '../components/open-url'
import {EditHomeButton, OpenSettingsButton} from '../components/nav-buttons'

type Props = TopLevelViewPropsType & {
  order: string[],
  views: ViewType[],
}

function HomePage({navigation, order, views = allViews}: Props) {
  const sortedViews = sortBy(views, view => order.indexOf(view.view))

  const columns = partitionByIndex(sortedViews)

  return (
    <ScrollView
      overflow="hidden"
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.cells}
    >
      <StatusBar barStyle="light-content" backgroundColor={c.gold} />

      {columns.map((contents, i) => (
        <Column key={i} style={styles.column}>
          {contents.map(view => (
            <HomeScreenButton
              key={view.view}
              view={view}
              onPress={() => {
                if (view.type === 'url') {
                  return trackedOpenUrl({url: view.url, id: view.view})
                } else {
                  return navigation.navigate(view.view)
                }
              }}
            />
          ))}
        </Column>
      ))}
    </ScrollView>
  )
}
HomePage.navigationOptions = ({navigation}) => {
  return {
    title: 'All About Olaf',
    headerBackTitle: 'Home',
    headerLeft: <OpenSettingsButton navigation={navigation} />,
    headerRight: <EditHomeButton navigation={navigation} />,
  }
}

function mapStateToProps(state) {
  return {
    order: state.homescreen.order,
  }
}
export default connect(mapStateToProps)(HomePage)

const styles = StyleSheet.create({
  cells: {
    marginHorizontal: CELL_MARGIN / 2,
    marginTop: CELL_MARGIN / 2,
    paddingBottom: CELL_MARGIN / 2,

    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
})
