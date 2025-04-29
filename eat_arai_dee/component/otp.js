import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native';

function OTP({ gotoLogin, gotoFpass }) {
    const [formData, setFormData] = useState({
        otp: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            Alert.alert("Error", "Passwords do not match!");
            return;
        }
        // ...handle OTP verification and password reset logic...
        Alert.alert("Success", "Password reset successful!");
        gotoLogin();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.subtitle}>Enter OTP and New Password</Text>
            <TextInput
                style={styles.input}
                value={formData.otp}
                onChangeText={(value) => handleChange('otp', value)}
                placeholder="OTP"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={formData.newPassword}
                onChangeText={(value) => handleChange('newPassword', value)}
                placeholder="New Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => handleChange('confirmPassword', value)}
                placeholder="Confirm New Password"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={gotoLogin}>
                <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // backgroundColor: '#EAF6FF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    backButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#007BFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OTP;