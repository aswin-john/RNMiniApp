import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const ScreenHeader = ({ title, onBack }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={onBack}>
                <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.placeholder} />
        </View>
    );
};

export default ScreenHeader;
