import React, { memo } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../styles/colors';

/**
 * Create an icon component.
 * @param {string} name - The icon name.
 * @param {number} [size=30] - The icon size.
 * @param {string} [color=colors.primary] - The color to use for the icon.
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
