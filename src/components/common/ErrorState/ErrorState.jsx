import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const ErrorState = ({ title = 'Connection Error', message, onRetry, iconName = 'alert-circle-outline' }) => {
    return (
        <View style={styles.centerContainer}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <View style={styles.errorContainer}>
                <Icon name={iconName} size={64} color={COLORS.error} style={{ marginBottom: 15 }} />
                <Text style={styles.errorTitle}>{title}</Text>
                <Text style={styles.errorMessage}>{message}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Icon name="refresh-outline" size={18} color={COLORS.text} style={{ marginRight: 8 }} />
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ErrorState;
