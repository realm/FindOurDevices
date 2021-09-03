import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Icon } from './Icon';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

/**
 * Create a list item component.
 * @param {Object} props
 * @param {string} props.text - The list item text.
 * @param {string} [props.subText] - A secondary text to appear below the main text prop.
 * @param {boolean} [props.fadeOnPress=true] - A boolean which tells if the item should fade when being pressed if true.
 * @param {function} [props.onPress=() => {}] - Callback function to be called when the list item is pressed.
 * @param {function} props.renderRightActions - Callback function that is expected to return an action panel that is going to be revealed from the right side when user swipes left.
 * @return {React.Component} A list item component.
 */
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
        style={({ pressed }) => ({ opacity: pressed && fadeOnPress ? 0.2 : 1 })}
      >
        <View style={styles.container}>
          <View style={styles.textContainer}>
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
          <Icon
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
  },
  textContainer: {
    maxWidth: '90%'
  }
});
