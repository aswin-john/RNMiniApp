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
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../components/common/ScreenHeader/ScreenHeader';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import EmptyState from '../components/common/EmptyState/EmptyState';
import PostListItem from '../components/posts/PostListItem/PostListItem';
import { COLORS } from '../utils/constants';
import { getPosts } from '../services/api';
import { savePosts, getCachedPosts } from '../services/storage';

const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
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
        } catch (err) {
            console.log('Error fetching posts:', err);
            // Try to load cached data
            const cachedData = await getCachedPosts();
            if (cachedData && cachedData.length > 0) {
                setPosts(cachedData);
                setShowingCached(true);
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

    if (loading) {
        return <LoadingState message="Loading posts..." />;
    }

    if (error && !showingCached) {
        return <ErrorState message={error} onRetry={handleRetry} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            <ScreenHeader
                title="All Posts"
                onBack={() => navigation.goBack()}
            />

            {/* Offline Banner */}
            {showingCached && (
                <View style={styles.offlineBanner}>
                    <Icon name="cloud-offline-outline" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
                    <Text style={styles.offlineText}>
                        You are offline. Showing cached data.
                    </Text>
                </View>
            )}

            {/* Posts List */}
            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <PostListItem item={item} index={index} />
                )}
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
                    <EmptyState message="No posts available" />
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
});

export default PostsScreen;
