import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const LoginHeader = ({ title, subtitle }) => {
    return (
        <View>
            <View style={styles.lockContainer}>
                <View style={styles.lockIcon}>
                    <Text style={styles.lockEmoji}>🔒</Text>
                </View>
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
};

export default LoginHeader;
