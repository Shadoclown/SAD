import { StyleSheet, Text, View, Image } from 'react-native';
import Homepage from './component/homepage';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navbar_logo}>
          <Text style={styles.navbar_logo_E}> E </Text>
          <Text style={styles.navbar_logo_text}>Eat Arai Dee</Text>
        </View>
        <View style={styles.navbar_icon}>
          <Image
            source={require('./image/filter.png')}
            style={styles.navbar_icon_filter} />
          <Image
            source={require('./image/profile.png')}
            style={styles.navbar_icon_profile} />
        </View>
      </View>

      <Homepage />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    blue_backgroundColor: 'lightblue',
    blue_textColor: 'lightblue',
    fontFamily: 'sans-serif',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  navbar: {
    width: '100%',
    height: '2vh',
    backgroundColor: '#f8f8f8',
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
});
