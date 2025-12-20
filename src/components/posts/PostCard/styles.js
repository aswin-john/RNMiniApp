import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
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
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    postTag: {
        fontSize: 10,
        color: COLORS.textMuted,
    },
    postTitle: {
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        fontSize: 15,
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
});

export default styles;
