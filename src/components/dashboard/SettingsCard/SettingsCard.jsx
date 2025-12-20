import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const SettingsCard = ({ title, subtitle, icon = '⚙️', onPress }) => {
    return (
        <TouchableOpacity
            style={styles.settingsCard}
            onPress={onPress}>
            <View style={styles.settingsLeft}>
                <View style={styles.settingsIcon}>
                    <Text style={styles.settingsIconText}>{icon}</Text>
                </View>
                <View>
                    <Text style={styles.settingsTitle}>{title}</Text>
                    <Text style={styles.settingsSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <Text style={styles.settingsArrow}>›</Text>
        </TouchableOpacity>
    );
};

export default SettingsCard;
