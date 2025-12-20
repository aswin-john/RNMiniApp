import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    continueButton: {
        width: '100%',
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 20,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 30,
    },
    buttonText: {
        fontFamily: FONTS.semibold,
        fontSize: 16,
        color: COLORS.background,
        marginRight: 10,
    },
    arrow: {
        fontSize: 20,
        color: COLORS.background,
    },
});

export default styles;
