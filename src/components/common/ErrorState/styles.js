import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        fontFamily: FONTS.bold,
        fontSize: 20,
        marginBottom: 10,
    },
    errorMessage: {
        fontFamily: FONTS.regular,
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
});

export default styles;
