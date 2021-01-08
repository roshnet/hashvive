import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { populateDatabase } from '../utils'

const WIDTH = Dimensions.get('window').width

export default function SetPasswordScreen() {
  const navigation = useNavigation()
  const [password, setPassword] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)

  // Set/update master password in AsyncStorage
  async function onPasswordSet() {
    if (password === '') return
    try {
      const _password = password
      await AsyncStorage.setItem('master', password)
      setPassword('')
      setShowSnackbar(true)

      AsyncStorage.getItem('@first_boot').then((value) => {
        if (!value) {
          populateDatabase(_password)
          AsyncStorage.setItem('@first_boot', 'done')
        }
      })

      setTimeout(() => {
        navigation.goBack()
      }, 500)
    } catch (e) {
      Alert.alert(
        'Error!',
        'An error occurred while setting the master password.',
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set a new password</Text>
      <TextInput
        mode="outlined"
        secureTextEntry={true}
        label="Type a password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={{ alignItems: 'center' }}>
        <Button
          icon="check"
          color="black"
          mode="contained"
          onPress={onPasswordSet}
          style={styles.button}
        >
          Set
        </Button>
      </View>
      <Snackbar
        visible={showSnackbar}
        duration={3000}
        onDismiss={() => setShowSnackbar(false)}
        style={{ width: WIDTH * 0.95 }}
      >
        Master password changed.
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#efefef',
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 20,
  },
  button: {
    width: '25%',
    marginTop: 20,
  },
})
