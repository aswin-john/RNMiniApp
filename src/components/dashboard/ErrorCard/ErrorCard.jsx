import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const ErrorCard = ({ title, subtitle, onRetry }) => {
    return (
        <View style={styles.errorCard}>
            <View style={styles.errorHeader}>
                <Text style={styles.errorBadge}>⚠️ ERROR</Text>
            </View>
            <Text style={styles.errorTitle}>{title}</Text>
            <Text style={styles.errorSubtitle}>{subtitle}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                <Text style={styles.retryIcon}>🔄</Text>
                <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
            <View style={styles.cloudIcon}>
                <Text style={styles.cloudEmoji}>☁️</Text>
            </View>
        </View>
    );
};

export default ErrorCard;
