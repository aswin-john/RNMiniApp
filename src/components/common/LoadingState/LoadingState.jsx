import React from 'react';
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const LoadingState = ({ message = 'Loading...' }) => {
    return (
        <View style={styles.centerContainer}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
};

export default LoadingState;
