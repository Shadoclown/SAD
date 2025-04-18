import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Card from './card';

function Homepage() {
    const restaurants = [
        {
            id: 1,
            name: 'Pizza Restaurant',
            distance: '2.5 km',
            rating: 4.5,
            price: '$$$',
            spiceLevel: 3,
            category: ['Pizza', 'Italian', 'Fast Food'],
            image: require('../image/pizza_restuarant.jpg'),
        },
        {
            id: 2,
            name: 'Sushi Place',
            distance: '1.2 km',
            rating: 4.8,
            price: '$$$$',
            spiceLevel: 1,
            category: ['Sushi', 'Japanese'],
            image: require('../image/sushi_restuarant.jpg'),
        },
        {
            id: 3,
            name: 'Burger Joint',
            distance: '3.0 km',
            rating: 4.2,
            price: '$$',
            spiceLevel: 2,
            category: ['Burgers', 'Fast Food'],
            image: require('../image/burger_restuarant.jpg'),
        },
    ];

    return (
        <View style={styles.homepage}>
            <View style={styles.tri_icon}>
                <View style={styles.utensil_icon}>
                    <Image source={require('../image/utensil_icon.png')} style={styles.utensil_icon_image} />
                </View>
                <View style={styles.chef_icon}>
                    <Image source={require('../image/chef_icon.png')} style={styles.chef_icon_image} />
                </View>
                <View style={styles.location_icon}>
                    <Image source={require('../image/location_icon.png')} style={styles.location_icon_image} />
                </View>
            </View>

            <View style={styles.name_slogan}>
                <Text style={styles.homepage_name}>Eat Arai Dee</Text>
                <Text style={styles.homepage_slogan}>Let us decide where to eat</Text>
            </View>

            <View style={styles.individual_group_filter}>
                <View style={styles.individual_filter}>
                    <Text style={styles.filter_text}>Individual</Text>
                </View>
                <View style={styles.group_filter}>
                    <Text style={styles.filter_text}>Group</Text>
                </View>
            </View>

            <View style={styles.homepage_random}>
                <Text style={styles.random_button}>Random Restaurant</Text>
            </View>

            <Text style={{fontSize:30, marginTop:20, fontWeight:'bold' }}>Recommendation</Text>

            {restaurants.map((restaurant) => (
                <Card
                    key={restaurant.id}
                    name={restaurant.name}
                    distance={restaurant.distance}
                    rating={restaurant.rating}
                    price={restaurant.price}
                    spiceLevel={restaurant.spiceLevel}
                    category={restaurant.category}
                    image={restaurant.image}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    homepage: {
        flex: 1,
        alignItems: 'center',
    },
    tri_icon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginTop: 40,
        height: 100,
    },
    utensil_icon: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        padding: 10,
    },
    chef_icon: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        padding: 10,
        marginBottom: 60,
    },
    location_icon: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        padding: 10,
    },
    utensil_icon_image: {
        width: 35,
        height: 35,
    },
    chef_icon_image: {
        width: 35,
        height: 35,
    },
    location_icon_image: {
        width: 35,
        height: 35,
    },
    name_slogan: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    homepage_name: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    homepage_slogan: {
        fontSize: 15,
        color: 'gray',
    },
    individual_group_filter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        padding: 5,
        gap: 5,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'lightgray',
    },
    individual_filter: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: 110,
        paddingBlock: 15,
        paddingInline: 20,
        borderRadius: 10,
    },
    group_filter: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: 110,
        paddingBlock: 15,
        paddingInline: 20,
        borderRadius: 10,
    },
    filter_text: {
        color: 'blue',
        fontWeight: 'bold',
    },
    homepage_random: {
        backgroundColor: 'rgb(49, 159, 255)',
        alignItems: 'center',
        marginTop: 30,
        padding: 20,
        borderRadius: 15,
        width: '60%',
    },
    random_button: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Homepage;