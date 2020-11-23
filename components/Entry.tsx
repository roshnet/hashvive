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
      Clipboard.setString(password)
      ToastAndroid.show('Password copied to clipboard!', ToastAndroid.LONG)
    } catch (err) {
      ToastAndroid.show(`Error: ${String(err)}`, ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{site}</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 0.4,
  },
  text: {
    marginHorizontal: 3,
    fontSize: 17,
  },
  button: {
    width: '40%',
  },
})
