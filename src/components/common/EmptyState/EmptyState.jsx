import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const EmptyState = ({ message = 'No data available', iconName = 'archive-outline' }) => {
    return (
        <View style={styles.emptyContainer}>
            <Icon name={iconName} size={64} color={COLORS.textMuted} style={{ marginBottom: 15 }} />
            <Text style={styles.emptyText}>{message}</Text>
        </View>
    );
};

export default EmptyState;
