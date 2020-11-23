import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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
const Stack = createStackNavigator()

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          height: 40,
          backgroundColor: '#efefef',
          elevation: 0,
        },
        headerTitleStyle: { display: 'none' },
        headerLeftContainerStyle: {
          marginBottom: 40,
          marginRight: 30,
        },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          headerLeftContainerStyle: { marginLeft: 50 },
        }}
      />
      <Stack.Screen name="SetMasterPassword" component={SetPasswordScreen} />
    </Stack.Navigator>
  )
}

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
          <Drawer.Screen name="Settings" component={SettingsStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
