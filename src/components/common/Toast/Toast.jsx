import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './styles';

const Toast = ({ title, subtitle, translateAnim, visible }) => {
    if (!visible) return null;

    return (
        <Animated.View
            style={[styles.toast, { transform: [{ translateY: translateAnim }] }]}>
            <View style={styles.toastContent}>
                <View style={styles.checkCircle}>
                    <Text style={styles.checkMark}>✓</Text>
                </View>
                <View>
                    <Text style={styles.toastTitle}>{title}</Text>
                    <Text style={styles.toastSubtitle}>{subtitle}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

export default Toast;
