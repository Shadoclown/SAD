import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from './connect'; // Ensure Supabase is properly imported
import { userId } from './login'; // Ensure userId is properly imported or passed as a prop

function Card({ name, location, rating, price, spiceLevel, restaurantId, image, openDay, openTime, closeTime, locationLink, userId }) {
    const [ViewMore, setViewMore] = useState(false);
    const [ViewDetail, setViewDetail] = useState("detail");
    const [isLogin, setisLogin]  = useState(false);
    const [Menu, setMenu] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        async function fetchMenu() {
            const { data, error } = await supabase.from("menu").select("*");
            const { data: cate, error: categoryError } = await supabase
                .from("category")
                .select("*")
                .eq("restaurant_id", restaurantId);

            if (error) {
                console.error("Error fetching menu:", error.message);
            } else {
                setMenu(data);
            }

            if (categoryError) {
                console.error("Error fetching category:", categoryError.message);
            } else {
                setCategory(cate);
            }
        }

        fetchMenu();
    }, []);

    useEffect(() => {
        if (userId != null) {
            setisLogin(true);
        } else {
            setisLogin(false);
        }
    }, [userId]);

    const handleLink = (link) => {
        Linking.openURL(locationLink);
    };

    async function AddHistry() {
        const now = new Date();
        const currentTimeData = now.toISOString();
        if (!userId) {
            Alert.alert('Error', 'Please Login.');
            return;
        } else {
            const { data, error } = await supabase.from("history").insert([
                {
                    // time: currentTimeData,
                    user_id: parseInt(userId),
                    restaurant_id: restaurantId,
                },
            ]);
        }
    }

    return (
        <View style={styles.card_container}>
            <View style={[styles.card_content, ViewMore && styles.card_content_expanded]}>
                <View style={styles.card_image}>
                    {image ? (
                        <Image source={image} style={styles.card_resturant_image} />
                    ) : (
                        <View style={styles.placeholder_image}>
                            <Text style={styles.placeholder_text}>No Image Available</Text>
                        </View>
                    )}
                </View>

                <View style={styles.card_name_rating}>
                    <Text style={styles.restuarant_name}>{name}</Text>
                    <View style={styles.star_rating}>
                        <Image
                            source={require('../image/rating_star_icon.png')}
                            style={styles.rating_star}
                        />
                        <Text style={styles.restuarant_rating}>{rating}</Text>
                    </View>
                </View>

                <View style={styles.horizontal_line} />

                <View style={styles.distance_price}>
                    <View style={styles.price_range}>
                        <Text>{location}</Text>
                    </View>
                </View>

                <View style={styles.card_spice_level}>
                    <Text style={styles.spice_text}>Spice Level</Text>
                    <View style={styles.level}>
                        <Text>{spiceLevel}</Text>
                    </View>
                </View>

                <View style={styles.card_category}>
                    <View style={styles.category}>
                        {category && category.length > 0 ? (
                            category
                                .filter((item) => item.restaurant_id === restaurantId) // Filter by restaurant ID
                                .flatMap((item) => {
                                    try {
                                        return JSON.parse(item.food_preference); // Parse the food_preference JSON string
                                    } catch (error) {
                                        console.error("Invalid JSON in food_preference:", item.food_preference, error);
                                        return []; // Return an empty array if parsing fails
                                    }
                                })
                                .map((preference, index) => (
                                    <Text key={`preference-${index}`} style={styles.category_item}>
                                        {preference}
                                    </Text>
                                ))
                        ) : (
                            <Text style={styles.additional_text}>No categories available</Text>
                        )}
                    </View>
                </View>

                {ViewMore && (
                    <View style={styles.view_more_detail}>
                        <View style={styles.horizontal_line} />
                        {ViewDetail === "menu" ? (
                            <>
                                <Text style={styles.menu_text}>Recommended Menu</Text>
                                {Menu.filter((item) => item.restaurant_id === restaurantId)
                                    .map((item) => (
                                        <View key={item.menu_id} style={styles.menu_item}>
                                            <Image
                                                source={{ uri: 'https://via.placeholder.com/50' }}
                                                style={styles.menu_item_image}
                                            />
                                            <View style={styles.menu_item_details}>
                                                <Text style={styles.menu_item_name}>{item.menu_name}</Text>
                                                <Text style={styles.menu_item_price}>฿{item.price}</Text>
                                            </View>
                                        </View>
                                    ))}
                            </>
                        ) : (
                            <View>
                                <View>
                                    <Text style={styles.location_text}>Open Period</Text>
                                    <Text>{openDay}</Text>
                                </View>
                                <View>
                                    <Text style={styles.location_text}>Time Period</Text>
                                    <Text>{openTime} - {closeTime}</Text>
                                </View>
                                <View>
                                    <Text style={styles.location_text}>Google Map</Text>
                                    <TouchableOpacity onPress={() => handleLink(locationLink)}>
                                        <Text style={styles.linkText}>View More</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        <View style={[styles.horizontal_line]} />
                        <View style={styles.detail_menu_button}>
                            <TouchableOpacity
                                style={styles.detail_button}
                                onPress={() => setViewDetail("detail")}
                            >
                                <Text style={styles.detail_button_text}>Detail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menu_button}
                                onPress={() => setViewDetail("menu")}
                            >
                                <Text style={styles.menu_button_text}>Menu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.view_detail}>
                    <TouchableOpacity
                        style={styles.view_detail_button}
                        onPress={() => {
                            if (isLogin) {
                                AddHistry();
                                setViewMore(!ViewMore);
                                setViewDetail("detail");
                            } else {
                                Alert.alert('Error', 'You must be logged in to view more details.');
                            }
                        }}
                    >
                        <Text style={styles.view_detail_text}>
                            {ViewMore ? 'Hide Details' : 'View Details'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card_container: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    card_content: {
        width: '80%',
        minHeight: 200,
        height: 'auto',
        paddingBottom: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    horizontal_line: {
        width: '95%',
        height: 1,
        backgroundColor: '#ccc',
    },
    card_image: {
        width: '100%',
        height: 250,
    },
    card_resturant_image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    placeholder_image: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    placeholder_text: {
        color: '#888',
        fontSize: 16,
    },
    card_name_rating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    restuarant_name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    restuarant_rating: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    star_rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating_star: {
        width: 25,
        height: 25,
        marginBottom: 2,
    },
    distance_price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    price_range: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price_range_icon: {
        width: 20,
        height: 20,
    },
    card_spice_level: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    spice_text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    level: {
        flexDirection: 'row',
    },
    spice_level_icon: {
        width: 20,
        height: 20,
        marginHorizontal: 3,
    },
    card_category: {
        padding: 10,
    },
    category: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    category_item: {
        backgroundColor: 'rgb(200, 200, 200)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
    },
    additional_text: {
        fontSize: 14,
        color: '#555',
    },
    view_detail: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    view_detail_button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    view_detail_text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    view_more_detail: {
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    location_text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
    },
    location_image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        borderColor: 'rgb(206, 206, 206)',
        borderWidth: 3,
    },
    detail_menu_button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    detail_button: {
        backgroundColor: "rgb(49, 159, 255)",
        padding: 10,
        borderRadius: 5,
    },
    menu_button: {
        backgroundColor: "rgb(49, 159, 255)",
        padding: 10,
        borderRadius: 5,
    },
    detail_button_text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menu_button_text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menu_text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    menu_item: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    menu_item_image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    menu_item_details: {
        flex: 1,
    },
    menu_item_name: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    menu_item_description: {
        fontSize: 12,
        color: '#555',
    },
    menu_item_price: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Card;