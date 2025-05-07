import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { supabase } from "./connect";
import { applyFilters } from "./filterUtils";

function Homepage({ navigation, userId, filter_preferences, filter_allergies, filter_costRange, filter_spiceLevel }) {
  const [random, setRandom] = useState(false);
  const [israndom, setIsRandom] = useState();
  const [restaurant, setRestaurant] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

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
          setFilteredRestaurants(data);
        }
      } catch (error) {
        console.error('Error in fetchRestaurants:', error);
      }
    }

    // Fetch all menu items for searching
    async function fetchMenuItems() {
      try {
        const { data, error } = await supabase
          .from('menu')
          .select('menu_id, menu_name, restaurant_id');

        if (error) {
          console.error('Error fetching menu items:', error);
        } else {
          setMenuItems(data || []);
        }
      } catch (error) {
        console.error('Error in fetchMenuItems:', error);
      }
    }

    fetchRestaurants();
    fetchMenuItems();
  }, [userId, filter_preferences, filter_allergies, filter_costRange, filter_spiceLevel]);
  
  // Search functionality - now includes menu items
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRestaurants(restaurant);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      
      // First, find restaurants by name
      const restaurantResults = restaurant.filter(item => 
        item.restaurant_name.toLowerCase().includes(lowercaseQuery)
      );
      
      // Then, find restaurants by menu items
      const matchingMenuItems = menuItems.filter(item =>
        item.menu_name.toLowerCase().includes(lowercaseQuery)
      );
      
      // Get unique restaurant IDs from matching menu items
      const matchingRestaurantIds = [...new Set(matchingMenuItems.map(item => item.restaurant_id))];
      
      // Find restaurants by these IDs
      const menuMatchedRestaurants = restaurant.filter(item =>
        matchingRestaurantIds.includes(item.restaurant_id)
      );
      
      // Combine both results and remove duplicates
      const combinedResults = [...restaurantResults];
      
      menuMatchedRestaurants.forEach(item => {
        if (!combinedResults.some(r => r.restaurant_id === item.restaurant_id)) {
          combinedResults.push(item);
        }
      });
      
      setFilteredRestaurants(combinedResults);
    }
    // When searching, disable random selection mode
    if (searchQuery.trim() !== '') {
      setRandom(false);
    }
  }, [searchQuery, restaurant, menuItems]);

  async function handleRandom() {
    if (!restaurant || restaurant.length === 0) {
      console.error("No restaurants available for random selection.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * restaurant.length);
    setRandom(true);
    setIsRandom(restaurant[randomIndex]);
    setSearchQuery(''); // Clear search when using random
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
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

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

        {random ? (
          <View style={styles.above_text}>
            <Text style={styles.text_text}>Random Restaurant</Text>
          </View>
        ) : searchQuery.trim() !== '' ? (
          <View style={styles.above_text}>
            <Text style={styles.text_text}>Search Results</Text>
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
          filteredRestaurants.map((restaurant, index) => (
            <Card
              key={`${restaurant.restaurant_id}-${index}`}
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
    backgroundColor: '#f0f8ff',
  },
  searchContainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    backgroundColor: "#3498db",
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  chef_icon: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    padding: 12,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  location_icon: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  utensil_icon_image: {
    width: 35,
    height: 35,
    tintColor: '#fff',
  },
  chef_icon_image: {
    width: 35,
    height: 35,
    tintColor: '#fff',
  },
  location_icon_image: {
    width: 35,
    height: 35,
    tintColor: '#fff',
  },
  name_slogan: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  homepage_name: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#2c3e50',
  },
  homepage_slogan: {
    fontSize: 16,
    color: "#666",
  },
  homepage_random: {
    backgroundColor: "#ff9900",
    alignItems: "center",
    marginTop: 30,
    padding: 18,
    borderRadius: 15,
    width: "60%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  }
});

export default Homepage;
