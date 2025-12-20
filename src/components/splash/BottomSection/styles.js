import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';

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
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    createAccountText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default styles;
