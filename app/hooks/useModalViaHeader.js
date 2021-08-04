import React, { useState, useLayoutEffect } from 'react';

import HeaderButton from '../components/HeaderButton';

function useModalViaHeader(navigation, iconName, initialVisibility) {
  const [modalVisible, setModalVisible] = useState(initialVisibility);

  useLayoutEffect(() => {
    // In order for the header to be able to interact with the screen component
    // we need to define the header options using 'navigation.setOptions' inside the
    // screen component. This way, we're able to control the modal from the header.
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          iconName={iconName}
          onPress={openModal}
        />
      )
    })
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return { modalVisible, openModal, closeModal };
}

export default useModalViaHeader;
