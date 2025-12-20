import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const ErrorState = ({ title = 'Connection Error', message, onRetry, emoji = '📡' }) => {
    return (
        <View style={styles.centerContainer}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <View style={styles.errorContainer}>
                <Text style={styles.errorEmoji}>{emoji}</Text>
                <Text style={styles.errorTitle}>{title}</Text>
                <Text style={styles.errorMessage}>{message}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryButtonText}>🔄 Retry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ErrorState;
