import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from "react-native";

function History({ closeHistory }) {
    const [expandedItemId, setExpandedItemId] = useState(null);

    const historyData = [
        {
            id: 1,
            restaurantName: "Pizza Paradise",
            date: "2025-04-20",
            image: require("../image/pizza_restuarant.jpg"),
            details: "Famous for its wood-fired pizzas and cozy ambiance.",
            openDay: "Monday - Friday",
            openTime: "10:00 AM",
            closeTime: "10:00 PM",
            locationLink: "https://maps.google.com/?q=Pizza+Paradise",
        },
        {
            id: 2,
            restaurantName: "Sushi World",
            date: "2025-04-18",
            image: require("../image/sushi_restuarant.jpg"),
            details: "Known for its fresh sushi and authentic Japanese cuisine.",
            openDay: "Everyday",
            openTime: "11:00 AM",
            closeTime: "9:00 PM",
            locationLink: "https://maps.google.com/?q=Sushi+World",
        },
        {
            id: 3,
            restaurantName: "Burger Haven",
            date: "2025-04-15",
            image: require("../image/burger_restuarant.jpg"),
            details: "Offers a variety of gourmet burgers and craft beers.",
            openDay: "Weekends",
            openTime: "12:00 PM",
            closeTime: "11:00 PM",
            locationLink: "https://maps.google.com/?q=Burger+Haven",
        },
    ];

    const toggleDetails = (id) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };

    const handleOpenLink = (link) => {
        Linking.openURL(link);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <ScrollView>
                {historyData.map((item) => (
                    <View key={item.id} style={styles.historyItem}>
                        <View style={styles.row}>
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                                <Text style={styles.date}>{item.date}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.moreDetailsButton}
                                onPress={() => toggleDetails(item.id)}
                            >
                                <Text style={styles.moreDetailsButtonText}>
                                    {expandedItemId === item.id ? "Hide Details" : "More Details"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {expandedItemId === item.id && (
                            <View style={styles.expandedDetails}>
                                <Text style={styles.detailText}>Open Days: {item.openDay}</Text>
                                <Text style={styles.detailText}>
                                    Time: {item.openTime} - {item.closeTime}
                                </Text>
                                <View style={styles.locationText} >
                                    <Text>Location: </Text>
                                    <TouchableOpacity onPress={() => handleOpenLink(item.locationLink)}>
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
            <TouchableOpacity style={styles.closeButton} onPress={closeHistory}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
});

export default History;