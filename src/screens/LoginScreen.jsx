import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    Animated,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-number-input';
import { COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';


const LoginScreen = ({ navigation }) => {
    const { login } = useAuth();
    const [value, setValue] = useState('');
    const [formattedValue, setFormattedValue] = useState('');
    const [valid, setValid] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [timer, setTimer] = useState(30);
    const [mobileError, setMobileError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [mockOtp, setMockOtp] = useState('123456'); // Mock OTP for demo
    const [isAutoFilling, setIsAutoFilling] = useState(false); // Auto-fill animation state

    const phoneInput = useRef(null);
    const toastAnim = useRef(new Animated.Value(-100)).current;
    const otpRefs = useRef([]);
    const autoFillTimeoutRef = useRef(null);

    useEffect(() => {
        let interval;
        if (isOtpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    // Cleanup auto-fill timeout on unmount
    useEffect(() => {
        return () => {
            if (autoFillTimeoutRef.current) {
                clearTimeout(autoFillTimeoutRef.current);
            }
        };
    }, []);

    // Auto-fill OTP function - simulates automatic OTP detection
    const autoFillOtp = (otpString) => {
        setIsAutoFilling(true);
        const otpArray = otpString.split('');

        // Animate filling each digit with a slight delay for visual effect
        otpArray.forEach((digit, index) => {
            setTimeout(() => {
                setOtp(prev => {
                    const newOtp = [...prev];
                    newOtp[index] = digit;
                    return newOtp;
                });

                // Check if all filled after last digit
                if (index === otpArray.length - 1) {
                    setIsOtpValid(true);
                    setIsAutoFilling(false);
                }
            }, index * 100); // 100ms delay between each digit
        });
    };

    // Manual auto-fill button handler
    const handleAutoFillOtp = () => {
        if (isOtpSent && mockOtp) {
            autoFillOtp(mockOtp);
        }
    };

    const showOtpToast = () => {
        setShowToast(true);
        Animated.sequence([
            Animated.timing(toastAnim, {
                toValue: 50,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(toastAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setShowToast(false));
    };

    const handleSendOtp = () => {
        if (!valid) {
            setMobileError('Please enter a valid mobile number');
            return;
        }
        // Clear any previous OTP
        setOtp(['', '', '', '', '', '']);
        setIsOtpValid(false);

        // Generate a random 6-digit OTP for demo
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setMockOtp(generatedOtp);
        console.log('Generated OTP:', generatedOtp); // Also log to console
        setIsOtpSent(true);
        setTimer(30);
        showOtpToast();

        // Focus first OTP input
        setTimeout(() => otpRefs.current[0]?.focus(), 100);

        // Auto-fill OTP after 2 seconds (simulating SMS detection)
        // Clear any previous timeout
        if (autoFillTimeoutRef.current) {
            clearTimeout(autoFillTimeoutRef.current);
        }
        autoFillTimeoutRef.current = setTimeout(() => {
            autoFillOtp(generatedOtp);
        }, 2000);
    };

    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-focus next input
        if (text && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }

        // Check if all OTP fields are filled
        const allFilled = newOtp.every(digit => digit !== '');
        setIsOtpValid(allFilled);
    };

    const handleOtpKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleLogin = async () => {
        // Mock OTP validation (accept any 6-digit OTP)
        if (isOtpValid) {
            await login();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        }
    };

    const handleResendOtp = () => {
        if (timer === 0) {
            // Clear previous OTP
            setOtp(['', '', '', '', '', '']);
            setIsOtpValid(false);

            // Generate new OTP
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setMockOtp(generatedOtp);
            console.log('Resent OTP:', generatedOtp);

            setTimer(30);
            showOtpToast();

            // Auto-fill after 2 seconds
            if (autoFillTimeoutRef.current) {
                clearTimeout(autoFillTimeoutRef.current);
            }
            autoFillTimeoutRef.current = setTimeout(() => {
                autoFillOtp(generatedOtp);
            }, 2000);
        }
    };

    return (
        <LinearGradient
            colors={[COLORS.backgroundGradientStart, COLORS.backgroundGradientEnd]}
            style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Toast Notification */}
            {showToast && (
                <Animated.View
                    style={[styles.toast, { transform: [{ translateY: toastAnim }] }]}>
                    <View style={styles.toastContent}>
                        <View style={styles.checkCircle}>
                            <Text style={styles.checkMark}>✓</Text>
                        </View>
                        <View>
                            <Text style={styles.toastTitle}>OTP Sent!</Text>
                            <Text style={styles.toastSubtitle}>Your OTP: {mockOtp}</Text>
                        </View>
                    </View>
                </Animated.View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                style={styles.keyboardView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}>

                    {/* Lock Icon */}
                    <View style={styles.lockContainer}>
                        <View style={styles.lockIcon}>
                            <Text style={styles.lockEmoji}>🔒</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>Secure OTP Login</Text>
                    <Text style={styles.subtitle}>
                        Verify your identity to access your dashboard.
                    </Text>

                    {/* Mobile Number Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.label}>MOBILE NUMBER</Text>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="IN"
                            layout="first"
                            onChangeText={(text) => {
                                setValue(text);
                                const checkValid = phoneInput.current?.isValidNumber(text);
                                setValid(checkValid);
                                setMobileError('');
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            containerStyle={styles.phoneContainer}
                            textContainerStyle={styles.phoneTextContainer}
                            textInputStyle={styles.phoneTextInput}
                            codeTextStyle={styles.phoneCodeText}
                            flagButtonStyle={styles.phoneFlagButton}
                            renderDropdownImage={<Text style={{ color: 'white', fontSize: 10 }}>▼</Text>}
                            placeholder="Enter mobile number"
                            withDarkTheme
                            autoFocus={false}
                        />
                        {mobileError ? (
                            <Text style={styles.errorText}>{mobileError}</Text>
                        ) : null}
                    </View>

                    {/* Send OTP Button */}
                    <TouchableOpacity
                        style={[
                            styles.sendOtpButton,
                            !valid && styles.buttonDisabled,
                        ]}
                        onPress={handleSendOtp}
                        disabled={!valid}>
                        <Text style={styles.sendOtpText}>Send Verification Code</Text>
                        <Text style={styles.sendOtpArrow}>➤</Text>
                    </TouchableOpacity>

                    {/* OTP Section */}
                    <View style={styles.thenContainer}>
                        <View style={styles.thenLine} />
                        <Text style={styles.thenText}>THEN</Text>
                        <View style={styles.thenLine} />
                    </View>

                    <View style={styles.otpSection}>
                        <View style={styles.otpHeader}>
                            <Text style={styles.label}>ONE-TIME PASSWORD</Text>
                            <Text style={styles.timerText}>
                                {timer > 0 ? `Resend in 00:${timer.toString().padStart(2, '0')}` : (
                                    <Text onPress={handleResendOtp} style={styles.resendLink}>Resend</Text>
                                )}
                            </Text>
                        </View>
                        <View style={styles.otpContainer}>
                            <View style={styles.otpIcon}>
                                <Text style={styles.keyEmoji}>🔑</Text>
                            </View>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={ref => (otpRefs.current[index] = ref)}
                                    style={[
                                        styles.otpInput,
                                        !isOtpSent && styles.otpInputDisabled,
                                        isAutoFilling && styles.otpInputAutoFill,
                                    ]}
                                    value={digit}
                                    onChangeText={text => handleOtpChange(text, index)}
                                    onKeyPress={e => handleOtpKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    editable={isOtpSent && !isAutoFilling}
                                    secureTextEntry
                                />
                            ))}
                        </View>

                        {/* Auto-fill OTP Button */}
                        {isOtpSent && !isOtpValid && (
                            <TouchableOpacity
                                style={[
                                    styles.autoFillButton,
                                    isAutoFilling && styles.autoFillButtonDisabled,
                                ]}
                                onPress={handleAutoFillOtp}
                                disabled={isAutoFilling}>
                                <Text style={styles.autoFillIcon}>✨</Text>
                                <Text style={styles.autoFillText}>
                                    {isAutoFilling ? 'Auto-filling...' : 'Auto-fill OTP'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            !isOtpValid && styles.loginButtonDisabled,
                        ]}
                        onPress={handleLogin}
                        disabled={!isOtpValid}>
                        <Text style={[
                            styles.loginButtonText,
                            !isOtpValid && styles.loginButtonTextDisabled,
                        ]}>
                            Login to Account
                        </Text>
                        <Text style={[
                            styles.loginArrow,
                            !isOtpValid && styles.loginButtonTextDisabled,
                        ]}>↵</Text>
                    </TouchableOpacity>

                    <Text style={styles.termsText}>
                        By logging in, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Leaf decoration at bottom */}
            <View style={styles.bottomLeaf}>
                <Text style={styles.leafEmoji}>🌿</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingTop: 80,
        paddingBottom: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 80,
    },
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
    sectionContainer: {
        marginBottom: 15,
    },
    label: {
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
        color: COLORS.text,
        fontSize: 16,
        paddingVertical: 0,
    },
    phoneCodeText: {
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
        color: COLORS.error,
        fontSize: 12,
        marginTop: 5,
    },
    sendOtpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 30,
        marginBottom: 20,
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    sendOtpText: {
        color: COLORS.background,
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    sendOtpArrow: {
        color: COLORS.background,
        fontSize: 16,
    },
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
    otpSection: {
        marginBottom: 20,
    },
    otpHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        paddingVertical: 16,
        borderRadius: 30,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    loginButtonDisabled: {
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    loginButtonText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    loginButtonTextDisabled: {
        color: COLORS.textMuted,
    },
    loginArrow: {
        color: COLORS.primary,
        fontSize: 18,
    },
    termsText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },
    termsLink: {
        color: COLORS.text,
        textDecorationLine: 'underline',
    },
    bottomLeaf: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    leafEmoji: {
        fontSize: 24,
        opacity: 0.6,
    },
});

export default LoginScreen;
