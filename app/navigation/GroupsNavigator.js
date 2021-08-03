import React, { useState } from 'react';
import { StyleSheet, Dimensions, Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../providers/AuthProvider';
import GroupsScreen from '../screens/GroupsScreen';
import GroupScreen from '../screens/GroupScreen';
import HeaderButton from '../components/HeaderButton';
import routes from './routes';
import colors from '../styles/colors';

// TEMPORARY
import TemporaryLogoutButton from '../components/TemporaryLogoutButton';

const Stack = createStackNavigator();

function GroupsNavigator() {

  const { createGroup } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('');

  const create = () => {
    if (text === '')
      return;

    createGroup(text);
    onChangeText('');
    setModalVisible(false);
  }

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Group</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Name"
              />
            </View>
            <TouchableOpacity onPress={() => create()} style={{ backgroundColor: '#7879f1', justifyContent: 'center', padding: 10, borderRadius: 10, alignItems: 'center', alignSelf: 'stretch', }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonClose2]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Stack.Navigator screenOptions={{ headerStyle: styles.shadow }}>
        <Stack.Screen
          name={routes.GROUPS}
          component={GroupsScreen}
          options={{
            // change later to add onPress to create a group
            headerRight: () => (
              <HeaderButton
                iconName='plus-circle'
                onPress={() => setModalVisible(true)}
              />
            )
          }}
        />
        <Stack.Screen
          name={routes.GROUP}
          component={GroupScreen}
          options={{
            // change later to add onPress to create a group
            headerRight: () => (null)
          }}
        />
        <Stack.Screen
          name={routes.GROUPS_MAP}
          component={TemporaryLogoutButton}
          //component={/* GroupsMapScreen */}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  modalView: {
    flexDirection: "column",
    width: Dimensions.get('window').width - 60,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle2: {
    color: "#a8a8a8",
    fontWeight: "bold",
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: Platform.OS === 'ios' ? 10 : 0,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1
  },
});

export default GroupsNavigator;
