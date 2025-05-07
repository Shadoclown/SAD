import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './connect';

function Setting({ navigation, logout, isLogin, userId }) {
    const [username, setUsername] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        console.log("Setting component mounted. User ID:", userId);
        const checkLoginStatus = async () => {
            if (userId) {
                const { data, error } = await supabase
                    .from('user')
                    .select('username')
                    .eq('user_id', userId)
                    .single();

                console.log("Supabase query result:", data, error);

                if (error) {
                    console.error("Error fetching username:", error);
                } else {
                    setUsername(data.username);
                }
            } else {
                setUsername(null);
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

        loadProfileImage();
        checkLoginStatus();
    }, [isLogin, userId]);

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
                <Text style={styles.username}>{username || "Guest"}</Text>
            </View>
            <TouchableOpacity 
                style={styles.info_button} 
                onPress={() => navigation.navigate('EditProfile')}
            >
                <Text style={styles.info_button_text}>Personal Information Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.info_button} 
                onPress={() => navigation.navigate('History')}
            >
                <Text style={styles.info_button_text}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.info_button, styles.logout_button]} onPress={logout}>
                <Text style={styles.info_button_text}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.homeButton} 
                    onPress={() => navigation.navigate('Homepage')}
                >
                    <Text style={styles.homeButtonText}>Back to Homepage</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        backgroundColor: '#f0f8ff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    user_profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '65%',
        marginVertical: 25,
    },
    profile_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: "#3498db",
        borderWidth: 3,
    },
    username: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#2c3e50',
    },
    info_button: {
        width: '80%',
        height: 54,
        backgroundColor: '#3498db',
        borderRadius: 12,
        marginTop: 18,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    info_button_text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 20,
    },
    logout_button: {
        marginTop: 100,
        backgroundColor: '#e74c3c',
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 20,
    },
    homeButton: {
        width: '80%',
        backgroundColor: '#3498db',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    homeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 16,
        color: '#3498db',
        fontWeight: 'bold',
    },
});

export default Setting;