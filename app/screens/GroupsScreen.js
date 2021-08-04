import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Alert, Platform, StyleSheet, Dimensions } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import HeaderButton from '../components/HeaderButton';
import List from '../components/List';
import routes from '../navigation/routes';

function GroupsScreen({ navigation }) {
  const { userData, createGroup } = useAuth();
  const [newGroupName, setNewGroupName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    // In order for the header to be able to interact with the screen (this) component
    // we need to define the header options using 'navigation.setOptions' inside this
    // screen component. This way, we're able to control the modal from the header.
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          iconName='plus-circle'
          onPress={() => setModalVisible(true)}
        />
      )
    });
  });

  const handleCreateGroup = async () => {
    if (!newGroupName)
      return;

    // When our MongoDB Realm backend function is called, it will return an object
    // containing an error property if any errors occurred.
    const { error } = await createGroup(newGroupName);
    if (error)
      return Alert.alert(error.message);

    setModalVisible(false);
    setNewGroupName('');
  };

  return (
    <>
    <View style={styles.screen}>
      {userData && (
        <List
          items={userData.groups}
          keyExtractor={group => group.groupId.toString()}
          itemTextFieldName='groupName'
          onItemPress={(item) => navigation.navigate(routes.GROUP, {
            // Pass params to a route by putting them in an object as the second argument.
            // The route can access them through route.params.<property>
            // (We pass the id as a string rather than ObjectId because react navigation recommends to
            // not have non-serializable values in the navigation state since it can break usage.)
            groupId: item.groupId.toString()
          })}
          rightActionType='edit'
          rightActionOnPress={(item) => console.log(`Pressed btn to edit group ${item.groupName}.`)}
        />
      )}
    </View>
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create Group</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Name'
              value={newGroupName}
              onChangeText={setNewGroupName}
              style={styles.input}
            />
          </View>
          <TouchableOpacity onPress={handleCreateGroup} style={{ backgroundColor: '#7879f1', justifyContent: 'center', padding: 10, borderRadius: 10, alignItems: 'center', alignSelf: 'stretch', }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonClose2}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle2}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  modalView: {
    flexDirection: 'column',
    width: Dimensions.get('window').width - 60,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  buttonClose2: {
    paddingVertical: 10,
    elevation: 2,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle2: {
    color: '#a8a8a8',
    fontWeight: 'bold',
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: Platform.OS === 'ios' ? 10 : 0,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1
  }
});

export default GroupsScreen;
