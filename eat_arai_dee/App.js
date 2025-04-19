import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Homepage from './component/homepage';
import Filter from './component/filter';
import Login from './component/login';
import Signup from './component/signup';
import Setting from './component/setting';
import EditProfile from './component/edit_prfile';

export default function App() {
  const [isPageOpen, setisPageOpen] = useState("Homepage");
  const [isLogin, setisLogin] = useState(false);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navbar_logo}>
          <Text style={styles.navbar_logo_E}> E </Text>
          <Text style={styles.navbar_logo_text}>Eat Arai Dee</Text>
        </View>
        <View style={styles.navbar_icon}>
          <TouchableOpacity onPress={() => setisPageOpen("Filter")}>
            <Image
              source={require('./image/filter.png')}
              style={styles.navbar_icon_filter} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (!isLogin ? setisPageOpen("Login") : setisPageOpen("Setting"))}>
            <Image
              source={require('./image/profile.png')}
              style={styles.navbar_icon_profile} />
          </TouchableOpacity>
        </View>
      </View>

      {isPageOpen === "Filter" && (
        <ScrollView contentContainerStyle={styles.scollContent}>
          <Filter closeFilter={() => setisPageOpen("Homepage")} />
        </ScrollView>
      )}
      {isPageOpen === "Login" && (
        <ScrollView contentContainerStyle={styles.scollContent}>
          <Login closeLogin={() => [setisPageOpen('Homepage'), setisLogin(true)]} 
                  gotoSignup={() => setisPageOpen('Signup')
          } />
        </ScrollView>
      )}
      {isPageOpen === "Signup" && (
        <ScrollView contentContainerStyle={styles.scollContent}>
          <Signup closeSignup={() => [setisPageOpen('Homepage'), setisLogin(true)]}
                  gotoLogin={() => setisPageOpen('Login')} />
        </ScrollView>
      )}
      {isPageOpen === "Setting" && (
        <ScrollView contentContainerStyle={styles.scollContent}>
          <Setting closeSetting={() => setisPageOpen('Homepage')}
                    logout={() => [setisPageOpen('Homepage'), setisLogin(false)]}
                    gotoEdit={() => setisPageOpen('EditProfile')}/>
        </ScrollView>
      )}
      {isPageOpen === "Homepage" && (
        <ScrollView contentContainerStyle={styles.scollContent}>
          <Homepage />
        </ScrollView>
      )}
      {isPageOpen === "EditProfile" && (
        <ScrollView contentContainerStyle={styles.scollContent}>
          <EditProfile closeEditProfile={() => setisPageOpen('Setting')}/>
        </ScrollView> 
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(223, 240, 255)',
  },
  navbar: {
    marginTop: 40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  navbar_logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    gap: 5,
  },
  navbar_logo_E: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: 'lightblue',
    color: 'blue',
    borderRadius: 5,
  },
  navbar_logo_text: {
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
    backgroundColor: 'lightblue',
    padding: 8,
    borderRadius: 50
  },
  navbar_icon_profile: {
    width: 40,
    height: 40,
  },
  scollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

});