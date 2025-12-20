import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
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
        fontFamily: FONTS.bold,
        fontSize: 14,
    },
    postMeta: {
        marginLeft: 12,
    },
    postId: {
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        fontSize: 14,
    },
    postUser: {
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    postTitle: {
        color: COLORS.text,
        fontFamily: FONTS.bold,
        fontSize: 16,
        marginBottom: 8,
        lineHeight: 22,
        textTransform: 'capitalize',
    },
    postBody: {
        fontFamily: FONTS.regular,
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
});

export default styles;
