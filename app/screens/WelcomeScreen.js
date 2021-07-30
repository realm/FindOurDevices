import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import routes from '../navigation/routes';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.primary
  },
  upperView: {
    alignItems: 'center'
  },
  logoContainer: {
    height: 110,
    width: 110,
    marginTop: 80,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    transform: [{ rotate: '45deg' }]
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
    transform: [{ rotate: '-45deg' }]
  },
  title: {
    alignSelf: 'center',
    paddingVertical: 50,
    fontSize: fonts.sizeXL,
    fontWeight: 'bold',
    color: colors.white
  }
});

export default WelcomeScreen;
