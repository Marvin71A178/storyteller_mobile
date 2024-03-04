import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Layout = ({ children, navigation ,showBackButton}) => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {children}
        </View>
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Library')}>
                <Text>書庫</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Search')}>
                <Text>搜尋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Rank')}>
                <Text>排行榜</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                <Text>設置</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
};
  
export default Layout;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between', // 调整为 space-between
    },
    // ...其他样式
    header: {
      height: 50,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      backgroundColor: '#ddd', // 自定义颜色
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    backText: {
      fontSize: 16,
      color: '#0000ff',
    },
    menu: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      backgroundColor: '#f8f8f8', // 自定义颜色
    },
    menuItem: {
      padding: 10,
    },
  });