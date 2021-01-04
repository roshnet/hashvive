import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const WIDTH = Dimensions.get('window').width

export default function Intro() {
  const navigation = useNavigation()
  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.image}>
      <ViewPager style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <Text style={styles.heading}>Generate unguessable passwords</Text>
          <Text style={styles.paragraph}>
            Use the ADD button to generate new passwords for your accounts. Type
            the name of the website ("Facebook", or "facebook.com" for example)
            to generate a strong password for it.
          </Text>
          <Text style={styles.paragraph}>
            You don't need to remember it - just copy it from the list, and use
            it in the website.
          </Text>
        </View>
        <View style={styles.page} key="2">
          <Image
            source={require('../assets/bg.jpg')}
            style={styles.foreImage}
          />
          <Text style={styles.heading}>
            Instructions
            {'\n'}
          </Text>
        </View>
        <View style={styles.page} key="3">
          <Text style={styles.heading}>Endgame</Text>
          <Button
            onPress={() => navigation.navigate('Home')}
            title="Go to Home"
          />
        </View>
      </ViewPager>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  foreImage: {
    width: WIDTH,
    height: 150,
  },
  heading: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0005',
    padding: 20,
    width: WIDTH,
    textTransform: 'uppercase',
  },
  paragraph: {
    fontSize: 20,
    color: '#fff',
    padding: 20,
  },
})
