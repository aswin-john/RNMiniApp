import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const EmptyState = ({ message = 'No data available', emoji = '📭' }) => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>{emoji}</Text>
            <Text style={styles.emptyText}>{message}</Text>
        </View>
    );
};

export default EmptyState;
