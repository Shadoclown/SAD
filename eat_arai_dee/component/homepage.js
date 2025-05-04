import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { supabase } from "./connect";
import { applyFilters } from "./filterUtils";

function Homepage({ navigation, userId, filter_preferences, filter_allergies, filter_costRange, filter_spiceLevel }) {
  const [random, setRandom] = useState(false);
  const [israndom, setIsRandom] = useState();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        let query = supabase.from('restaurant_details_view').select('*');
        query = applyFilters(query, {
          preferences: filter_preferences,
          allergies: filter_allergies,
          costRange: filter_costRange,
          spiceLevel: filter_spiceLevel
        });

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching restaurants:', error);
        } else {
          setRestaurant(data);
        }
      } catch (error) {
        console.error('Error in fetchRestaurants:', error);
      }
    }

    fetchRestaurants();
  }, [userId, filter_preferences, filter_allergies, filter_costRange, filter_spiceLevel]);
  
  async function handleRandom() {
    if (!restaurant || restaurant.length === 0) {
      console.error("No restaurants available for random selection.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * restaurant.length);
    setRandom(true);
    setIsRandom(restaurant[randomIndex]);
    console.log("Random restaurant selected:", restaurant[randomIndex]);
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
    <ScrollView>
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
          <>
            <Card
              key={israndom.restaurant_id}
              name={israndom.restaurant_name}
              location={israndom.location}
              rating={israndom.rating}
              price={israndom.price}
              spiceLevel={israndom.spice_level}
              restaurantId={israndom.restaurant_id}
              restaurant_image={israndom.image}
              openDay={israndom.open_day}
              openTime={formatTime(israndom.open_time)}
              closeTime={formatTime(israndom.close_time)}
              locationLink={israndom.location_link}
              foodPreference={israndom.food_preference}
              userId={userId}
            />
          </>
        ) : (
          shuffleRecommend().map((restaurant, index) => (
            <Card
              key={`${restaurant.restaurant_id}-${index}`} // Ensure a unique key
              name={restaurant.restaurant_name}
              location={restaurant.location}
              rating={restaurant.rating}
              price={restaurant.price}
              spiceLevel={restaurant.spice_level}
              restaurantId={restaurant.restaurant_id}
              restaurant_image={restaurant.image}
              openDay={restaurant.open_day}
              openTime={formatTime(restaurant.open_time)}
              closeTime={formatTime(restaurant.close_time)}
              locationLink={restaurant.location_link}
              foodPreference={restaurant.food_preference}
              userId={userId}
            />
          ))
        )}
      </View>
    </ScrollView>
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
