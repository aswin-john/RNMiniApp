import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const PostListItem = ({ item, index }) => {
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

export default PostListItem;
