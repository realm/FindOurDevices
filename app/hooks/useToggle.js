import React, { useState, useLayoutEffect } from 'react';

import { HeaderButton } from '../components/HeaderButton';

/**
 * A hook that allows toggling of a piece of state either controlled by a header component or a component inside the screen.
 * @param {boolean} initialState - The initial state.
 * @param {Object} [navigation] - The react navigation object if controlling the toggling from the header.
 * @param {string} [headerIconName] - The name of the icon to use for the header button if toggling from the header.
 * @return {Object} An object with the current state and functions to toggle, turn on, or turn off the state.
 */
export function useToggle(initialState, navigation, headerIconName) {
  const [isOn, setIsOn] = useState(initialState);

  useLayoutEffect(() => {
    if (!navigation)
      return;

    // In order for the header to be able to interact with the screen component
    // we need to define the header options using 'navigation.setOptions' inside the
    // screen component. Thus, users of this hook can pass the 'navigation' if
    // wanting to turn something on/off via the header button.
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          iconName={headerIconName}
          onPress={turnOn}
        />
      )
    })
  }, [navigation]);

  const toggle = () => setIsOn(!isOn);
  const turnOn = () => setIsOn(true);
  const turnOff = () => setIsOn(false);

  return {
    isOn, 
    toggle,
    turnOn,
    turnOff
  };
}
