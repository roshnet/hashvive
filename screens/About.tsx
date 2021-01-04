import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About the app</Text>
      <Text style={styles.paragraph}>
        It helps you generate and store strong passwords for your account on
        different websites.
        {'\n'}
        {'\n'}
        To get started, just add the name of the website to create a password
        for it. Pressing "ADD" generates the credentials for the website.
        {'\n'}
        {'\n'}
        You can access the generated password by copying from the list
        underneath.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '3%',
  },
  heading: {
    fontSize: 30,
    marginVertical: 20,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 35,
    // backgroundColor: '#228',
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
  },
})
