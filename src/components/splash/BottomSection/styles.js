import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    bottomSection: {
        width: '100%',
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    createAccountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newHereText: {
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    createAccountText: {
        fontFamily: FONTS.semibold,
        color: COLORS.primary,
        fontSize: 14,
    },
});

export default styles;
