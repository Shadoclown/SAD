import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';

const Cart = ({ navigation, route }) => {
  const { cartItems: initialCartItems = [], restaurantId } = route.params || {};
  const [orderItems, setOrderItems] = useState(initialCartItems);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [itemToRemove, setItemToRemove] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      const itemToBeRemoved = orderItems.find(item => 
        (item.id || item.menu_id) === id
      );
      
      setItemToRemove(itemToBeRemoved);
      setConfirmationVisible(true);
    } else {
      setOrderItems(prevItems => 
        prevItems.map(item => 
          (item.id || item.menu_id) === id
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
    }
  };
  
  const confirmRemoveItem = () => {
    if (itemToRemove) {
      setOrderItems(prevItems => 
        prevItems.filter(item => 
          (item.id || item.menu_id) !== (itemToRemove.id || itemToRemove.menu_id)
        )
      );
    }
    
    hideConfirmation();
  };
  
  const hideConfirmation = () => {
    setConfirmationVisible(false);
    setItemToRemove(null);
  };
  
  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = item.quantity || 1;
      return sum + (itemPrice * itemQuantity);
    }, 0);
  };
  
  const handleConfirmOrder = () => {
    console.log('Order confirmed!', { orderItems, specialInstructions, total: calculateTotal(), restaurantId });
    
    navigation.navigate('DeliveryPage', {
      orderItems, 
      total: calculateTotal(),
      specialInstructions,
      restaurantId: restaurantId
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cartHeader}>Your Order</Text>
      
      {orderItems.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>Your cart is empty</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {orderItems.map(item => (
            <View key={item.id || item.menu_id} style={styles.orderItemContainer}>
              <View style={styles.orderItem}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name || item.menu_name}</Text>
                  <Text style={styles.itemPrice}>฿{item.price * (item.quantity || 1)}</Text>
                </View>
                <View style={styles.quantityControl}>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id || item.menu_id, (item.quantity || 1) - 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity || 1}</Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id || item.menu_id, (item.quantity || 1) + 1)}
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
        </ScrollView>
      )}
      
      <View style={styles.footer}>
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
      </View>
      
      {confirmationVisible && (
        <View style={styles.confirmationPanel}>
          <Text style={styles.confirmationText}>
            Remove item from cart?
          </Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity 
              style={[styles.confirmationButton, styles.cancelButton]} 
              onPress={hideConfirmation}
            >
              <Text style={[styles.confirmationButtonText, {color: '#333'}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.confirmationButton, styles.removeButton]} 
              onPress={confirmRemoveItem}
            >
              <Text style={styles.confirmationButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  cartHeader: {
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    padding: 15,
  },
  orderItemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemDetails: {
    flex: 1,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  confirmationPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  confirmationButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  removeButton: {
    backgroundColor: '#ff5252',
  },
  confirmationButtonText: {
    fontWeight: '600',
    fontSize: 15,
    color: 'white',
  },
});

export default Cart;
