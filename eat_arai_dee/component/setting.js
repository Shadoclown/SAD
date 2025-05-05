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
        justifyContent: 'space-around',
        width: '65%',
    },
    profile_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: "rgb(0, 115, 215)",
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
        backgroundColor: 'rgb(49, 159, 255)',
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
        backgroundColor: 'rgb(255, 40, 40)',
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
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    homeButtonText: {
        color: 'white',
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

export default Setting;