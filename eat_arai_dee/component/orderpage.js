import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, Animated } from 'react-native';
import { supabase } from './connect';

const OrderPage = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const { restaurantId, restaurantName, restaurantImage } = route.params || {};
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (restaurantId) {
        try {
          // Fetch menu items from Supabase
          const { data, error } = await supabase
            .from('menu')
            .select('*')
            .eq('restaurant_id', restaurantId);

          if (error) {
            console.error('Error fetching menu:', error);
            setMenuItems([]);
          } else {
            setMenuItems(data || []);
          }
        } catch (error) {
          console.error('Error:', error);
          setMenuItems([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Fallback to sample data
        setMenuItems([
          {
            id: '1',
            name: 'Omelette',
            description: 'With Minced Pork',
            price: 125,
            image: require('../image/burger_restuarant.jpg'),
          },
          {
            id: '2',
            name: 'Omelette',
            description: 'With Minced Pork',
            price: 125,
            image: require('../image/burger_restuarant.jpg'),
          },
          {
            id: '3',
            name: 'Omelette',
            description: 'With Minced Pork', 
            price: 125,
            image: require('../image/burger_restuarant.jpg'),
          },
        ]);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const showPopupNotification = (text) => {
    setNotificationText(text);
    setShowNotification(true);
    
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    // Automatically hide after 2 seconds
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setShowNotification(false);
      });
    }, 2000);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        cartItem => (cartItem.id || cartItem.menu_id) === (item.id || item.menu_id)
      );

      if (existingItem) {
        // If item exists, increase its quantity
        return prevItems.map(cartItem =>
          (cartItem.id || cartItem.menu_id) === (item.id || item.menu_id)
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    // Show custom notification
    showPopupNotification(`${item.name || item.menu_name} added to cart`);
  };

  const goToCart = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart first");
      return;
    }
    
    console.log("Navigating to cart with restaurant ID:", restaurantId);
    
    // Navigate to Cart page with items
    navigation.navigate('Cart', { 
      cartItems,
      restaurantName: restaurantName || 'Restaurant',
      restaurantId: restaurantId  // Ensure restaurantId is passed
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        
        <View style={styles.restaurantBanner}>
          <Image
            source={restaurantImage ? { uri: restaurantImage } : require('../image/california_roll.jpg')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <Text style={styles.restaurantName}>{restaurantName || "Restaurant"}</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading menu items...</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.menuContainer}>
            {menuItems.map((item) => (
              <View key={item.id || item.menu_id} style={styles.menuItem}>
                <Image 
                  source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                  style={styles.menuItemImage} 
                />
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.name || item.menu_name}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                  <Text style={styles.menuItemPrice}>{item.price} ฿</Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.cartButton} onPress={goToCart}>
            <Text style={styles.cartButtonText}>
              View Cart ({cartItems.length} items)
            </Text>
          </TouchableOpacity>
        </>
      )}

      {showNotification && (
        <Animated.View 
          style={[
            styles.notificationContainer, 
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.notificationText}>{notificationText}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 16,
    color: '#666',
    padding: 10,
  },
  restaurantBanner: {
    position: 'relative',
    height: 150,
    borderRadius: 15,
    margin: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0095DA',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  restaurantName: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  menuContainer: {
    flex: 1,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  menuItemInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#0095DA',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#0095DA',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  notificationContainer: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#3498db',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    zIndex: 1000,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OrderPage;
