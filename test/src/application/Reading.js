import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import bookdata from './../data/book.json';
import ReadingSettingIcon from './../../assets/setting_icon.png';
import { bgColors } from '../data/settingStory';
import axios from 'axios';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

const ReadingPage = ({ navigation , route}) => {
  const [isLeisureMode, setIsLeisureMode] = useState(false);
  const toggleLeisureMode = () => {
    setIsLeisureMode(!isLeisureMode);
  };
  
  const index = route.params?.index;
  const book_in_index = bookdata.find(book => book.id === index);
  
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);
  const [bgColor, setBgColor] = useState('white');
  const [fontSize, setFontSize] = useState({
    title: 24,
    sub_title: 18,
    content: 16
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [musicLoading, setMusicLoading] = useState(false);
  const [sounds, setSound] = useState(null);

  const handleSettingsModal = () => {
    setSettingsModalVisible((prevSettingsModalVisible) => !prevSettingsModalVisible);
  };

  const handleBgColorClick = (bgColorProp) => {
    setBgColor(bgColorProp);
  };

  const handleFontSizeClick = (adjust) => {
    setFontSize((prevFontSize) => ({
      title: prevFontSize.title + adjust,
      sub_title: prevFontSize.sub_title + adjust,
      content: prevFontSize.content + adjust,
    }));
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: showHeaderFooter });}, 
    [showHeaderFooter, navigation]
  , []);

  const handleScreenTap = () => {
    setShowHeaderFooter(!showHeaderFooter);
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: 'white', 
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold', 
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleSettingsModal}>
          <Image source={ReadingSettingIcon} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSettingsModal]);

  const fetchAndPlayWavFile = async () => {
    setMusicLoading(true);

    try {
      const dataToSend = { "data": {} };

      const response = await axios.post('http://100.87.143.63:8050/music_create', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      });

      const buffer = Buffer.from(response.data, 'binary').toString('base64');
      const path = FileSystem.documentDirectory + 'music.wav';
      await FileSystem.writeAsStringAsync(path, buffer, { encoding: FileSystem.EncodingType.Base64 });

      const { sound } = await Audio.Sound.createAsync({ uri: path }); // 修改这里
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error fetching the WAV file:', error);
    } finally {
      setMusicLoading(false);
    }
  };

  // 暂停音乐
  const pauseMusic = async () => {
    if (sounds) {
      await sounds.pauseAsync();
    }
  };

  // 继续播放音乐
  const resumeMusic = async () => {
    if (sounds) {
      await sounds.playAsync();
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      pauseMusic();
      setIsPlaying(false);
    } else {
      resumeMusic();
      setIsPlaying(true);
    }
  };

  const replayMusic = async () => {
    if (sounds) {
      await sounds.stopAsync();
      await sounds.playAsync();
    }
  };

  // 删除音乐
  const deleteMusic = async () => {
    if (sounds) {
      await sounds.unloadAsync();
      setSound(null);
      // 可以选择删除文件
      await FileSystem.deleteAsync(FileSystem.documentDirectory + 'music.wav');
    }
  };

  // 组件卸载时，卸载音乐
  useEffect(() => {
    return () => {
      if (sounds) {
        sounds.unloadAsync();
      }
    };
  }, [sounds]);


  // 組件卸載時停止播放音樂
  // useEffect(() => {
  //   return () => {
  //     if (sound) {
  //       sound.release();
  //     }
  //   };
  // }, [sound]);
  
  return (
    <View style={{backgroundColor: `${bgColor}`, ...styles.container}}>
        <StatusBar hidden={true} translucent={true}/>
        {showHeaderFooter && (
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
            </TouchableOpacity>
            </View>
        )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        backdropPressToClose={true}
        onRequestClose={handleSettingsModal}
      >
        <TouchableWithoutFeedback onPress={handleSettingsModal}>
          <View style={styles.modalBackground}></View>
        </TouchableWithoutFeedback>

        <View style={styles.modalOverlay} onPress={handleSettingsModal}>
          <View style={styles.modalView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.settingContentContainer}
            >
              <Text style={styles.bgColorText}>背景顏色</Text>
              {bgColors.map((bgColor, index) => {
                return (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => handleBgColorClick(bgColor)}
                    style={{ backgroundColor: `${bgColor}`, ...styles.bgColorContainer}}>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>

            <View style={styles.fontContainer}>
              <TouchableOpacity 
                style={styles.fontButton} 
                onPress={() => handleFontSizeClick(-2)}
              >
                <Text>縮小字體</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fontButton} 
                onPress={() => handleFontSizeClick(2)}
              >
                <Text>放大字體</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.audioContainer}>
              <TouchableOpacity
                onPress={fetchAndPlayWavFile} 
                style={styles.audioButton} 
              >
                <Text>{musicLoading ? "Loading..." : "播放音樂"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={togglePlayPause}
                style={styles.audioButton} 
              >
                <Text>{isPlaying ? "暫停音樂" : "繼續播放"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={deleteMusic}
                style={styles.audioButton} 
              >
                <Text>關閉音樂</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fontContainer}>
              <TouchableOpacity 
                style={[styles.fontButton, isLeisureMode ? styles.leisureModeActive : {}]}
                onPress={toggleLeisureMode}
              >
                <Text>休閒模式</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fontContainer}>
              <TouchableOpacity 
                style={[styles.fontButton, isLeisureMode ? styles.leisureModeActive : {}]}
                onPress={toggleLeisureMode}
              >
                <Text>朗讀</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        
          <TouchableOpacity style={styles.content} onPress={handleScreenTap} activeOpacity={1}>
            <View style={styles.textContainer}>
              <Text style={{ fontSize: fontSize.title, ...styles.book_title}}>{book_in_index?.content[0][0]}</Text>
              <Text style={{ fontSize: fontSize.sub_title, ...styles.book_subtitle}}>{book_in_index?.content[0][1]}</Text>
              <Text style={{ fontSize: fontSize.content, ...styles.book_content}}>{book_in_index?.content[0][2]}</Text>
            </View>
          </TouchableOpacity>
        
      </ScrollView>

      {showHeaderFooter && (
        <View style={styles.footer}>
          {/* Footer content goes here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    // Styles for header
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footer: {
  },
  book_title: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  book_subtitle: {
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  book_content: {
    lineHeight: 24,
    color: '#333',
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Higher z-index than the ScrollView
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
   modalContainer: {
    width: 'auto',
    height: 'auto',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start', 
    marginTop: 50, 
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.0)', // 半透明背景
  },
  modalView: {
    margin: 20,
    marginTop: 70,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  settingContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    paddingVertical: 20,
  },
  bgColorText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  bgColorContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 50,
    padding: 20,
    marginHorizontal: 2,
  },
  fontContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 20,
  },  
  fontButton: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 4,
  },
  audioContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    gap: 16,
  },
  audioButton: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  leisureModeActive: {
    backgroundColor: 'gray',
  },
});

export default ReadingPage;
