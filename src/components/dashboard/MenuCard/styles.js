import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    menuCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 15,
    },
    menuCardGradient: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    menuCardIcon: {
        fontSize: 24,
    },
    menuCardTitle: {
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        fontSize: 16,
        marginBottom: 4,
    },
    menuCardSubtitle: {
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
    },
});

export default styles;
