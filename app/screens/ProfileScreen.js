import React from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../providers/AuthProvider';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function ProfileScreen() {
  const { userData, logOut } = useAuth();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name='account-circle'
          color={colors.white}
          size={80}
        />
        <Text style={styles.displayName}>
          {userData?.displayName}
        </Text>
      </View>
      <View style={styles.lowerView}>
        <View>
          <View style={styles.userInfoItem}>
            <MaterialCommunityIcons
              name='email-outline'
              color={colors.grayDark}
              size={25}
            />
            <Text style={styles.userInfoItemText}>
              {userData?.email}
            </Text>
          </View>
        </View>
        <Button
          text='Log Out'
          onPress={logOut}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      },
    })
  },
  lowerView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 30,
    justifyContent: 'space-between'
  },
  displayName: {
    marginTop: 20,
    color: colors.white,
    fontSize: fonts.sizeM,
    fontWeight: 'bold'
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  userInfoItemText: {
    marginLeft: 15,
    color: colors.grayDark,
    fontSize: fonts.sizeM
  }
});
