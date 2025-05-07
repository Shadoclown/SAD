import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './connect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractLatLng, calculateDeliveryTime } from '../utils/locationUtils';

const DeliveryPage = ({ route }) => {
  const navigation = useNavigation();
  const { orderItems = [], total = 0, restaurantId, locationLink, Userlatitude, Userlongitude } = route.params || {};
  const [isHistoryRecorded, setIsHistoryRecorded] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [status, setStatus] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasAlerted, setHasAlerted] = useState(false);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);

  useEffect(() => {
    if (locationLink && Userlatitude && Userlongitude) {
      const coords = extractLatLng(locationLink);
      if (coords) {
        const restaurantCoords = {
          latitude: coords.lat,
          longitude: coords.lng
        };
        const userCoords = {
          latitude: Userlatitude,
          longitude: Userlongitude
        };
        
        const deliveryTime = calculateDeliveryTime(restaurantCoords, userCoords);
        setEstimatedMinutes(deliveryTime);
        setTimeLeft(deliveryTime * 60); // Convert minutes to seconds for countdown
        
        // Log the calculated time for debugging
        console.log(`Estimated delivery time: ${deliveryTime} minutes`);
        console.log(`Distance calculation params:`, {
          restaurant: restaurantCoords,
          user: userCoords
        });
      }
    }
  }, [locationLink, Userlatitude, Userlongitude]);

  const estimatedTime = `${estimatedMinutes} Min`;
  const orderId = '#15536';

  const stageOneTime = timeLeft * 0.4; // 40% of total time for preparation
  const stageTwoTime = timeLeft * 0.6; // 60% of total time for delivery

  // Get initial user ID and status
  useEffect(() => {
    const initializeData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
          const { data } = await supabase
            .from('user')
            .select('order_status')
            .eq('user_id', id)
            .single();
          if (data) {
            setStatus(data.order_status);
          }
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
    initializeData();
  }, []);

  // Timer effect
  useEffect(() => {
    if (!UserId) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        if (newTime <= stageOneTime) {
          setCurrentStage(2);
        } else if (newTime <= stageTwoTime) {
          setCurrentStage(1);
        }

        return newTime > 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [UserId]);

  // Separate effect for handling order completion
  useEffect(() => {
    const handleOrderCompletion = async () => {
      if (timeLeft <= 0 && !hasAlerted && UserId) {
        await updateOrderStatus();
        setHasAlerted(true);
        Alert.alert("Order Status", "Your order has been delivered!");
      }
    };

    handleOrderCompletion();
  }, [timeLeft, hasAlerted, UserId]);

  const updateOrderStatus = async () => {
    if (!UserId) return;
    
    try {
      await supabase
        .from('user')
        .update({ order_status: false })
        .eq('user_id', UserId)
        .single();
      
      const { data } = await supabase
        .from('user')
        .select('order_status')
        .eq('user_id', UserId)
        .single();
      
      if (data) {
        setStatus(data.order_status);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const recordHistory = async () => {
      if (restaurantId && !isHistoryRecorded) {
        try {
          const userId = await AsyncStorage.getItem('userId');
          
          if (!userId) {
            console.error('User ID not found');
            return;
          }
          
          const { data, error } = await supabase.from("history").insert([
            {
              user_id: parseInt(userId),
              restaurant_id: restaurantId,
              time: new Date().toISOString(),
            }
          ]);

          if (error) {
            console.error('Error recording history:', error);
            Alert.alert("History Error", "There was an error recording your order history.");
          } else {
            setIsHistoryRecorded(true);
          }
        } catch (error) {
          console.error('Error in recordHistory:', error);
          Alert.alert("History Error", "There was an error recording your order history.");
        }
      }
    };

    recordHistory();
  }, [restaurantId, isHistoryRecorded]);

  useEffect(() => {
    if (locationLink) {
      const coords = extractLatLng(locationLink);
      if (coords) {
        console.log(`Restaurant ID: ${restaurantId}`);
        console.log(`Latitude: ${coords.lat}`);
        console.log(`Longitude: ${coords.lng}`);
        console.log(`User Latitude: ${Userlatitude}`);
        console.log(`User Longitude: ${Userlongitude}`);
      } else {
        console.error('Could not extract coordinates from location link');
      }
    }
  }, [locationLink, restaurantId]);

  const handleBackToHomepage = () => {
    navigation.navigate('Homepage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => !status ? navigation.goBack() : Alert.alert("Order Status", "You have to finish your order first!")} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.restaurantText}>Restaurant</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Order Placed Successfully</Text>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.timerText}>Estimated Time: {formatTime(timeLeft)}</Text>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressStage, { flex: 0.25, backgroundColor: currentStage >= 0 ? '#4CAF50' : '#E0E0E0' }]} />
            <View style={[styles.progressStage, { flex: 0.5, backgroundColor: currentStage >= 1 ? '#4CAF50' : '#E0E0E0' }]} />
            <View style={[styles.progressStage, { flex: 0.25, backgroundColor: currentStage >= 2 ? '#4CAF50' : '#E0E0E0' }]} />
          </View>
          
          <View style={styles.stageLabels}>
            <Text style={[styles.stageText, currentStage === 0 && styles.activeStage]}>In Progress</Text>
            <Text style={[styles.stageText, currentStage === 1 && styles.activeStage]}>Making Dishes</Text>
            <Text style={[styles.stageText, currentStage === 2 && styles.activeStage]}>Delivery</Text>
          </View>
        </View>

        <View style={styles.deliveryInfoContainer}>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.orderIdText}>Order ID</Text>
          </View>

          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryTimeText}>{estimatedTime}</Text>
            <Text style={styles.orderIdValue}>{orderId}</Text>
          </View>
        </View>

        <View style={styles.orderSummaryContainer}>
          <Text style={styles.orderSummaryTitle}>Order Summary</Text>
          
          {orderItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.orderItemQuantity}>{item.quantity}x</Text>
              <Text style={styles.orderItemName}>{item.name}</Text>
              <Text style={styles.orderItemPrice}>{item.price}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.homeButton}
        onPress={() => !status ? handleBackToHomepage() : Alert.alert("Order Status", "You have to finish your order first!")}>
        <Text style={styles.homeButtonText}>Back to Homepage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    padding: 15,
  },
  restaurantText: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  successContainer: {
    backgroundColor: '#0096c7',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  successTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 15,
    borderRadius: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressStage: {
    height: '100%',
    marginHorizontal: 1,
  },
  stageLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stageText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    flex: 1,
  },
  activeStage: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  deliveryInfoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  deliveryLabel: {
    fontSize: 16,
    color: '#333',
  },
  orderIdText: {
    fontSize: 14,
    color: '#333',
  },
  deliveryTimeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderIdValue: {
    fontSize: 14,
    color: '#666',
  },
  orderSummaryContainer: {
    backgroundColor: '#fffae6',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  orderItemQuantity: {
    width: '10%',
    fontSize: 16,
  },
  orderItemName: {
    width: '70%',
    fontSize: 16,
  },
  orderItemPrice: {
    width: '20%',
    fontSize: 16,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DeliveryPage;
