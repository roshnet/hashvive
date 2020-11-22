import React from 'react'
import { Clipboard, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Button } from 'react-native-paper'

interface Props {
  site: string
  password: string
}

export default function Entry({ site, password }: Props) {
  function writeToClipboard() {
    try {
      console.log('Setting password on clipboard...')
      Clipboard.setString(password)
      ToastAndroid.show('Password copied to clipboard!', ToastAndroid.LONG)
    } catch (err) {
      ToastAndroid.show(`Error: ${String(err)}`, ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{site}</Text>
      <Text style={styles.text}>{password.substr(0, 10)}</Text>
      <Button
        onPress={writeToClipboard}
        mode="contained"
        color="white"
        style={styles.button}
      >
        Copy
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
    borderBottomColor: 'yellow',
    borderWidth: 0.5,
    padding: 15,
  },
  text: {
    marginHorizontal: 3,
    color: '#eee',
  },
  button: {
    color: '#eee',
    borderRadius: 20,
  },
})
