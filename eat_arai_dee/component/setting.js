import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

function Setting( {closeSetting, logout, gotoEdit} ) {
    return (
        <View style={styles.container}>
            <View style={styles.user_profile}>
                <Image 
                    source={require('../image/profile_image.png')}
                    style={styles.profile_image}
                />
                <Text style={styles.username}>KunTang</Text>
            </View>
            <TouchableOpacity style={styles.info_button} onPress={gotoEdit}>
                <Text style={styles.info_button_text}>Personal Information Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info_button}>
                <Text style={styles.info_button_text}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.info_button, styles.logout_button]} onPress={logout}>
                <Text style={styles.info_button_text}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.close_button} onPress={closeSetting}>
                    <Text style={styles.close_button_text}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    user_profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '65%',
        // backgroundColor: 'white',
    },
    profile_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'blue',
        borderWidth: 3,
    },
    username: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    info_button: {
        width: '80%',
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
    },
    info_button_text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    logout_button: {
        marginTop: 100,
        backgroundColor: 'red',
    },
    footer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 20,
    },
    close_button: {
        width: '80%',
        height: 50,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
    },
    close_button_text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default Setting;