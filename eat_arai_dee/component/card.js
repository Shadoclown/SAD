import { StyleSheet, Text, View, Image } from 'react-native';

function Card() {
    return (
        <View style={styles.card_container} >
            <View style={styles.card_content}>

                <View style={styles.card_image}>

                </View>

                <View style={styles.card_name_rating}>

                </View>

                <View style={styles.distance_price}>

                </View>

                <View style={styles.card_spice_level}>

                </View>

                <View style={styles.card_category}>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card_container: {
        alignItems: 'center',
    },
    card_content: {
        width: '90%',
        height: '100%',
        backgroundColor: 'white',
    }
});

export default Card;