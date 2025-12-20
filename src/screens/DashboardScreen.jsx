import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DashboardHeader from '../components/dashboard/DashboardHeader/DashboardHeader';
import MenuCard from '../components/dashboard/MenuCard/MenuCard';
import SettingsCard from '../components/dashboard/SettingsCard/SettingsCard';
import ErrorCard from '../components/dashboard/ErrorCard/ErrorCard';
import PostCard from '../components/posts/PostCard/PostCard';
import BottomNav from '../components/common/BottomNav/BottomNav';
import { COLORS, FONTS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const { user, logout } = useAuth();
    const [isOffline, setIsOffline] = useState(false);

    const menuItems = [
        {
            id: 'posts',
            title: 'My Posts',
            subtitle: 'View history',
            icon: '📝',
            color: '#FF6B6B',
            gradient: ['#FF6B6B', '#FF8E53'],
        },
        {
            id: 'profile',
            title: 'Profile',
            subtitle: 'Edit details',
            icon: '👤',
            color: '#4ECDC4',
            gradient: ['#4ECDC4', '#44A08D'],
        },
        {
            id: 'settings',
            title: 'Settings',
            subtitle: 'App preferences',
            icon: '⚙️',
            color: '#A8A8A8',
            gradient: ['#606060', '#404040'],
        },
    ];

    const samplePosts = [
        {
            id: '1',
            title: 'Project Alpha Update',
            description: "We have successfully deployed the first phase of the alpha test. The new caching strategy has...",
            tags: ['🏷️ Image', '🔧 Technology'],
            gradient: ['#FF6B6B', '#FF8E53'],
            icon: '🚀',
            likes: 0,
            comments: 0
        },
        {
            id: '2',
            title: 'Design System V2',
            description: "The new tokens are now available in the repository. We've updated the color palette to support higher contrast ratios in dark mode...",
            tags: ['🏷️ 3 Images', '🎨 Design'],
            gradient: ['#4ECDC4', '#556270'],
            icon: '🎨',
            likes: 12,
            comments: 5
        }
    ];

    const handleMenuPress = (item) => {
        if (item.id === 'posts') {
            navigation.navigate('Posts');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Splash' }],
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* Offline Banner */}
            {isOffline && (
                <View style={styles.offlineBanner}>
                    <Text style={styles.offlineIcon}>📡</Text>
                    <Text style={styles.offlineText}>You are currently offline. Saving cached content.</Text>
                </View>
            )}

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                <DashboardHeader
                    name={user?.name}
                    onMenuPress={() => console.log('Menu Pressed')}
                />

                {/* Menu Cards Grid */}
                <View style={styles.menuGrid}>
                    {menuItems.slice(0, 2).map((item) => (
                        <MenuCard
                            key={item.id}
                            item={item}
                            onPress={() => handleMenuPress(item)}
                        />
                    ))}
                </View>

                <SettingsCard
                    title="Settings"
                    subtitle="App preferences"
                    onPress={() => handleMenuPress(menuItems[2])}
                />

                {/* Latest Posts Section */}
                <View style={styles.latestPostsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Latest Posts</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <ErrorCard
                        title="Connection Lost"
                        subtitle="Cannot fetch new posts."
                        onRetry={() => console.log('Retry fetch posts')}
                    />

                    {samplePosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomNav
                activeTab="Home"
                onTabPress={(tabId) => console.log(`Navigated to ${tabId}`)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    offlineBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    offlineIcon: {
        fontSize: 16,
        marginRight: 10,
    },
    offlineText: {
        color: COLORS.primary,
        fontSize: 12,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    menuGrid: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 15,
    },
    latestPostsSection: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        color: COLORS.text,
        fontFamily: FONTS.bold,
        fontSize: 18,
    },
    viewAllText: {
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        fontSize: 14,
    },
    logoutButton: {
        marginHorizontal: 20,
        marginTop: 10,
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.error,
        alignItems: 'center',
    },
    logoutText: {
        color: COLORS.error,
        fontFamily: FONTS.bold,
        fontSize: 15,
    },
});

export default DashboardScreen;
