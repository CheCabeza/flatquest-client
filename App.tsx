// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './src/redux/store/index';
import Login from './../client/src/components/Login/Login';
import Details from './src/components/Details/Details';
import EditFlatReview from './src/components/EditFlatReview/EditFlatReview';
import Map from './src/components/Maps/Maps';
import Filter from './src/components/Filter/Filter';
import Favorites from './src/components/Favorites/Favorites';
import List from './src/components/List/List';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <Provider store={store()}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarButton: ['Details', 'EditFlatReview', 'Home'].includes(
                route.name,
              )
                ? () => {
                    return null;
                  }
                : undefined,
            })}
            tabBarOptions={{
              showLabel: false,
              style: {
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFB800',
                height: 70,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={Login}
              options={{
                tabBarVisible: false,
                tabBarIcon: ({focused}) => (
                  <View style={styles.tab}>
                    <Icon
                      color={focused ? '#397ED0' : '#000'}
                      name="user"
                      size={35}
                    />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="List"
              component={List}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tab}>
                    <Icon
                      name="home"
                      color={focused ? '#397ED0' : '#000'}
                      size={35}
                    />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="Favorites"
              component={Favorites}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tab}>
                    <Icon
                      name="heart"
                      color={focused ? '#397ED0' : '#000'}
                      size={35}
                    />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="Filter"
              component={Filter}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tab}>
                    <Icon
                      name="filter"
                      color={focused ? '#397ED0' : '#000'}
                      size={35}
                    />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="Map"
              component={Map}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tab}>
                    <Icon
                      name="map"
                      color={focused ? '#397ED0' : '#000'}
                      size={35}
                    />
                  </View>
                ),
              }}
            />
            <Tab.Screen name="Details" component={Details} />
            <Tab.Screen name="EditFlatReview" component={EditFlatReview} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tab: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
