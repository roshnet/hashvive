import * as SQLite from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { createHash, getFromStorage } from '../utils'

const db = SQLite.openDatabase('app.db')

export default function PasswordInput(props: { parentCallback?: any }) {
  const [site, setSite] = useState('')
  const [master, setMaster] = useState('')

  useEffect(() => {
    getFromStorage('master').then((value) => {
      setMaster(value)
    })
  }, [])

  function insertPasswordRecord() {
    if (site === '') return

    // Generate password hash, then insert an entry in database
    const hash = createHash(site, master, 'md5')

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO credentials VALUES (?, ?)',
        [site, hash],
        (_t, result) => {
          if (result.rowsAffected === 0)
            Alert.alert('Error!', 'There was an error creating an entry.')
          else {
            setSite('')
            props.parentCallback()
          }
        },
      )
    })
  }

  return (
    <View
      style={{
        marginVertical: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          mode="outlined"
          label="Generate a strong password"
          placeholder="Add a site (github.com for example)"
          onChangeText={(text) => setSite(text)}
          style={{
            justifyContent: 'flex-start',
            marginRight: 10,
            height: 40,
          }}
          value={site}
        />
      </View>
      <View>
        <Button
          mode="contained"
          color="black"
          onPress={insertPasswordRecord}
          style={{
            width: 30,
          }}
        >
          ADD
        </Button>
      </View>
    </View>
  )
}
