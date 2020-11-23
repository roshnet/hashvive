import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import HomeScreen from './screens/Home'
import SetPasswordScreen from './screens/SetPassword'
import SettingsScreen from './screens/Settings'

const db = SQLite.openDatabase('app.db')

db.transaction((tx) => {
  tx.executeSql(
    `
    CREATE TABLE IF NOT EXISTS credentials (
      site TEXT,
      password TEXT
    )`,
    [],
  )
})

const theme = {
  ...DefaultTheme,
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: '#444',
    accent: '#f1c40f',
  },
}

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            options={{ title: 'Password Generator', drawerLabel: 'Home' }}
            component={HomeScreen}
          />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen
            options={{ drawerLabel: () => null }}
            name="Set Password"
            component={SetPasswordScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
