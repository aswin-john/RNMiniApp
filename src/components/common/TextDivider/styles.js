import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';

const styles = StyleSheet.create({
    thenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    thenLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    thenText: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginHorizontal: 15,
        letterSpacing: 2,
    },
});

export default styles;
