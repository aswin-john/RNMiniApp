import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const DashboardHeader = ({ name, onMenuPress }) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View style={styles.avatarContainer}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.primaryDark]}
                        style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {name?.charAt(0) || 'A'}
                        </Text>
                    </LinearGradient>
                    <View style={styles.onlineIndicator} />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.greeting}>Hi, {name || 'Alex'}</Text>
                    <Text style={styles.welcomeBack}>Welcome back</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
                <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardHeader;
