import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

function Card({ name, distance, rating, price, spiceLevel, category, image }) {
    const [ViewMore, setViewMore] = useState(false);
    const [ViewDetail, setViewDetail] = useState("detail");

    return (
        <View style={styles.card_container}>
            <View style={[styles.card_content, ViewMore && styles.card_content_expanded]}>
                <View style={styles.card_image}>
                    <Image source={image} style={styles.card_resturant_image} />
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
                    <Text>Distance: {distance}</Text>
                    <View style={styles.price_range}>
                        {Array.from({ length: price.length }, (_, index) => (
                            <Image
                                key={index}
                                source={require('../image/price_range_icon.png')}
                                style={styles.price_range_icon}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.card_spice_level}>
                    <Text style={styles.spice_text}>Spice Level</Text>
                    <View style={styles.level}>
                        {Array.from({ length: spiceLevel }, (_, index) => (
                            <Image
                                key={index}
                                source={require('../image/spice_level_icon.png')}
                                style={styles.spice_level_icon}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.card_category}>
                    <View style={styles.category}>
                        {category.map((item, index) => (
                            <Text key={index} style={styles.category_item}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View>

                {ViewMore && (
                    ViewDetail === "detail" ? (
                        <View style={styles.view_more_detail}>
                            <View style={styles.horizontal_line} />
                            <Text style={styles.location_text}>Location</Text>
                            <Image 
                                source={require('../image/location.jpg')} 
                                style={styles.location_image} 
                            />
                        </View>
                    ) : null
                )}

                {ViewMore && (
                    <View style={[styles.horizontal_line]} />
                )}
                {ViewMore && (
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
                )}

                <View style={styles.view_detail}>
                    <TouchableOpacity
                        style={styles.view_detail_button}
                        onPress={() => setViewMore(!ViewMore)} // Toggle the expanded state
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
        backgroundColor: '#f0f0f0',
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
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    menu_button: {
        backgroundColor: 'blue',
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
});

export default Card;