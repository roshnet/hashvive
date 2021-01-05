import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as SQLite from 'expo-sqlite'
import React, { useState } from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import AboutScreen from './screens/About'
import ExportScreen from './screens/Export'
import HomeScreen from './screens/Home'
import IntroScreen from './screens/Intro'
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
  const [showIntro, setShowIntro] = useState(true)
  const [isReady, setIsReady] = useState(false)

  // Invert to show intro screens
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            options={{ title: 'Generate Password', drawerLabel: 'Home' }}
            component={HomeScreen}
          />
          <Drawer.Screen name="Settings" component={SettingsStack} />
          <Drawer.Screen name="About" component={AboutScreen} />
          <Drawer.Screen name="Export" component={ExportScreen} />
          <Drawer.Screen
            name="Intro"
            component={IntroScreen}
            options={{
              drawerLabel: 'See Tutorial',
              headerStyle: {
                display: 'none',
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
