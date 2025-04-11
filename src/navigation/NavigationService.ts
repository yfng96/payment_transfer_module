import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';

interface ResetRoute {
  name: string;
  params?: Record<string, any>;
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: string, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.navigate(name, params);
  }
};

export const navigateAndReset = (routes: ResetRoute[], index: number) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      })
    );
  }
};

export const navigateAndSimpleReset = (name: string, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      })
    );
  }
};
