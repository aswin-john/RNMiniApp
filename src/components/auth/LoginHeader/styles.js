import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';

const styles = StyleSheet.create({
    lockContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    lockIcon: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockEmoji: {
        fontSize: 28,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 30,
    },
});

export default styles;
