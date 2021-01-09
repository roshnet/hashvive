import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Link from '../components/Link'

const GH_REPO = 'https://github.com/roshnet/hashvive'

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About</Text>
      <Text>Hashvive 1.0.0 {'\n'}</Text>
      <Text style={styles.paragraph}>
        Hashvive is a password generator you can use to avoid using a single
        password for all platforms. It's inspired by the password section on the{' '}
        <Link url="https://ss64.com/pass" text="ss64" /> website.The app uses
        the master password you set, along with the name of the site you add, to
        create a random hash, that you can use as a password for the site.
      </Text>
      <Text style={styles.heading}>Upcoming Features</Text>
      <Text style={styles.paragraph}>
        1. Specify hashing algorithm when generating password. {'\n'}
        2. Export passwords as CSV/JSON to internal storage. {'\n'}
        3. Choose color theme. {'\n'}
        4. And a couple more.
      </Text>
      <Text style={styles.heading}></Text>
      <Text style={styles.paragraph}>
        To contribute or open a ticket, use GitHub and open an issue at - {'\n'}
        <Link url={GH_REPO} text={GH_REPO} />
      </Text>
      <Text style={{ borderBottomWidth: 1 }}></Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%',
  },
  heading: {
    fontSize: 30,
    marginVertical: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 30,
    paddingVertical: 5,
  },
})
