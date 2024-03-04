import React from 'react';
import { ScrollView , StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native';
import Layout from './../components/Layout.js';
import storiesData from './../data/stories.js';

const Story = ({ imageUri, username }) => (
  <TouchableOpacity style={styles.story}>
    <Image source={{ uri: imageUri }} style={styles.storyImage} />
    <Text style={styles.storyText}>{username}</Text>
  </TouchableOpacity>
);

export default function Home({ navigation }) {
  return (
    <Layout navigation={navigation}  showBackButton={false} >
      <View style={styles.container}>
        <Text style={styles.updateText}>最近更新</Text>
        {/* <Image style={style.enterIcon} source={require('../../assets/icon.png')} /> */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.stories}>
          {storiesData.map(story => (
            <Story key={story.id} imageUri={story.imageUri} username={story.username} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.mainText}>POST</Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
  },
  updateText: {
    fontSize: 20,
    marginLeft: 20,
  },
  enterIcon: {
    width: 10,
    height: 10,
  },
  stories: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  story: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyImage: {
    width: 80, // Increased from 64 to 80
    height: 80, // Increased from 64 to 80
    borderRadius: 40, // Ensure this is always half of width/height to keep it circular
    borderWidth: 3, // Making the border thicker
    borderColor: '#ff8501',
    marginBottom: 5, // Space between the image and text
  },
  storyText: {
    color: '#000',
    fontSize: 12,
    marginTop: 4,
  },
  mainContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    width: '100%',
    backgroundColor: 'white'
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: '80%',
    height: 300,
  },
  mainText: {
    fontSize: 48
  }
  // ... rest of the styles
});