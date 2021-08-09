import React, { useState } from 'react';
import { Image, View, Text, TextInput, Platform, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { Button } from '../components/Button';
import routes from '../navigation/routes';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  const handleSubmit = () => logIn(email, password);

  return (
    <View style={styles.screen}>
      <View>
        <Image
          source={require('../assets/map_pin_purple.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'  // iOS only
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType='password'  // iOS only
          style={styles.inputText}
        />
      </View>
      <Button
        text='Log In'
        onPress={handleSubmit}
      />
      <Button
        text='Sign Up'
        isPrimary={false}
        useShadow={false}
        onPress={() => navigation.navigate(routes.SIGNUP)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.white
  },
  logo: {
    height: 100,
    marginTop: 80,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  title: {
    fontSize: fonts.sizeXL,
    fontWeight: 'bold',
    paddingVertical: 50,
    fontFamily: Platform.OS === 'ios' ? fonts.titleFamilyIos : fonts.titleFamilyAndroid
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: Platform.OS === 'ios' ? 15 : 0,
    marginVertical: 10,
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    borderColor: colors.grayMedium,
    borderWidth: 1
  },
  inputText: {
    fontSize: fonts.sizeM
  }
});
