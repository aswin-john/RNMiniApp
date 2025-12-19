import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../utils/constants';
import { getPosts } from '../services/api';
import { savePosts, getCachedPosts } from '../services/storage';
import { useNetworkStatus } from '../services/storage';

const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [isOffline, setIsOffline] = useState(false);
    const [showingCached, setShowingCached] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setError(null);
            setShowingCached(false);
            const data = await getPosts();
            setPosts(data);
            await savePosts(data);
            setIsOffline(false);
        } catch (err) {
            console.log('Error fetching posts:', err);
            // Try to load cached data
            const cachedData = await getCachedPosts();
            if (cachedData && cachedData.length > 0) {
                setPosts(cachedData);
                setShowingCached(true);
                setIsOffline(true);
            } else {
                setError('Unable to fetch posts. Please check your connection.');
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPosts();
    }, []);

    const handleRetry = () => {
        setLoading(true);
        fetchPosts();
    };

    const renderPostItem = ({ item, index }) => {
        const gradients = [
            ['#FF6B6B', '#FF8E53'],
            ['#4ECDC4', '#44A08D'],
            ['#667EEA', '#764BA2'],
            ['#F093FB', '#F5576C'],
            ['#4FACFE', '#00F2FE'],
        ];
        const gradient = gradients[index % gradients.length];

        return (
            <TouchableOpacity style={styles.postCard} activeOpacity={0.8}>
                <View style={styles.postHeader}>
                    <LinearGradient
                        colors={gradient}
                        style={styles.postAvatar}>
                        <Text style={styles.postAvatarText}>{item.id}</Text>
                    </LinearGradient>
                    <View style={styles.postMeta}>
                        <Text style={styles.postId}>Post #{item.id}</Text>
                        <Text style={styles.postUser}>User {item.userId}</Text>
                    </View>
                </View>
                <Text style={styles.postTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.postBody} numberOfLines={3}>
                    {item.body}
                </Text>
                <View style={styles.postFooter}>
                    <View style={styles.postAction}>
                        <Text style={styles.actionIcon}>❤️</Text>
                        <Text style={styles.actionText}>{Math.floor(Math.random() * 50)}</Text>
                    </View>
                    <View style={styles.postAction}>
                        <Text style={styles.actionIcon}>💬</Text>
                        <Text style={styles.actionText}>{Math.floor(Math.random() * 20)}</Text>
                    </View>
                    <View style={styles.postAction}>
                        <Text style={styles.actionIcon}>🔗</Text>
                        <Text style={styles.actionText}>Share</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading posts...</Text>
            </View>
        );
    }

    if (error && !showingCached) {
        return (
            <View style={styles.centerContainer}>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorEmoji}>📡</Text>
                    <Text style={styles.errorTitle}>Connection Error</Text>
                    <Text style={styles.errorMessage}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                        <Text style={styles.retryButtonText}>🔄 Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Posts</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Offline Banner */}
            {showingCached && (
                <View style={styles.offlineBanner}>
                    <Text style={styles.offlineIcon}>📱</Text>
                    <Text style={styles.offlineText}>
                        You are offline. Showing cached data.
                    </Text>
                </View>
            )}

            {/* Posts List */}
            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderPostItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                        colors={[COLORS.primary]}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>📭</Text>
                        <Text style={styles.emptyText}>No posts available</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centerContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: COLORS.background,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        color: COLORS.text,
        fontSize: 20,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '600',
    },
    placeholder: {
        width: 40,
    },
    offlineBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.primary,
        marginBottom: 15,
    },
    offlineIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    offlineText: {
        color: COLORS.primary,
        fontSize: 13,
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    postCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postAvatarText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
    postMeta: {
        marginLeft: 12,
    },
    postId: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },
    postUser: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    postTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        lineHeight: 22,
        textTransform: 'capitalize',
    },
    postBody: {
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    postFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 12,
        gap: 20,
    },
    postAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionIcon: {
        fontSize: 14,
    },
    actionText: {
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    loadingText: {
        color: COLORS.textSecondary,
        marginTop: 15,
        fontSize: 14,
    },
    errorContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 30,
        borderRadius: 20,
        width: '100%',
    },
    errorEmoji: {
        fontSize: 50,
        marginBottom: 15,
    },
    errorTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    errorMessage: {
        color: COLORS.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 25,
    },
    retryButtonText: {
        color: COLORS.background,
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    emptyEmoji: {
        fontSize: 50,
        marginBottom: 15,
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
});

export default PostsScreen;
