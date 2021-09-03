import React, { useState } from 'react';
import { Alert, Image, View, Text, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { Button } from '../components/Button';
import { FormTextInput } from '../components/FormTextInput';
import { routes } from '../navigation/routes';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  const handleSubmit = async () => {
    const { error: validationError } = validateInput();
    if (validationError)
      return Alert.alert(validationError.message);

    const { error: authError } =  await logIn(email, password);
    if (authError)
      return Alert.alert(authError.message);
  };

  const validateInput = () => {
    if (!email)
      return { error: { message: 'Please enter an email.' } };

    if (!password)
      return { error: { message: 'Please enter a password.' } };

    return { success: true };
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <View>
        <Image
          source={require('../assets/map_pin_purple.png')}
          style={styles.logo}
        />
      </View>
      <View>
        <Text style={styles.title}>Log In</Text>
      </View>
      <FormTextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'  // iOS only
      />
      <FormTextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType='password'  // iOS only
      />
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.white
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  title: {
    fontSize: fonts.sizeXL,
    fontWeight: 'bold',
    paddingVertical: 50,
    fontFamily: Platform.OS === 'ios' ? fonts.titleFamilyIos : fonts.titleFamilyAndroid
  }
});
