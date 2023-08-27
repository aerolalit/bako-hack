import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';



const ChatView = ({messages}) => {



  const renderMessage = ({ item }) => {
    const messageStyle =
      item.role === 'user' ? styles.myMessage : styles.otherMessage;

    return (
      <View style={messageStyle}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: 'transparent',
  },
  myMessage: {
    backgroundColor: 'lightblue',
    alignSelf: 'flex-end',
    padding: 8,
    margin: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  otherMessage: {
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
    padding: 8,
    margin: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    padding: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 8,
  },
});

export default ChatView;
