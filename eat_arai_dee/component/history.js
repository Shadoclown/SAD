import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking, ActivityIndicator } from "react-native";
import { supabase } from "./connect";
import AsyncStorage from '@react-native-async-storage/async-storage';

function History({ navigation }) {
    const [expandedItemId, setExpandedItemId] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const { data, error } = await supabase
                    .from('history')
                    .select('history_id, restaurant_id, time, restaurant(*)')
                    .eq('user_id', parseInt(userId, 10));

                if (error) {
                    console.error("Error fetching history:", error);
                } else {
                    setHistoryData(data);
                }
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const toggleDetails = (id) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };

    const handleOpenLink = (link) => {
        Linking.openURL(link);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>History</Text>
            <ScrollView>
                {historyData.map((item) => (
                    <View key={item.history_id} style={styles.historyItem}>
                        <View style={styles.row}>
                            <Image source={{ uri: item.restaurant.image }} style={styles.image} />
                            {item.restaurant && (
                                <View style={styles.details}>
                                    <Text style={styles.restaurantName}>{item.restaurant.restaurant_name}</Text>
                                    <Text style={styles.date}>{new Date(item.time).toLocaleString()}</Text>
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.moreDetailsButton}
                                onPress={() => toggleDetails(item.history_id)}
                            >
                                <Text style={styles.moreDetailsButtonText}>
                                    {expandedItemId === item.history_id ? "Hide Details" : "More Details"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {expandedItemId === item.history_id && item.restaurant && (
                            <View style={styles.expandedDetails}>
                                <Text style={styles.detailText}>Open Days: {item.restaurant.open_day}</Text>
                                <Text style={styles.detailText}>
                                    Time: {item.restaurant.open_time} - {item.restaurant.close_time}
                                </Text>
                                <View style={styles.locationText}>
                                    <Text>Location: </Text>
                                    <TouchableOpacity onPress={() => handleOpenLink(item.restaurant.location_link)}>
                                        <Text style={[styles.detailText, styles.linkText]}>
                                            View Location
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    historyItem: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    details: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    date: {
        fontSize: 14,
        color: "#666",
    },
    moreDetailsButton: {
        padding: 5,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
    },
    moreDetailsButtonText: {
        color: "#fff",
        fontSize: 14,
    },
    expandedDetails: {
        marginTop: 10,
        backgroundColor: "rgb(200, 230, 255)",
        padding: 10,
        borderRadius: 5,
    },
    detailText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    linkText: {
        color: "#007BFF",
        textDecorationLine: "underline",
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    locationText: {
        flexDirection: "row",
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

export default History;