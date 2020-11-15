import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

interface LocalComponentProps {
  title: string
  goto: string
}

export default function MenuItem(props: LocalComponentProps) {
  const navigation = useNavigation()
  const { goto, title } = props

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(goto)}
    >
      <List.Item title={title} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 0,
  },
})
