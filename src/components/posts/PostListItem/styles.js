import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';

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
});

export default styles;
