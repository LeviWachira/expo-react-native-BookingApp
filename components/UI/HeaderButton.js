import React from 'react';
import { Platform } from 'react-native';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialCommunityIcons}
      iconSize={28}
      color={Platform.OS === 'android' ? 'white' : 'black'}
      buttonStyle
    />
  );
};

export default CustomHeaderButton;
