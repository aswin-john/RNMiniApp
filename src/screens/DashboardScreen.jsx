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
import { COLORS } from '../utils/constants';
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

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.avatarContainer}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {user?.name?.charAt(0) || 'A'}
                                </Text>
                            </LinearGradient>
                            <View style={styles.onlineIndicator} />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.greeting}>Hi, {user?.name || 'Alex'}</Text>
                            <Text style={styles.welcomeBack}>Welcome back</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuIcon}>☰</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu Cards Grid */}
                <View style={styles.menuGrid}>
                    {menuItems.slice(0, 2).map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuCard}
                            onPress={() => handleMenuPress(item)}>
                            <LinearGradient
                                colors={item.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.menuCardGradient}>
                                <Text style={styles.menuCardIcon}>{item.icon}</Text>
                            </LinearGradient>
                            <Text style={styles.menuCardTitle}>{item.title}</Text>
                            <Text style={styles.menuCardSubtitle}>{item.subtitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Settings Card (Full Width) */}
                <TouchableOpacity
                    style={styles.settingsCard}
                    onPress={() => handleMenuPress(menuItems[2])}>
                    <View style={styles.settingsLeft}>
                        <View style={styles.settingsIcon}>
                            <Text style={styles.settingsIconText}>⚙️</Text>
                        </View>
                        <View>
                            <Text style={styles.settingsTitle}>Settings</Text>
                            <Text style={styles.settingsSubtitle}>App preferences</Text>
                        </View>
                    </View>
                    <Text style={styles.settingsArrow}>›</Text>
                </TouchableOpacity>

                {/* Latest Posts Section */}
                <View style={styles.latestPostsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Latest Posts</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Error State Example */}
                    <View style={styles.errorCard}>
                        <View style={styles.errorHeader}>
                            <Text style={styles.errorBadge}>⚠️ ERROR</Text>
                        </View>
                        <Text style={styles.errorTitle}>Connection Lost</Text>
                        <Text style={styles.errorSubtitle}>Cannot fetch new posts.</Text>
                        <TouchableOpacity style={styles.retryButton}>
                            <Text style={styles.retryIcon}>🔄</Text>
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                        <View style={styles.cloudIcon}>
                            <Text style={styles.cloudEmoji}>☁️</Text>
                        </View>
                    </View>

                    {/* Sample Post Cards */}
                    <View style={styles.postCard}>
                        <View style={styles.postImageContainer}>
                            <LinearGradient
                                colors={['#FF6B6B', '#FF8E53']}
                                style={styles.postImage}>
                                <Text style={styles.postImageText}>🚀</Text>
                            </LinearGradient>
                        </View>
                        <View style={styles.postContent}>
                            <View style={styles.postTags}>
                                <Text style={styles.postTag}>🏷️ Image</Text>
                                <Text style={styles.postTag}>🔧 Technology</Text>
                            </View>
                            <Text style={styles.postTitle}>Project Alpha Update</Text>
                            <Text style={styles.postDescription} numberOfLines={2}>
                                We have successfully deployed the first phase of the alpha test. The new caching strategy has...
                            </Text>
                            <View style={styles.postActions}>
                                <Text style={styles.postAction}>❤️ 0</Text>
                                <Text style={styles.postAction}>💬 0</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.postCard}>
                        <View style={styles.postImageContainer}>
                            <LinearGradient
                                colors={['#4ECDC4', '#556270']}
                                style={styles.postImage}>
                                <Text style={styles.postImageText}>🎨</Text>
                            </LinearGradient>
                        </View>
                        <View style={styles.postContent}>
                            <View style={styles.postTags}>
                                <Text style={styles.postTag}>🏷️ 3 Images</Text>
                                <Text style={styles.postTag}>🎨 Design</Text>
                            </View>
                            <Text style={styles.postTitle}>Design System V2</Text>
                            <Text style={styles.postDescription} numberOfLines={2}>
                                The new tokens are now available in the repository. We've updated the color palette to support higher contrast ratios in dark mode...
                            </Text>
                            <View style={styles.postActions}>
                                <Text style={styles.postAction}>❤️ 12</Text>
                                <Text style={styles.postAction}>💬 5</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIconActive}>🏠</Text>
                    <Text style={styles.navTextActive}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>🔍</Text>
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fabContainer}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.primaryDark]}
                        style={styles.fab}>
                        <Text style={styles.fabIcon}>+</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>💬</Text>
                    <Text style={styles.navText}>Quest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>👤</Text>
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: COLORS.background,
        fontSize: 20,
        fontWeight: 'bold',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        borderWidth: 2,
        borderColor: COLORS.background,
    },
    headerText: {
        marginLeft: 12,
    },
    greeting: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '600',
    },
    welcomeBack: {
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        color: COLORS.text,
        fontSize: 18,
    },
    menuGrid: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 15,
    },
    menuCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 15,
    },
    menuCardGradient: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    menuCardIcon: {
        fontSize: 24,
    },
    menuCardTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    menuCardSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    settingsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 15,
        marginBottom: 25,
    },
    settingsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#3A3A3A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingsIconText: {
        fontSize: 18,
    },
    settingsTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '600',
    },
    settingsSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    settingsArrow: {
        color: COLORS.textSecondary,
        fontSize: 24,
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
        fontSize: 18,
        fontWeight: '600',
    },
    viewAllText: {
        color: COLORS.primary,
        fontSize: 14,
    },
    errorCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        position: 'relative',
        overflow: 'hidden',
    },
    errorHeader: {
        marginBottom: 10,
    },
    errorBadge: {
        color: '#FF6B6B',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1,
    },
    errorTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    errorSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginBottom: 15,
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    retryIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    retryText: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: '500',
    },
    cloudIcon: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        opacity: 0.3,
    },
    cloudEmoji: {
        fontSize: 60,
    },
    postCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
    },
    postImageContainer: {
        marginRight: 15,
    },
    postImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postImageText: {
        fontSize: 32,
    },
    postContent: {
        flex: 1,
    },
    postTags: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },
    postTag: {
        fontSize: 10,
        color: COLORS.textMuted,
    },
    postTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6,
    },
    postDescription: {
        color: COLORS.textSecondary,
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 10,
    },
    postActions: {
        flexDirection: 'row',
        gap: 15,
    },
    postAction: {
        color: COLORS.textMuted,
        fontSize: 12,
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
        fontSize: 15,
        fontWeight: '600',
    },
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: COLORS.surface,
        paddingVertical: 10,
        paddingBottom: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        alignItems: 'center',
        paddingVertical: 5,
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
        opacity: 0.5,
    },
    navIconActive: {
        fontSize: 20,
        marginBottom: 4,
    },
    navText: {
        color: COLORS.textMuted,
        fontSize: 11,
    },
    navTextActive: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: '500',
    },
    fabContainer: {
        marginTop: -30,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    fabIcon: {
        color: COLORS.background,
        fontSize: 28,
        fontWeight: '300',
    },
});

export default DashboardScreen;
