import React, { useState } from 'react';
import { Alert, Image, View, Text, TextInput, Platform, StyleSheet } from 'react-native';
import routes from '../navigation/routes';

import { useAuth } from '../providers/AuthProvider';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const { signUp, logIn } = useAuth();

  const handleSubmit = async () => {
    const { success, error } = validateInput();
    if (!success)
      return Alert.alert(error);

    try {
      await signUp(email, password);
      logIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  const validateInput = () => {
    if (!email)
      return { error: 'Please enter an email.' };
      
    if (!password)
      return { error: 'Please enter a password.' };
      
    if (password !== confirmationPassword)
      return { error: "Passwords don't match." };

    return { success: true };
  };

  return (
    <View style={styles.screen}>
      <View>
        <Image
          source={require('../assets/map_pin_purple.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Sign Up</Text>
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
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Confirm Password'
          value={confirmationPassword}
          onChangeText={setConfirmationPassword}
          secureTextEntry
          textContentType='password'  // iOS only
          style={styles.inputText}
        />
      </View>
      <Button
        text='Sign Up'
        onPress={handleSubmit}
      />
      <Button
        text='Log In'
        isPrimary={false}
        useShadow={false}
        onPress={() => navigation.navigate(routes.LOGIN)}
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

export default SignupScreen;
