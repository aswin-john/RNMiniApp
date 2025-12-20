import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';

const styles = StyleSheet.create({
    otpSection: {
        marginBottom: 20,
    },
    otpHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 11,
        color: COLORS.textMuted,
        letterSpacing: 1,
    },
    timerText: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    resendLink: {
        color: COLORS.primary,
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    otpIcon: {
        marginRight: 10,
    },
    keyEmoji: {
        fontSize: 18,
    },
    otpInput: {
        flex: 1,
        height: 45,
        backgroundColor: 'transparent',
        color: COLORS.text,
        fontSize: 24,
        textAlign: 'center',
        marginHorizontal: 2,
    },
    otpInputDisabled: {
        opacity: 0.4,
    },
    otpInputAutoFill: {
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
    },
    otpInputError: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.error,
        color: COLORS.error,
    },
    otpErrorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 8,
        textAlign: 'center',
    },
    autoFillButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(46, 204, 113, 0.15)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    autoFillButtonDisabled: {
        opacity: 0.6,
    },
    autoFillIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    autoFillText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default styles;
