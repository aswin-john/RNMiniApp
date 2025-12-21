import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const SettingsCard = ({ title, subtitle, iconName = 'settings-outline', onPress }) => {
    return (
        <TouchableOpacity
            style={styles.settingsCard}
            onPress={onPress}>
            <View style={styles.settingsLeft}>
                <View style={styles.settingsIcon}>
                    <Icon name={iconName} size={20} color={COLORS.primary} />
                </View>
                <View>
                    <Text style={styles.settingsTitle}>{title}</Text>
                    <Text style={styles.settingsSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <Icon name="chevron-forward" size={20} color={COLORS.textMuted} />
        </TouchableOpacity>
    );
};

export default SettingsCard;
