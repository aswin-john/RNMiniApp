import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const PostCard = ({ post }) => {
    // Determine dynamic colors/gradient if any, or default
    const gradient = post.gradient || ['#FF6B6B', '#FF8E53'];
    const icon = post.icon || '🚀';

    return (
        <View style={styles.postCard}>
            <View style={styles.postImageContainer}>
                <LinearGradient
                    colors={gradient}
                    style={styles.postImage}>
                    <Text style={styles.postImageText}>{icon}</Text>
                </LinearGradient>
            </View>
            <View style={styles.postContent}>
                <View style={styles.postTags}>
                    {(post.tags || []).map((tag, idx) => (
                        <Text key={idx} style={styles.postTag}>{tag}</Text>
                    ))}
                </View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription} numberOfLines={2}>
                    {post.description || post.body}
                </Text>
                <View style={styles.postActions}>
                    <Text style={styles.postAction}>❤️ {post.likes || 0}</Text>
                    <Text style={styles.postAction}>💬 {post.comments || 0}</Text>
                </View>
            </View>
        </View>
    );
};

export default PostCard;
