import React from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './Src/ navigation/MainNavigation';
import { Provider } from 'react-redux';
import { store } from './Src/Redux/store/Store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (

<Provider store={store}>
        <MainNavigation />
      <Toast />
</Provider>
  );
};

export default App;