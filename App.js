import * as React from 'react';
import {  View, StyleSheet,  SafeAreaView } from 'react-native';
import RecordSound from './components/RecordSound';
import { LogBox } from 'react-native';
import ChatView from './components/ChatView';

const msgs = []

export default function App() {
  LogBox.ignoreAllLogs();
  const [messages, setMessages] = React.useState(msgs);




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
    <View style={styles.container}>
      <ChatView setMessages={setMessages} messages={messages}/>
     
      <RecordSound chatList={messages} setChatList={setMessages} />
      
      
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
