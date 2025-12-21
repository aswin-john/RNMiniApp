import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const PostCard = ({ post }) => {
    // Determine dynamic colors/gradient if any, or default
    const gradient = post.gradient || ['#FF6B6B', '#FF8E53'];
    const iconName = post.iconName || 'rocket-outline';

    return (
        <View style={styles.postCard}>
            <View style={styles.postImageContainer}>
                <LinearGradient
                    colors={gradient}
                    style={styles.postImage}>
                    <Icon name={iconName} size={32} color="#FFF" />
                </LinearGradient>
            </View>
            <View style={styles.postContent}>
                <View style={styles.postTags}>
                    {(post.tags || []).map((tag, idx) => (
                        <View key={idx} style={[styles.postTag, { flexDirection: 'row', alignItems: 'center' }]}>
                            <Icon name="pricetag-outline" size={10} color={COLORS.primary} style={{ marginRight: 4 }} />
                            <Text style={{ color: COLORS.primary, fontSize: 10 }}>{tag}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription} numberOfLines={2}>
                    {post.description || post.body}
                </Text>
                <View style={styles.postActions}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Icon name="heart-outline" size={14} color={COLORS.textMuted} style={{ marginRight: 4 }} />
                        <Text style={styles.postAction}>{post.likes || 0}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="chatbubble-outline" size={14} color={COLORS.textMuted} style={{ marginRight: 4 }} />
                        <Text style={styles.postAction}>{post.comments || 0}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PostCard;
