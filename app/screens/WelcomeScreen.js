import React from 'react';
import { Image, ImageBackground, View, Text, StyleSheet } from 'react-native';

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import routes from '../navigation/routes';

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/purple_bg.png')}
      style={styles.background}
    >
      <View style={styles.upperView}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/map_pin_purple.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>FindOurDevices</Text>
      </View>
      <Button
        text='Get Started'
        isPrimary={false}
        onPress={() => navigation.navigate(routes.LOGIN)}
        otherStyles={{ marginBottom: 100 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  upperView: {
    alignItems: 'center'
  },
  logoContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 100,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: fonts.sizeXL,
    fontWeight: 'bold',
    color: colors.primary
  }
});

export default WelcomeScreen;