import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from "./card";
import {supabase} from "./connect";

function Homepage( {userId}) {
  const [selectedFilter, setSelectedFilter] = useState("Individual");
  const [random, setRandom] = useState(false);
  const [israndom, setIsRandom] = useState();

  const [restaurant, setRestaurant] = useState([]);

  const restaurants_more = [
    {
      id: 1,
      image: require("../image/pizza_restuarant.jpg"),
    },
    {
      id: 2,
      image: require("../image/sushi_restuarant.jpg"),
    },
    {
      id: 3,
      image: require("../image/burger_restuarant.jpg"),
    },
    {
      id: 4,
      image: require("../image/burger_restuarant.jpg"),
    },
    {
      id: 5,
      image: require("../image/burger_restuarant.jpg"),
    },
    {
      id: 6,
      image: require("../image/burger_restuarant.jpg"),
    },
    {
      id: 7,
      image: require("../image/burger_restuarant.jpg"),
    },
    {
      id: 8,
      image: require("../image/burger_restuarant.jpg"),
    },
    {
      id: 9,
      image: require("../image/burger_restuarant.jpg"),
    },
    {
      id: 10,
      image: require("../image/burger_restuarant.jpg"),
    }
  ];

  useEffect(() => {
    async function fetchRestaurants() {
        try {
            const isfilter = await AsyncStorage.getItem('isfilter');
            const foodPreferences = JSON.parse(await AsyncStorage.getItem('selectedPreferences')) || [];
            const AllergyInfo = JSON.parse(await AsyncStorage.getItem('selectedAllergies')) || [];
            const CostRange = await AsyncStorage.getItem('selectedCostRange') || "";
            const Spice = await AsyncStorage.getItem('selectedSpice') || "";

            

            let query = supabase
                .from('restaurant')
                .select('*, category(*)');

            if (isfilter === "true") {
                if (Array.isArray(foodPreferences) &&foodPreferences.length > 0) {
                    query = query.contains('category.food_preference', foodPreferences);
                    console.log("contains by foodPreferences:", foodPreferences);
                }
                if (Array.isArray(AllergyInfo) && AllergyInfo.length > 0) {
                    query = query.contains('category.allergy', AllergyInfo);
                    console.log("contains by AllergyInfo:", AllergyInfo);
                }
                if (CostRange !== "") {
                    query = query.eq('price', parseInt(CostRange, 10));
                    console.log("Filtering by CostRange:", CostRange);
                }
                if (Spice !== "") {
                    query = query.eq('spice_level', parseInt(Spice, 10));
                    console.log("Filtering by Spice:", Spice);
                }
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching restaurants:', error);
            } else {
                setRestaurant(data || []);
            }
        } catch (error) {
            console.error('Error in fetchRestaurants:', error);
        }
    }

    fetchRestaurants();
}, []);
  
  
  async function handleRandom() {
    if (!restaurant || restaurant.length === 0) {
        console.error("No restaurants available for random selection.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * restaurant.length);
    setRandom(true);
    setIsRandom(restaurant[randomIndex]);
  }
  
  

  function formatTime(timeString) {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  }  

  function shuffleRecommend() {
    const final_shuffle = [];
    const usedIndices = new Set();

    while (final_shuffle.length < 5 && final_shuffle.length < restaurant.length) {
      const randomIndex = Math.floor(Math.random() * restaurant.length);
      if (!usedIndices.has(randomIndex)) {
        final_shuffle.push(restaurant[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }
    return final_shuffle;
  }

  return (
    <View style={styles.homepage}>
      <View style={styles.tri_icon}>
        <View style={styles.utensil_icon}>
          <Image
            source={require("../image/utensil_icon.png")}
            style={styles.utensil_icon_image}
          />
        </View>
        <View style={styles.chef_icon}>
          <Image
            source={require("../image/chef_icon.png")}
            style={styles.chef_icon_image}
          />
        </View>
        <View style={styles.location_icon}>
          <Image
            source={require("../image/location_icon.png")}
            style={styles.location_icon_image}
          />
        </View>
      </View>

      <View style={styles.name_slogan}>
        <Text style={styles.homepage_name}>Eat Arai Dee</Text>
        <Text style={styles.homepage_slogan}>Let us decide where to eat</Text>
      </View>

      <View style={styles.individual_group_filter}>
        <TouchableOpacity
          style={[
            styles.individual_filter,
            selectedFilter === "Individual" && styles.selected_filter,
          ]}
          onPress={() => setSelectedFilter("Individual")}
        >
          <Text style={styles.filter_text}>Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.group_filter,
            selectedFilter === "Group" && styles.selected_filter,
          ]}
          onPress={() => setSelectedFilter("Group")}
        >
          <Text style={styles.filter_text}>Group</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homepage_random}>
        <TouchableOpacity onPress={() => handleRandom()}>
          <Text style={styles.random_button}>Random Restaurant</Text>
        </TouchableOpacity>
      </View>

      {random == true ? (
        <View style={styles.above_text}>
          <Text style={styles.text_text}>Random Restaurant</Text>
        </View>
      ) : (
        <View style={styles.above_text}>
          <Text style={styles.text_text}>Recommended</Text>
        </View>
      )}

      {random && israndom !== undefined ? (
        <Card
          key={israndom.restaurant_id}
          name={israndom.restaurant_name}
          location={israndom.location}
          rating={israndom.rating}
          price={israndom.price}
          spiceLevel={israndom.spice_level}
          restaurantId={israndom.restaurant_id}
          image={
            restaurants_more.find(
              (item) => item.id === israndom.restaurant_id
            )?.image || require("../image/burger_restuarant.jpg")
          }
          openDay={israndom.open_day}
          openTime={formatTime(israndom.open_time)}
          closeTime={formatTime(israndom.close_time)}
          locationLink={israndom.location_link}
          userId={userId}
        />
      ) : (
        shuffleRecommend().map((restaurant) => (
          <Card
            key={restaurant.restaurant_id}
            name={restaurant.restaurant_name}
            location={restaurant.location}
            rating={restaurant.rating}
            price={restaurant.price}
            spiceLevel={restaurant.spice_level}
            restaurantId={restaurant.restaurant_id}
            image={
              restaurants_more.find(
                (item) => item.id === restaurant.restaurant_id
              )?.image || require("../image/burger_restuarant.jpg")
            }
            openDay={restaurant.open_day}
            openTime={formatTime(restaurant.open_time)}
            closeTime={formatTime(restaurant.close_time)}
            locationLink={restaurant.location_link}
            userId={userId}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    alignItems: "center",
  },
  tri_icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
    height: 100,
  },
  utensil_icon: {
    backgroundColor: "lightblue",
    borderRadius: 50,
    padding: 10,
  },
  chef_icon: {
    backgroundColor: "lightblue",
    borderRadius: 50,
    padding: 10,
    marginBottom: 60,
  },
  location_icon: {
    backgroundColor: "lightblue",
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
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  homepage_name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  homepage_slogan: {
    fontSize: 15,
    color: "gray",
  },
  individual_group_filter: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    padding: 5,
    gap: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "lightgray",
  },
  individual_filter: {
    alignItems: "center",
    width: 110,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  group_filter: {
    alignItems: "center",
    width: 110,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selected_filter: {
    backgroundColor: "white",
    color: "black",
  },
  filter_text: {
    color: "black",
    fontWeight: "bold",
  },
  homepage_random: {
    backgroundColor: "rgb(49, 159, 255)",
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    width: "60%",
  },
  random_button: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  above_text: {
    marginTop: 30,
    marginBottom: -8,
  },
  text_text: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});

export default Homepage;
