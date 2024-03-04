import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Layout from './../components/Layout.js';
import axios from 'axios';

export default function Search({ navigation }) {
  const [url, setUrl] = useState('');
  const [story, setStory] = useState(null);
  const dispatch = useDispatch()

  const fetchStory = async () => {
    try {
      const response = await axios.post('http://100.87.143.63:8050/create_catelog', { url });
      setStory(response.data.story); // 假设响应的格式是 { story: ... }
      dispatch(createStory())
    } catch (error) {
      console.error('Error fetching story:', error);
      Alert.alert('Error', 'Unable to fetch story');
    }
  };

  return (
    <Layout navigation={navigation} showBackButton={false}>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
        placeholder="輸入一個網址"
      />
      <TouchableOpacity style={styles.button} onPress={fetchStory}>
        <Text>Fetch Story</Text>
      </TouchableOpacity>
      {story && (
        <View style={styles.storyContainer}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyContent}>{story.content}</Text>
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 12,
  },
  storyContainer: {
    marginTop: 20,
    padding: 10,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storyContent: {
    fontSize: 14,
  },
});
