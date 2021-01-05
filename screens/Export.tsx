import { useNavigation } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'
import * as SQLite from 'expo-sqlite'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

interface Credential {
  site: string
  password: string
}

const db = SQLite.openDatabase('app.db')
const exportDir = FileSystem.documentDirectory + 'credentials.json/'

export default function Export() {
  const [credentials, setCredentials] = useState<Array<Credential>>([])
  const navigator = useNavigation()

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT site, password FROM credentials',
      [],
      (_t, { rows }) => {
        const content: any = rows
        setCredentials(content._array)
      },
    )
  })

  async function exportPasswords() {
    FileSystem.writeAsStringAsync(exportDir, JSON.stringify(credentials), {
      encoding: 'utf8',
    })
      .then(() => {
        Alert.alert(
          'Done!',
          `Your passwords were saved on device.`,
          [{ text: 'OK', onPress: () => navigator.navigate('Home') }],
          { cancelable: false },
        )
      })
      .catch(() => {
        Alert.alert('Error!', 'There was an error creating an entry.')
      })
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={exportPasswords}
        icon="download"
        color="black"
        mode="contained"
        style={styles.button}
      >
        Export
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 0,
  },
})
