import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
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
        fontFamily: FONTS.semibold,
        fontSize: 18,
        marginBottom: 5,
    },
    errorSubtitle: {
        fontFamily: FONTS.regular,
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
        fontFamily: FONTS.medium,
        color: COLORS.text,
        fontSize: 13,
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
});

export default styles;
