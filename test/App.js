import React   from 'react';
import Home from './src/application/Home.js'; 
import Profile from './src/application/Profile.js'; 
import Rank from './src/application/Rank.js'; 
import Search from './src/application/Search.js'; 
import Library from './src/application/Library.js'; 
import Reading from './src/application/Reading.js'; 
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { store } from './src/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Library" component={Library} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Rank" component={Rank} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Reading" component={Reading} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
