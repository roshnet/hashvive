import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import SplashScreen from 'react-native-splash-screen'
import { openDatabase } from 'react-native-sqlite-storage'
import AboutScreen from './screens/About'
import ExportScreen from './screens/Export'
import HomeScreen from './screens/Home'
import IntroScreen from './screens/Intro'
import SetPasswordScreen from './screens/SetPassword'
import SettingsScreen from './screens/Settings'

const db = openDatabase({
  name: 'app.db',
  location: 'default',
})

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
const RootStack = createStackNavigator()

function drawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="slide"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#222',
        },
        headerTintColor: 'white',
        headerShown: true,
      }}
      drawerStyle={{
        backgroundColor: '#111',
        width: 220,
      }}
      drawerContentOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#68f',
        inactiveTintColor: 'grey',
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Generate Password',
          drawerLabel: 'Home',
        }}
        component={HomeScreen}
      />
      <Drawer.Screen name="Settings" component={settingsStack} />
      <Drawer.Screen
        name="Export"
        component={ExportScreen}
        options={{
          title: 'Backup & Delete',
        }}
      />
    </Drawer.Navigator>
  )
}

function settingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerStyle: {
          height: 40,
          backgroundColor: '#efefef',
          elevation: 0,
        },
        headerTitleStyle: { display: 'none' },
        headerLeftContainerStyle: {
          marginBottom: -20,
          marginRight: 30,
        },
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          headerLeftContainerStyle: { marginLeft: 50 },
        }}
      />
      <Stack.Screen name="SetMasterPassword" component={SetPasswordScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  const [defaultScreen, setDefaultScreen] = useState('Drawer')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('@first_boot')
      .then((value) => {
        if (!value) setDefaultScreen('Intro')
        setIsReady(true)
        SplashScreen.hide()
      })
      .catch(() => {
        Alert.alert('Error', 'Error launching the app.')
      })
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={defaultScreen}
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="Drawer" component={drawerNavigator} />
          <RootStack.Screen name="Intro" component={IntroScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
