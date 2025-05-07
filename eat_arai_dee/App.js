import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import components
import Homepage from './component/homepage';
import Filter from './component/filter';
import Login from './component/login';
import Signup from './component/signup';
import Setting from './component/setting';
import EditProfile from './component/edit_prfile';
import History from './component/history';
import ForgetPass from './component/forgetpass';
import OTP from './component/otp';
import OrderPage from './component/orderpage';
import Cart from './component/cart';
import DeliveryPage from './component/deliverypage';

const Stack = createNativeStackNavigator();

// Custom header component
function CustomHeader({ navigation, route, isLogin, setIsLogin, userId }) {
  return (
    <View style={styles.navbar}>
      <View style={styles.navbar_logo}>
        <Text style={styles.navbar_logo_E}> E </Text>
        <Text style={styles.navbar_logo_text}>Eat Arai Dee</Text>
      </View>
      <View style={styles.navbar_icon}>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Image
            source={require('./image/filter.png')}
            style={styles.navbar_icon_filter} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => (!isLogin ? navigation.navigate('Login') : navigation.navigate('Setting', { userId }))}>
          <Image
            source={require('./image/profile.png')}
            style={styles.navbar_icon_profile} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [filters, setFilters] = useState({
    preferences: [],
    allergies: [],
    costRange: null,
    spiceLevel: null,
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          setIsLogin(true);
        } else {
          setUserId(null);
          setIsLogin(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Homepage"
        screenOptions={({ route }) => ({
          header: (props) => (
            route.name === 'DeliveryPage' ? null : (
              <CustomHeader 
                {...props} 
                isLogin={isLogin} 
                setIsLogin={setIsLogin} 
                userId={userId} 
              />
            )
          ),
        })}
      >
        <Stack.Screen name="Homepage">
          {(props) => (
            <Homepage
              {...props}
              userId={userId}
              filter_preferences={filters.preferences}
              filter_allergies={filters.allergies}
              filter_costRange={filters.costRange}
              filter_spiceLevel={filters.spiceLevel}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Filter">
          {(props) => (
            <Filter
              {...props}
              setFilters={setFilters}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Login">
          {(props) => (
            <Login
              {...props}
              setIsLogin={setIsLogin}
              setUserId={setUserId}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Signup" component={Signup} />
        
        <Stack.Screen name="Setting">
          {(props) => (
            <Setting
              {...props}
              isLogin={isLogin}
              userId={userId}
              logout={() => {
                AsyncStorage.removeItem('userId');
                setIsLogin(false);
                setUserId(null);
                props.navigation.navigate('Homepage');
              }}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="EditProfile">
          {(props) => (
            <EditProfile {...props} />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="ForgetPass" component={ForgetPass} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="OrderPage" component={OrderPage} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="DeliveryPage" component={DeliveryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#f0f8ff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  navbar_logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    gap: 5,
  },
  navbar_logo_E: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 7,
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: 8,
  },
  navbar_logo_text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  navbar_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  navbar_icon_filter: {
    width: 40,
    height: 40,
    // backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 50,
  },
  navbar_icon_profile: {
    width: 40,
    height: 40,
  },
});