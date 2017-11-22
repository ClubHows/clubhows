import { Ionicons } from '@expo/vector-icons';
import { createTabBarIconWrapper } from '../common/components/native';
import Team from './containers/Team';
import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  tabItem: {
    Team: {
      screen: Team,
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(Ionicons, {
          name: 'ios-browsers-outline',
          size: 30
        })
      }
    }
  },
  reducer: { team: reducers }
});
