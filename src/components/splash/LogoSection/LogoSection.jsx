import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const LogoSection = () => {
    return (
        <View style={styles.logoContainer}>
            <View style={styles.logoOuter}>
                <View style={styles.logoInner}>
                    <View style={styles.leafIcon}>
                        <View style={styles.leafShape} />
                    </View>
                </View>
            </View>

            <Text style={styles.title}>VERDANT</Text>
            <Text style={styles.subtitle}>
                Your daily companion for{'\n'}sustainable living.
            </Text>
        </View>
    );
};

export default LogoSection;
