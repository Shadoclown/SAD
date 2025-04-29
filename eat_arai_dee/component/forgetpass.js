import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ForgetPass = ({ gotoLogin, gotocheckOTP }) => {
    const [Username, setUsername] = useState('');


    return (
        <View style={styles.container}>
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
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={gotocheckOTP} >
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.loginText} onPress={gotoLogin}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
