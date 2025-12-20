import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const MenuCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.menuCard}
            onPress={onPress}>
            <LinearGradient
                colors={item.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuCardGradient}>
                <Text style={styles.menuCardIcon}>{item.icon}</Text>
            </LinearGradient>
            <Text style={styles.menuCardTitle}>{item.title}</Text>
            <Text style={styles.menuCardSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
    );
};

export default MenuCard;
