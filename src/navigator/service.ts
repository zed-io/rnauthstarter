import {createNavigationContainerRef} from '@react-navigation/native';
import {Screens} from './screens';
import {StackParamList} from './types';

export const navigationRef = createNavigationContainerRef();

type SafeNavigate = typeof navigate;

export const navigate = (...args: any) => {
  const [routeName, params] = args;
  if (navigationRef.isReady()) {
    navigationRef.navigate(routeName as never, params as never);
  }
};

export const navigateReset = (...args: any) => {
  const [routeName, params] = args;
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name: routeName, params: params}],
    });
  }
};
