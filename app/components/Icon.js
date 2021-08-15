import React, { memo } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

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
