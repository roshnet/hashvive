import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'
import Entry from '../components/Entry'
import PasswordInput from '../components/PasswordInput'

const db = openDatabase({
  name: 'app.db',
  location: 'default',
})

export default function HomeScreen() {
  const navigation = useNavigation()

  const [_update, triggerUpdate] = useState(0)
  const [entries, setEntries] = useState<
    Array<{ site: string; password: string }>
  >([])

  useEffect(() => {
    navigation.addListener('focus', updateList)
    AsyncStorage.getItem('@intro_shown').then((value) => {
      if (!value) navigation.navigate('Intro')
    })
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM credentials`, [], (t, { rows }) => {
          let resultSet: Array<any> = []
          for (let i = 0; i < rows.length; i++) {
            resultSet.push(rows.item(i))
          }
          setEntries(resultSet)
        })
      })
    }, [_update]),
  )

  /*
  Dummy setter function, used to force render this component.
  To be passed as callback to components that change static data.
  Children calling it triggers a re-render, which fetches fresh data.
  */
  function updateList() {
    triggerUpdate(_update + 1)
  }

  return (
    <View style={styles.container}>
      <PasswordInput parentCallback={updateList} />
      <ScrollView style={styles.entries}>
        {entries.map((entry) => {
          return (
            <Entry
              key={Math.random()}
              site={entry.site}
              password={entry.password}
              parentCallback={updateList}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  entries: {
    width: '100%',
  },
})
