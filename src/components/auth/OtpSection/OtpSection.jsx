import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const OtpSection = ({
    otp,
    otpRefs,
    isOtpSent,
    isOtpValid,
    isAutoFilling,
    otpError,
    timer,
    onOtpChange,
    onOtpKeyPress,
    onResendOtp,
    onAutoFillOtp
}) => {
    return (
        <View style={styles.otpSection}>
            <View style={styles.otpHeader}>
                <Text style={styles.label}>ONE-TIME PASSWORD</Text>
                <Text style={styles.timerText}>
                    {timer > 0 ? `Resend in 00:${timer.toString().padStart(2, '0')}` : (
                        <Text onPress={onResendOtp} style={styles.resendLink}>Resend</Text>
                    )}
                </Text>
            </View>
            <View style={styles.otpContainer}>
                <View style={styles.otpIcon}>
                    <Icon name="key-outline" size={20} color={COLORS.primary} />
                </View>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={ref => (otpRefs.current[index] = ref)}
                        style={[
                            styles.otpInput,
                            !isOtpSent && styles.otpInputDisabled,
                            isAutoFilling && styles.otpInputAutoFill,
                            otpError && styles.otpInputError,
                        ]}
                        value={digit}
                        onChangeText={text => onOtpChange(text, index)}
                        onKeyPress={e => onOtpKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        editable={isOtpSent && !isAutoFilling}
                        secureTextEntry
                    />
                ))}
            </View>

            {otpError ? (
                <Text style={styles.otpErrorText}>{otpError}</Text>
            ) : null}

            {/* Auto-fill OTP Button */}
            {isOtpSent && !isOtpValid && (
                <TouchableOpacity
                    style={[
                        styles.autoFillButton,
                        isAutoFilling && styles.autoFillButtonDisabled,
                    ]}
                    onPress={onAutoFillOtp}
                    disabled={isAutoFilling}>
                    <Icon name="sparkles-outline" size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.autoFillText}>
                        {isAutoFilling ? 'Auto-filling...' : 'Auto-fill OTP'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default OtpSection;
