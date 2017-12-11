import { Ionicons } from '@expo/vector-icons';
import { createTabBarIconWrapper } from '../common/components/native';
import Landing from './containers/Landing';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  tabItem: {
    Landing: {
      screen: Landing,
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(Ionicons, {
          name: 'ios-browsers-outline',
          size: 30
        })
      }
    }
  },
  reducer: { landing: reducers }
});
