import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const BottomNav = ({ activeTab = 'Home', onTabPress }) => {
    const tabs = [
        { id: 'Home', icon: '🏠', label: 'Home' },
        { id: 'Search', icon: '🔍', label: 'Search' },
        { id: 'FAB', isFab: true },
        { id: 'Quest', icon: '💬', label: 'Quest' },
        { id: 'Profile', icon: '👤', label: 'Profile' },
    ];

    return (
        <View style={styles.bottomNav}>
            {tabs.map((tab, idx) => {
                if (tab.isFab) {
                    return (
                        <TouchableOpacity key={idx} style={styles.fabContainer}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                style={styles.fab}>
                                <Text style={styles.fabIcon}>+</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                }

                const isActive = activeTab === tab.id;
                return (
                    <TouchableOpacity
                        key={idx}
                        style={styles.navItem}
                        onPress={() => onTabPress?.(tab.id)}>
                        <Text style={isActive ? styles.navIconActive : styles.navIcon}>
                            {tab.icon}
                        </Text>
                        <Text style={isActive ? styles.navTextActive : styles.navText}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default BottomNav;
