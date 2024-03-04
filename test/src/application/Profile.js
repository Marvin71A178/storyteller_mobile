import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Layout from './../components/Layout.js';

export default function Profile({ navigation }) {
  return (
    <Layout navigation={navigation}>
      {/* 这里是 Profile 页面特有的内容 */}
      <View style={styles.profileContain}>

        <View style={styles.profilePhoto}></View>

        <View>
          <Text style={styles.profileName}>名稱</Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
    profileContain: {
      alignItems: 'center',
      padding: 40    
    },
    profilePhoto: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'black',
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 10,
    },
    profileName: {
      fontSize: 28,
      fontWeight: 'bold',
    }
});
