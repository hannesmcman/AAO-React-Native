// flow-typed signature: d916d5f731b562dc8f43492510e541f5
// flow-typed version: <<STUB>>/react-native-tableview-simple_v0.13.0/flow_v0.35.0

import {Image} from 'react-native'

type Style = Object | number | Array<Style>;

type TableviewProps = {||};

type SectionProps = {|
  allowFontScaling?: boolean,
  footerComponent?: React$Element<*>,
  headerComponent?: React$Element<*>,
  footer?: string,
  footerTextColor?: string,
  header?: string,
  headerTextColor?: string,
  hideSeparator?: boolean,
  sectionTintColor?: string,
  separatorInsetLeft?: number,
  separatorInsetRight?: number,
  separatorTintColor?: string,
|};

type CellProps = {|
  accessory?: 'DisclosureIndicator' | 'Detail' | 'DetailDisclosure' | 'Checkmark',
  accessoryColor?: string,
  allowFontScaling?: boolean,
  backgroundColor?: string,
  cellStyle?: 'Basic' | 'RightDetail' | 'LeftDetail' | 'Subtitle',
  cellAccessoryView?: React$Element<*>,
  cellContentView?: React$Element<*>,
  cellImageView?: React$Element<*>,
  contentContainerStyle?: Style,
  detail?: string | number | React$Element<*>,
  detailTextStyle?: Style,
  disableImageResize?: boolean,
  highlightActiveOpacity?: number,
  highlightUnderlayColor?: string,
  isDisabled?: boolean,
  image?: Image,
  leftDetailColor?: string,
  rightDetailColor?: string,
  title?: string | number | React$Element<*>,
  titleTextColor?: string,
  titleTextStyle?: Style,
  titleTextStyleDisabled?: Style,
  onPress?: (e: any) => any,
|};

/**
 * This is an autogenerated libdef stub for:
 *
 *   'react-native-tableview-simple'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'react-native-tableview-simple' {
  declare export var TableView: Class<React$Component<void, TableviewProps, any>>;
  declare export var Section: Class<React$Component<void, SectionProps, any>>;
  declare export var Cell: Class<React$Component<void, CellProps, any>>;
}