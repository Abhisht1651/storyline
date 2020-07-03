import * as React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import StoryLine from './StoryLineNavigator'
import styles from './Styles/NavigationStyles'

const Stack = createStackNavigator()

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="LaunchScreen"
      headerMode="screen"
      screenOptions={{
        headerStyle: styles.header,
        headerShown: false
      }}>
      <Stack.Screen name="LaunchScreen" component={StoryLine} />
    </Stack.Navigator>
  )
}
export default AppStack
