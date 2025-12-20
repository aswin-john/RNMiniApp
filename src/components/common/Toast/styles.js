import { StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../../utils/constants';

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        zIndex: 100,
        backgroundColor: COLORS.surface,
        borderRadius: 25,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkMark: {
        color: COLORS.background,
        fontWeight: 'bold',
    },
    toastTitle: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },
    toastSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
});

export default styles;
