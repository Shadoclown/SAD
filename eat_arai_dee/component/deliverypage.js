import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './connect';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryPage = ({ route }) => {
  const navigation = useNavigation();
  // Get order details from route params
  const { orderItems = [], total = 0, restaurantId } = route.params || {};
  const [isHistoryRecorded, setIsHistoryRecorded] = useState(false);

  // This would come from your API or backend
  const estimatedTime = '22 Min';
  const orderId = '#15536';

  useEffect(() => {
    // Record the order in history when component mounts
    const recordHistory = async () => {
      if (restaurantId && !isHistoryRecorded) {
        try {
          console.log("Recording history for restaurant ID:", restaurantId);
          const userId = await AsyncStorage.getItem('userId');
          
          if (!userId) {
            console.error('User ID not found');
            return;
          }

          console.log("Recording history with user ID:", userId);
          
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
            console.log('Order history recorded successfully');
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

  const handleBackToHomepage = () => {
    navigation.navigate('Homepage'); // Replace 'Homepage' with your actual homepage route name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
        onPress={handleBackToHomepage}
      >
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
    backgroundColor: '#ffffff',
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
