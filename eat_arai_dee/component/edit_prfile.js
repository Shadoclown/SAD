import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Use expo-image-picker if using Expo
import { supabase } from './connect';

function EditProfile({ closeEditProfile }) {
    const [userId, setUserId] = useState(null);
    const [Newusername, setNewUsername] = useState('');
    const [Newemail, setNewEmail] = useState('');
    const [Newpassword, setNewPassword] = useState('');
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // State for profile image

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                setUserId(userId);
            } else {
                setUserId(null);
            }
        };

        const fetchUserData = async () => {
            if (userId) {
                const { data, error } = await supabase
                    .from('user')
                    .select('username, email, password')
                    .eq('user_id', parseInt(userId, 10));

                if (error) {
                    console.error('Error fetching user data:', error.message);
                } else if (data && data.length > 0) {
                    setUsername(data[0].username);
                    setEmail(data[0].email);
                    setPassword(data[0].password);
                }
            }
        };

        const loadProfileImage = async () => {
            const savedImage = await AsyncStorage.getItem('profileImage');
            if (savedImage) {
                setProfileImage(savedImage);
            }
        };

        checkLoginStatus();
        fetchUserData();
        loadProfileImage();
    }, [userId]);

    const changeProfileImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access the gallery is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri; // Get the selected image URI
            setProfileImage(imageUri); // Update state
            await AsyncStorage.setItem('profileImage', imageUri); // Save to AsyncStorage
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.user_profile}>
                <Image 
                    source={profileImage ? { uri: profileImage } : require('../image/profile_image.png')}
                    style={styles.profile_image}
                />
                <TouchableOpacity style={styles.edit_image_button} onPress={changeProfileImage}>
                    <Text style={styles.edit_image_text}>Change Profile</Text>
                </TouchableOpacity>     
            </View>

            <Text style={styles.label}>Enter New Name</Text>
            <TextInput
                style={styles.input}
                placeholder={username}
                value={Newusername}
                onChangeText={setNewUsername}
            />

            <Text style={styles.label}>Enter New Email</Text>
            <TextInput
                style={styles.input}
                placeholder={email}
                value={Newemail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Enter New Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={Newpassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />

            <TouchableOpacity 
                style={styles.saveButton} 
                onPress={() => {
                    updateProfile();
                    closeEditProfile();
                }}
            >
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