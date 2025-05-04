import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';

const Cart = ({ navigation }) => {
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: 'Omelette',
      price: 125,
      quantity: 1
    }
  ]);
  
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setOrderItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const handleConfirmOrder = () => {
    console.log('Order confirmed!', { orderItems, specialInstructions, total: calculateTotal() });
    // Navigate to the DeliveryPage with order details
    navigation.navigate('DeliveryPage', {
      orderItems, 
      total: calculateTotal(),
      specialInstructions
    });
  };

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartHeader}>Your Order</Text>
      
      {orderItems.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          {orderItems.map(item => (
            <View key={item.id} style={styles.orderItemContainer}>
              <View style={styles.orderItem}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>฿{item.price}</Text>
                </View>
                <View style={styles.quantityControl}>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={[
                      styles.quantityButton, 
                      item.quantity <= 1 && styles.quantityButtonDisabled
                    ]}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          
          <View style={styles.specialInstructionsContainer}>
            <TextInput 
              style={styles.specialInstructionsTextArea}
              placeholder="Special Instructions"
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              multiline
            />
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>฿{calculateTotal()}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirmOrder}
          >
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    maxWidth: 400,
    margin: 'auto',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80vh',
  },
  
  cartHeader: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  orderItemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  orderItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  
  itemName: {
    fontSize: 17,
    fontWeight: '500',
  },
  
  itemPrice: {
    color: '#777',
    fontSize: 14,
  },
  
  quantityControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#0096c7',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  quantityButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
  },
  
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  
  specialInstructionsContainer: {
    marginBottom: 20,
  },
  
  specialInstructionsTextArea: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: 'inherit',
    backgroundColor: '#f8f9fa',
  },
  
  totalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  
  confirmButton: {
    backgroundColor: '#0096c7',
    borderRadius: 10,
    padding: 16,
    marginTop: 'auto',
    shadowColor: 'rgba(0, 150, 199, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  
  emptyStateText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Cart;
