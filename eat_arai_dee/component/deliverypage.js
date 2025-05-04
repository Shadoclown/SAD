import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeliveryPage = ({ route }) => {
  const navigation = useNavigation();
  // You would typically get these details from route params or API
  const { orderItems = [], total = 0 } = route.params || {};

  // This would come from your API or backend
  const estimatedTime = '22 Min';
  const orderId = '#15536';

  const handleBackToHomepage = () => {
    navigation.navigate('Homepage'); // Replace 'Homepage' with your actual homepage route name
  };

  return (
    <SafeAreaView style={styles.container}>
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
        style={styles.backButton}
        onPress={handleBackToHomepage}
      >
        <Text style={styles.backButtonText}>Back to Homepage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#0096c7',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DeliveryPage;
