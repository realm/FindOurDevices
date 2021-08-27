import React, { memo } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../styles/colors';

/**
 * Create an icon component.
 * @param {Object} props
 * @param {string} props.name - The icon name.
 * @param {number} [props.size=30] - The icon size.
 * @param {string} [props.color=colors.primary] - The color to use for the icon.
 * @return {React.Component} An icon component.
 */
export const Icon = memo(function Icon({ name, size = 30, color = colors.primary, ...otherProps }) {
  return (
    <MaterialCommunityIcons
      name={name}
      color={color}
      size={size}
      {...otherProps}
    />
  );
});
