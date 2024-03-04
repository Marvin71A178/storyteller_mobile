import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from './../components/Layout.js';
import BookList from '../components/BookList.js';
// import bookdata from './../data/book.js';
import bookdata from './../data/book.json';

export default function Library({ navigation }) {
  return (
    <Layout navigation={navigation}>
        <View style={styles.container}>
            <FlatList
                data={bookdata}
                renderItem={({ item }) => <BookList item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      // ... Other styles if necessary
    },
  });