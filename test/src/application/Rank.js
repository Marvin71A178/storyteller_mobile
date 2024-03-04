import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Layout from './../components/Layout.js';

export default function Rank({ navigation }) {
  return (
    <Layout navigation={navigation}  showBackButton={false} >
      {/* 这里是 Rank 页面特有的内容 */}
      <Text>Rank page</Text>
    </Layout>
  );
}