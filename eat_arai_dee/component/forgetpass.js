import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const ForgetPass = ({ navigation }) => {
    const [Username, setUsername] = useState('');

    const handleSendOTP = () => {
        if (!Username) {
            Alert.alert("Error", "Please enter your username or email");
            return;
        }
        // Here you would typically call an API to send OTP
        // For now, let's just navigate to the OTP screen
        navigation.navigate('OTP');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.title}>
                <Text style={styles.title_text}>Find your account</Text>
                <Text style={styles.sub_title_text}>Enter your email address or username and we will send you a OTP.</Text>
            </View>

            <View style={styles.input_container}>
                <Text style={styles.input_title}>Username or Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    autoCapitalize="none"
                    onChangeText={(text) => setUsername(text)}
                    value={Username}
                />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Back to Login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        marginInline: 20,
    },
    title_text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    sub_title_text: {
        fontSize: 16,
        color: '#555',
    },
    input_container: {
        marginTop: 20,
        marginInline: 20,
    },
    input_title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginInline: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#007BFF',
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default ForgetPass;
