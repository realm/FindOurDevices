import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function ListItem({ 
  text,
  subText,
  fadeOnPress = true,
  onPress = () => {},
  renderRightActions
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed
          ? { opacity: fadeOnPress ? 0.2 : 1 }
          : {}
        }
      >
        <View style={styles.container}>
          <View>
            <Text
              numberOfLines={1}
              style={styles.text}
            >
              {text}
            </Text>
            {subText ? (
              <Text
                numberOfLines={1}
                style={styles.subText}
              >
                {subText}
              </Text>
            ) : <></>}
          </View>
          <MaterialCommunityIcons
            name='chevron-left'
            color={colors.grayMedium}
            size={30}
          />
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 80,
    paddingLeft: 40,
    paddingRight: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: fonts.sizeM
  },
  subText: {
    marginTop: 5,
    fontSize: fonts.sizeS,
    color: colors.grayDark,
    textTransform: 'lowercase'
  }
});
