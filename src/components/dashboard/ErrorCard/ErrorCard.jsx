import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const ErrorCard = ({ title, subtitle, onRetry }) => {
    return (
        <View style={styles.errorCard}>
            <View style={styles.errorHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
                    <Icon name="alert-circle" size={12} color={COLORS.error} style={{ marginRight: 4 }} />
                    <Text style={[styles.errorBadge, { marginBottom: 0 }]}>ERROR</Text>
                </View>
            </View>
            <Text style={styles.errorTitle}>{title}</Text>
            <Text style={styles.errorSubtitle}>{subtitle}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                <Icon name="refresh" size={16} color={COLORS.text} style={{ marginRight: 6 }} />
                <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
            <View style={styles.cloudIcon}>
                <Icon name="cloud-offline" size={40} color={COLORS.text} style={{ opacity: 0.1 }} />
            </View>
        </View>
    );
};

export default ErrorCard;
