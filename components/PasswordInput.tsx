import AsyncStorage from '@react-native-community/async-storage'
import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { openDatabase } from 'react-native-sqlite-storage'
import { createHash } from '../utils'

const db = openDatabase({
  name: 'app.db',
  location: 'default',
})

export default function PasswordInput(props: { parentCallback: () => void }) {
  const [site, setSite] = useState('')
  const [master, setMaster] = useState('')

  function insertPasswordRecord() {
    if (site === '') return

    AsyncStorage.getItem('master').then((value) => {
      setMaster(String(value))
    })

    // Generate password hash, then insert an entry in database
    const hash = createHash(site, master, 'md5').slice(0, 12)

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
          label="Add a site"
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
