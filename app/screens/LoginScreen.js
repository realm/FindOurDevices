import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

function LoginScreen(props) {
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
          autoCapitalize='none'
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputText}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}  
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
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
    paddingVertical: 50
  },
  inputContainer: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    borderColor: colors.grayMedium,
    borderWidth: 1
  },
  inputText: {
    fontSize: fonts.sizeM
  },
  button: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.primary,
    borderRadius: 40
  },
  buttonText: {
    fontSize: fonts.sizeM,
    color: colors.white,
    fontWeight: 'bold'
  }
});

export default LoginScreen;
