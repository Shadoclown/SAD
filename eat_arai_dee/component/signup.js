import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { supabase } from './connect';

function Signup({ navigation }) {
    const [newUser, setnewUser] = useState('');
    const [newEmail, setnewEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [newConfirmPassword, setnewConfirmPassword] = useState('');

    async function fetchsignup() {
        const { data } = await supabase.from('user').select('email');

        if (!newUser || !newEmail || !newPassword || !newConfirmPassword) {
            Alert.alert("Error", "Please fill in all fields.");
        } else if (newPassword !== newConfirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
        } else if (data.email == newEmail) {
            Alert.alert("Error", "Email already exists.");
        } else {
            const { data, error } = await supabase
                .from('user')
                .insert([
                    {
                        username: newUser,
                        email: newEmail,
                        password: newPassword,
                    }
                ]);

            if (error) {
                console.log("Signup error:", error);
                Alert.alert("Error", "Signup failed: " + error.message);
            } else {
                Alert.alert("Success", "Account created successfully!");
                navigation.navigate('Login');
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            </View>
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
            <Text style={{width:'100%', marginBottom: 5}}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value= {newUser}
                onChangeText={setnewUser}
            />
            <Text style={{width:'100%', marginBottom: 5}}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value= {newEmail}
                onChangeText={setnewEmail}
            />
            <Text style={{width:'100%', marginBottom: 5}}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value= {newPassword}
                onChangeText={setnewPassword}
                secureTextEntry
            />
            <Text style={{width:'100%', marginBottom: 5}}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value= {newConfirmPassword}
                onChangeText={setnewConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={fetchsignup}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.footer}>  
                <TouchableOpacity 
                    style={styles.signup_button} 
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.signup}>Already have account?  <Text style={{color: '#3498db',}}>Login</Text></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    headerBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#f0f8ff',
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    backButtonText: {
        fontSize: 16,
        color: '#3498db',
        fontWeight: 'bold',
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
        backgroundColor: '#3498db',
        borderRadius: 50,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    chef_icon: {
        backgroundColor: '#3498db',
        borderRadius: 50,
        padding: 12,
        marginBottom: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    location_icon: {
        backgroundColor: '#3498db',
        borderRadius: 50,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    utensil_icon_image: {
        width: 35,
        height: 35,
        tintColor: '#fff',
    },
    chef_icon_image: {
        width: 35,
        height: 35,
        tintColor: '#fff',
    },
    location_icon_image: {
        width: 35,
        height: 35,
        tintColor: '#fff',
    },
    name_slogan: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginBottom: 30,
    },
    homepage_name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    homepage_slogan: {
        fontSize: 16,
        color: '#666',
    },
    input: {
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 18,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor: '#ff9900',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
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
        borderRadius: 12,
    },
    signup: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Signup;