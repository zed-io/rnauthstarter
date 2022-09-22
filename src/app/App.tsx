import React, {useEffect, useState} from 'react';

import {Dimensions} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {waitUntilSagasFinishLoading} from 'src/redux/saga';
import {persistor, store} from '../redux/store';
import {NavigatorWrapper} from 'src/navigator/NavigatorWrapper';
import ApolloWrapper from '../apollo/ApolloWrapper';
interface Props {
  appStartedMillis: number;
}

export const App = (props: Props) => {
  const [reactLoadTime] = useState(Date.now());

  useEffect(() => {
    // @note Component did mount
    return () => {
      // @note Component will unmount
    };
  });

  const logAppLoadTime = () => {
    const {appStartedMillis} = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const readLoadDuration = (reactLoadTime - appStartedMillis) / 1000;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const appLoadDuration = (Date.now() - appStartedMillis) / 1000;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = Dimensions.get('window');
    // @todo Track telemetry on app launch
  };

  const handleOpenUrl = async () => {
    await waitUntilSagasFinishLoading();
    // @todo Handle deep link opening
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloWrapper>
            {/* @todo Add App Navigation Wrapper */}
            <NavigatorWrapper />
          </ApolloWrapper>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
