import { StyleSheet,View,Text,TouchableOpacity } from "react-native";
import React, { useState } from "react";

function Filter( {closeFilter} ) {
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedRestriction, setSelectedRestriction] = useState([]);
    const [selectedCostRange, setSelectedCostRange] = useState(null);
    const [selectedSpice, setSelectedSpice] = useState(null); 

    const foodPreferences = [
        { id: 1, name: 'Vegetarian' },
        { id: 2, name: 'Vegan' },
        { id: 3, name: 'Gluten-Free' },
        { id: 4, name: 'Halal' },
        { id: 5, name: 'Kosher' },
        { id: 6, name: 'Paleo' },
        { id: 7, name: 'Keto' },
    ];
    const ReligionRestriction = [
        { id: 1, name: 'No Restriction' },
        { id: 2, name: 'Halal' },
        { id: 3, name: 'Hindu' },
        { id: 4, name: 'Buddhist' },
        { id: 5, name: 'jain' },
    ];
    const CostRange = [
        { id: 1, name: 'Budget' },
        { id: 2, name: 'Moderate' },
        { id: 3, name: 'Expensive' },
        { id: 4, name: 'Luxury' },
    ];

    const togglePreference = (id) => {
        setSelectedPreferences((prev) =>
        prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
        );
    };
    const toggleRestriction = (id) => {
        setSelectedRestriction((prev) =>
        prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
        );
    };
    const toggleCostRange = (id) => {
        setSelectedCostRange((prev) => (prev === id ? null : id));
    };
    const toggleSpice = (id) => {
        setSelectedSpice((prev) => (prev === id ? null : id));
    };

    return (
        <View style={styles.filter_container}>
            <View style={styles.food_preference}>
                <Text>Food Preferences</Text>
                <View style={styles.preference_checkbox}>
                    {foodPreferences.map((item,index) => (
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
            <View style={styles.food_preference}>
                <Text>Religion Restriction</Text>
                <View style={styles.preference_checkbox}>
                    {ReligionRestriction.map((item,index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                            styles.food_preference_item,
                            selectedRestriction.includes(item.id) && styles.colorfoodPreference,
                            ]}
                            onPress={() => toggleRestriction(item.id)}
                        >
                            <Text style={styles.food_preference_text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View> 
            </View>
            <View style={styles.horizontal_line} />
            <View style={styles.food_preference}>
                <Text>Cost Range</Text>
                <View style={styles.preference_checkbox}>
                    {CostRange.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.food_preference_item,
                                selectedCostRange === item.id && styles.colorfoodPreference, // Highlight selected item
                            ]}
                            onPress={() => toggleCostRange(item.id)}
                        >
                            <Text style={styles.food_preference_text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.horizontal_line} />
            <View style={styles.food_preference}>
                <Text>Spice Level</Text>
                <View style={[styles.preference_checkbox, {justifyContent: 'center', gap: 20}]}>
                    <Text style={{fontSize: 12, marginTop: 10}}>lowest</Text>
                    {[1, 2, 3, 4, 5].map((level) => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.food_preference_item,
                                selectedSpice === level && styles.colorfoodPreference,
                            ]}
                            onPress={() => toggleSpice(level)}
                        >
                            <Text style={styles.food_preference_text}>{level}</Text>
                        </TouchableOpacity>
                    ))}
                    <Text style={{fontSize: 12, marginTop: 10}}>highest</Text>
                </View>
            </View>
            <View style={styles.horizontal_line} />
            <View style={[styles.food_preference, { gap: 25 }]}>
                <Text>Dietary Restrictions</Text>
                <View style={styles.dietary_restrictions}>
                    <View style={styles.circle} />
                    <View style={styles.line} />
                </View>
                <View style={styles.text_distance}>
                    <Text>1 meter</Text>
                    <Text>Max</Text>
                </View>
            </View>
            <TouchableOpacity onPress={closeFilter}>
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
    dietary_restrictions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'white',
    },
    line: {
        height: 2,
        width: '80%',
        backgroundColor: 'black',
    },
    text_distance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginLeft: 20,
        marginTop: -20,
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