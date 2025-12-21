import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const BottomNav = ({ activeTab = 'Home', onTabPress }) => {
    const tabs = [
        { id: 'Home', icon: 'home-outline', activeIcon: 'home', label: 'Home' },
        { id: 'Search', icon: 'search-outline', activeIcon: 'search', label: 'Search' },
        { id: 'FAB', isFab: true },
        { id: 'Quest', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles', label: 'Quest' },
        { id: 'Profile', icon: 'person-outline', activeIcon: 'person', label: 'Profile' },
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
                                <Icon name="add" size={32} color={COLORS.text} />
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
                        <Icon
                            name={isActive ? tab.activeIcon : tab.icon}
                            size={24}
                            color={isActive ? COLORS.primary : COLORS.textMuted}
                        />
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
