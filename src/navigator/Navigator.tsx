import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParamList} from './types';
import {Screens} from './screens';
import Home from 'src/home/Home';
import {AppLoading} from 'src/app/AppLoading';
import {emptyHeader, noHeader} from './Headers';
import {ExtractProps} from 'src/utils/typescript';
import {useSelector} from 'react-redux';
import {authorizationTokenSelector} from '../auth/selectors';
import Transactions from '../transactions/Transactions';
import {navigate, navigateReset} from './service';

const Stack = createStackNavigator<StackParamList>();
const RootStack = createStackNavigator<StackParamList>();

type InitialRouteName = ExtractProps<
  typeof Stack.Navigator
>['initialRouteName'];

function MainStackScreen() {
  const [initialRouteName, setInitialRoute] =
    React.useState<InitialRouteName>(undefined);

  const {accessToken} = useSelector(authorizationTokenSelector) || {};

  useEffect(() => {
    let initialRoute = Screens.Home;
    if (accessToken) {
      initialRoute = Screens.Transactions;
    }
    setInitialRoute(initialRoute);
  }, []);

  useEffect(() => {
    if (accessToken) {
      navigate(Screens.Transactions, {});
    } else {
      navigateReset(Screens.Home, {});
    }
  }, [accessToken]);

  if (!initialRouteName) {
    return <AppLoading />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name={Screens.Home} component={Home} />
      <Stack.Screen name={Screens.Transactions} component={Transactions} />
    </Stack.Navigator>
  );
}

function RootStateScreen() {
  return (
    <RootStack.Navigator screenOptions={emptyHeader}>
      <RootStack.Screen
        name={Screens.Main}
        component={MainStackScreen}
        options={noHeader}
      />
    </RootStack.Navigator>
  );
}

export default RootStateScreen;
