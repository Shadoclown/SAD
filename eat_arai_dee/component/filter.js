import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './connect';

function Filter({ closeFilter }) {
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [selectedCostRange, setSelectedCostRange] = useState(null);
    const [selectedSpice, setSelectedSpice] = useState(null);

    const foodPreferences = [
        { id: 1, name: 'Vegetarian' },
        { id: 2, name: 'Vegan' },
        { id: 3, name: 'Gluten-Free' },
        { id: 4, name: 'Halal Food' },
        { id: 5, name: 'Kosher Food' },
        { id: 6, name: 'Organic Food' },
        { id: 7, name: 'Seafood Lover' },
        { id: 8, name: 'Meat Lover' },
    ];

    const AllergyInfo = [
        { id: 1, name: 'Peanuts' },
        { id: 2, name: 'Dairy' },
        { id: 3, name: 'Gluten' },
        { id: 4, name: 'Shellfish' },
        { id: 5, name: 'Soy' },
    ];

    const CostRange = [
        { id: 1, name: 'Budget' },
        { id: 2, name: 'Moderate' },
        { id: 3, name: 'Expensive' },
        { id: 4, name: 'Luxury' },
    ];

    const SpiceLevel = [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 },
        { id: 4, name: 4 },
        { id: 5, name: 5 },
    ];

    // Toggle Functions
    const togglePreference = (name) => {
        setSelectedPreferences((prev) =>
            prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        );
    };

    const toggleAllergy = (name) => {
        setSelectedAllergies((prev) =>
            prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        );
    };

    const toggleCostRange = (id) => {
        setSelectedCostRange((prev) => (prev === id ? null : id));
    };

    const toggleSpice = (name) => {
        setSelectedSpice((prev) => (prev === name ? null : name));
    };

    async function handleSetFilter() {
        if (selectedPreferences.length === 0 && selectedAllergies.length === 0 && selectedCostRange === null && selectedSpice === null) {
            closeFilter();
            await AsyncStorage.setItem('isfilter', 'false')
            Alert.alert("Error", "No filter is selected.");

        } else {
            Storage();
            await AsyncStorage.setItem('isfilter', 'true')
            closeFilter();
        }
    }

    async function Storage() {
        await AsyncStorage.setItem('selectedPreferences', JSON.stringify(selectedPreferences.length > 0 ? selectedPreferences : []));
        await AsyncStorage.setItem('selectedAllergies', JSON.stringify(selectedAllergies.length > 0 ? selectedAllergies : []));
        await AsyncStorage.setItem('selectedCostRange', selectedCostRange ? JSON.stringify(selectedCostRange) : '');
        await AsyncStorage.setItem('selectedSpice', selectedSpice ? JSON.stringify(selectedSpice) : '');
    }

    return (
        <View style={styles.filter_container}>
            {/* Food Preferences */}
            <View style={styles.food_preference}>
                <Text>Food Preferences</Text>
                <View style={styles.preference_checkbox}>
                    {foodPreferences.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.food_preference_item,
                                selectedPreferences.includes(item.name) && styles.colorfoodPreference,
                            ]}
                            onPress={() => togglePreference(item.name)}
                        >
                            <Text style={styles.food_preference_text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.horizontal_line} />

            {/* Allergy Info */}
            <View style={styles.food_preference}>
                <Text>Allergy Information</Text>
                <View style={styles.preference_checkbox}>
                    {AllergyInfo.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.food_preference_item,
                                selectedAllergies.includes(item.name) && styles.colorfoodPreference,
                            ]}
                            onPress={() => toggleAllergy(item.name)}
                        >
                            <Text style={styles.food_preference_text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.horizontal_line} />

            {/* Cost Range */}
            <View style={styles.food_preference}>
                <Text>Cost Range</Text>
                <View style={styles.preference_checkbox}>
                    {CostRange.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.food_preference_item,
                                selectedCostRange === item.id && styles.colorfoodPreference,
                            ]}
                            onPress={() => toggleCostRange(item.id)}
                        >
                            <Text style={styles.food_preference_text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.horizontal_line} />

            {/* Spice Level */}
            <View style={styles.food_preference}>
                <Text>Spice Level</Text>
                <View style={[styles.preference_checkbox, { justifyContent: 'center', gap: 20 }]}>
                    <Text style={{ fontSize: 12, marginTop: 10 }}>lowest</Text>
                    {SpiceLevel.map((level) => (
                        <TouchableOpacity
                            key={level.id}
                            style={[
                                styles.food_preference_item,
                                selectedSpice === level.name && styles.colorfoodPreference,
                            ]}
                            onPress={() => toggleSpice(level.name)}
                        >
                            <Text style={styles.food_preference_text}>{level.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <Text style={{ fontSize: 12, marginTop: 10 }}>highest</Text>
                </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSetFilter}>
                <View style={styles.homepage_random}>
                    <Text style={styles.random_button}>Set Filter</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    filter_container: {
        flex: 1,
        backgroundColor: 'rgb(223, 240, 255)',
        padding: 20,
        gap: 20,
    },
    horizontal_line: {
        maxWidth: '95%',
        height: 1,
        marginInline: 5,
        backgroundColor: 'rgb(89, 89, 89)',
    },
    food_preference: {
        flexDirection: 'column',
        gap: 10,
    },
    preference_checkbox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    food_preference_item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
    },
    colorfoodPreference: {
        backgroundColor: 'lightblue',
    },
    homepage_random: {
        backgroundColor: 'rgb(49, 159, 255)',
        alignItems: 'center',
        marginTop: 30,
        padding: 20,
        borderRadius: 15,
        width: '100%',
    },
    random_button: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Filter;
