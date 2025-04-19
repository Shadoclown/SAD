import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

function EditProfile({ closeEditProfile }) {

    return (
        <View style={styles.container}>
            <View style={styles.user_profile}>
                <Image 
                    source={require('../image/profile_image.png')}
                    style={styles.profile_image}
                />
                <TouchableOpacity style={styles.edit_image_button}>
                    <Text style={styles.edit_image_text}>Chagne Profile</Text>
                </TouchableOpacity>     
            </View>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value='New Name'
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value="New Email"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value="New Password"
                secureTextEntry
            />

            <TouchableOpacity style={styles.saveButton} onPress={closeEditProfile}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    user_profile: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 20,
        justifyContent: 'center',
    },
    profile_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#007BFF',
        borderWidth: 3,
    },
    edit_image_button: {
        backgroundColor: '#007BFF',
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    edit_image_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
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
    saveButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfile;