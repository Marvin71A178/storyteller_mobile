import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';


const BookList = ({ item , navigation}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Reading', { index: item.id })}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.id}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

export default BookList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    item: {
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      color: 'white',
    },
    subtitle: {
      color: 'grey',
    },
    closeButton: {
      // Style your close button
    },
    closeText: {
      color: 'white',
      // More style for the close button text
    },
    // ... Add more styles if needed
  });

