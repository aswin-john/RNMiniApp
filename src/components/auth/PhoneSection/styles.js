import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 15,
    },
    label: {
        fontFamily: FONTS.regular,
        fontSize: 11,
        color: COLORS.textMuted,
        letterSpacing: 1,
        marginBottom: 10,
    },
    phoneContainer: {
        width: '100%',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        height: 60,
    },
    phoneTextContainer: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        borderRadius: 12,
    },
    phoneTextInput: {
        fontFamily: FONTS.medium,
        color: COLORS.text,
        fontSize: 16,
        paddingVertical: 0,
    },
    phoneCodeText: {
        fontFamily: FONTS.medium,
        color: COLORS.text,
        fontSize: 16,
    },
    phoneFlagButton: {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
    },
    errorText: {
        fontFamily: FONTS.regular,
        color: COLORS.error,
        fontSize: 12,
        marginTop: 5,
    },
});

export default styles;
