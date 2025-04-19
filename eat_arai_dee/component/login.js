import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

function Login( {closeLogin, gotoSignup} ) {
    return (
        <View style={styles.container}>
            <View style={styles.tri_icon}>
                <View style={styles.utensil_icon}>
                    <Image source={require('../image/utensil_icon.png')} style={styles.utensil_icon_image} />
                </View>
                <View style={styles.chef_icon}>
                    <Image source={require('../image/chef_icon.png')} style={styles.chef_icon_image} />
                </View>
                <View style={styles.location_icon}>
                    <Image source={require('../image/location_icon.png')} style={styles.location_icon_image} />
                </View>
            </View>
            <View style={styles.name_slogan}>
                <Text style={styles.homepage_name}>Eat Arai Dee</Text>
                <Text style={styles.homepage_slogan}>Let us decide where to eat</Text>
            </View>
            <Text style={{width:'100%', marginBottom: 5}}>Username or Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value= 'username'
            />
            <Text style={{width:'100%', marginBottom: 5}}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value='password'
                secureTextEntry
            />
            <TouchableOpacity style={styles.forgot_button} onPress={closeLogin}>
                <Text style={styles.forgot}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={closeLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footer}>  
                <TouchableOpacity style={styles.signup_button} onPress={gotoSignup}>
                    <Text style={styles.signup}>Don't have an account?  <Text style={{color: '#007BFF',}}>Sign-up</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    tri_icon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginTop: 40,
        height: 100,
    },
    utensil_icon: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        padding: 10,
    },
    chef_icon: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        padding: 10,
        marginBottom: 60,
    },
    location_icon: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        padding: 10,
    },
    utensil_icon_image: {
        width: 35,
        height: 35,
    },
    chef_icon_image: {
        width: 35,
        height: 35,
    },
    location_icon_image: {
        width: 35,
        height: 35,
    },
    name_slogan: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginBottom: 30,
    },
    homepage_name: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    homepage_slogan: {
        fontSize: 15,
        color: 'gray',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    forgot: {
        color: '#007BFF',
        fontSize: 16,
        marginBottom: 40,
        marginLeft: 200,
        marginTop: -10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    signup_button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    signup: {
        fontWeight: 'bold',
    },
});

export default Login;