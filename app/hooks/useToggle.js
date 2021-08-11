import React, { useState, useLayoutEffect } from 'react';

import { HeaderButton } from '../components/HeaderButton';

export function useToggle(navigation, headerIconName, initialState = false) {
  const [isOn, setIsOn] = useState(initialState);

  useLayoutEffect(() => {
    if (!navigation)
      return;

    // In order for the header to be able to interact with the screen component
    // we need to define the header options using 'navigation.setOptions' inside the
    // screen component. Thus, users of this hook can pass the 'navigation' if
    // wanting to turn something on via the header button.
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          iconName={headerIconName}
          onPress={turnOn}
        />
      )
    })
  }, [navigation]);

  const turnOn = () => setIsOn(true);
  const turnOff = () => setIsOn(false);

  return [isOn, turnOff, turnOn];
}
