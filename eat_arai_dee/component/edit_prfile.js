import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './connect';

function EditProfile({ navigation }) {
    const [userId, setUserId] = useState(null);
    const [Newusername, setNewUsername] = useState('');
    const [Newemail, setNewEmail] = useState('');
    const [Newpassword, setNewPassword] = useState('');
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

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
            try {
                const savedImageUri = await AsyncStorage.getItem('profileImage');
                if (savedImageUri) {
                    setProfileImage(savedImageUri);
                }
            } catch (error) {
                console.error('Error loading profile image:', error);
            }
        };

        checkLoginStatus();
        fetchUserData();
        loadProfileImage();
    }, [userId]);

    async function updateProfile() {
        if (!userId) {
            Alert.alert("Error", "User not logged in");
            return;
        }
        
        try {
            let updated = false;
            
            if (Newusername) {
                const { error } = await supabase
                    .from('user')
                    .update({ username: Newusername })
                    .eq('user_id', parseInt(userId, 10));
                    
                if (error) {
                    console.error('Error updating username:', error.message);
                    Alert.alert("Error", "Failed to update username");
                } else {
                    updated = true;
                }
            }
            
            if (Newemail) {
                const { error } = await supabase
                    .from('user')
                    .update({ email: Newemail })
                    .eq('user_id', parseInt(userId, 10));
                if (error) {
                    console.error('Error updating email:', error.message);
                    Alert.alert("Error", "Failed to update email");
                } else {
                    updated = true;
                }
            }
            
            if (Newpassword) {
                const { error } = await supabase
                    .from('user')
                    .update({ password: Newpassword })
                    .eq('user_id', parseInt(userId, 10));
                if (error) {
                    console.error('Error updating password:', error.message);
                    Alert.alert("Error", "Failed to update password");
                } else {
                    updated = true;
                }
            }
            
            if (updated) {
                Alert.alert("Success", "Profile updated successfully");
                navigation.navigate('Setting');
            }
        } catch (error) {
            console.error("Error in updateProfile:", error);
            Alert.alert("Error", "An unexpected error occurred");
        }
    }

    const handleImagePicker = async () => {
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
            const imageUri = result.assets[0].uri;
            console.log('Selected Image URI:', imageUri);

            try {
                await AsyncStorage.setItem('profileImage', imageUri);
                setProfileImage(imageUri);
            } catch (error) {
                console.error('Error saving profile image:', error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.user_profile}>
                <Image 
                    source={profileImage ? { uri: profileImage } : require('../image/profile_image.png')}
                    style={styles.profile_image}
                />
                <TouchableOpacity style={styles.edit_image_button} onPress={handleImagePicker}>
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
                onPress={updateProfile}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: '#ccc', marginTop: 10 }]} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.saveButtonText}>Cancel</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
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
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 16,
        color: '#007BFF',
        fontWeight: 'bold',
    },
});

export default EditProfile;