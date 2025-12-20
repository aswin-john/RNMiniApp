import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: COLORS.background,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        color: COLORS.text,
        fontSize: 20,
    },
    headerTitle: {
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        fontSize: 18,
    },
    placeholder: {
        width: 40,
    },
});

export default styles;
