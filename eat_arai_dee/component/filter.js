import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
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
    const togglePreference = (id) => {
        setSelectedPreferences((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleAllergy = (id) => {
        setSelectedAllergies((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleCostRange = (id) => {
        setSelectedCostRange((prev) => (prev === id ? null : id));
    };

    const toggleSpice = (id) => {
        setSelectedSpice((prev) => (prev === id ? null : id));
    };

    async function handleSetFilter() {
        const selectedPrefNames = foodPreferences
            .filter(pref => selectedPreferences.includes(pref.id))
            .map(pref => pref.name);

        const selectedAllergyNames = AllergyInfo
            .filter(allergy => selectedAllergies.includes(allergy.id))
            .map(allergy => allergy.name);

        try {
            // Fetch all restaurants
            const { data: restaurants, error } = await supabase.from("restaurant").select("*");

            if (error) {
                console.error("Error fetching restaurants:", error.message);
                closeFilter(null);
                return;
            }

            // Filter restaurants that match at least one filter criterion
            const filteredRestaurants = restaurants.filter(restaurant => {
                const matchesPreferences = selectedPrefNames.some(pref =>
                    restaurant.food_preference?.toLowerCase().includes(pref.toLowerCase())
                );
                const matchesAllergies = selectedAllergyNames.every(allergy =>
                    !restaurant.allergy?.toLowerCase().includes(allergy.toLowerCase())
                );
                const matchesCostRange = selectedCostRange
                    ? restaurant.cost_range === CostRange.find(range => range.id === selectedCostRange)?.name
                    : true;
                const matchesSpice = selectedSpice
                    ? restaurant.spice_level === selectedSpice
                    : true;

                return matchesPreferences && matchesAllergies && matchesCostRange && matchesSpice;
            });

            if (filteredRestaurants.length > 0) {
                // Randomly select a restaurant from the filtered list
                const randomRestaurant = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
                console.log("Randomly Selected Restaurant:", randomRestaurant);
                closeFilter(randomRestaurant);
            } else {
                console.log("No restaurants match the selected filters.");
                closeFilter(null);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            closeFilter(null);
        }
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
                                selectedPreferences.includes(item.id) && styles.colorfoodPreference,
                            ]}
                            onPress={() => togglePreference(item.id)}
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
                                selectedAllergies.includes(item.id) && styles.colorfoodPreference,
                            ]}
                            onPress={() => toggleAllergy(item.id)}
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
                                selectedSpice === level.id && styles.colorfoodPreference,
                            ]}
                            onPress={() => toggleSpice(level.id)}
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
