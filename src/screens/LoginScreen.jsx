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
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-number-input';
import Toast from '../components/common/Toast/Toast';
import CustomButton from '../components/common/Button/CustomButton';
import TextDivider from '../components/common/TextDivider/TextDivider';
import LoginHeader from '../components/auth/LoginHeader/LoginHeader';
import PhoneSection from '../components/auth/PhoneSection/PhoneSection';
import OtpSection from '../components/auth/OtpSection/OtpSection';
import { COLORS, FONTS } from '../utils/constants';
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
    const [otpError, setOtpError] = useState('');
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
        setOtpError(''); // Clear error when user types

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
        const enteredOtp = otp.join('');

        if (isOtpValid) {
            if (enteredOtp === mockOtp) {
                setOtpError('');
                await login();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                });
            } else {
                setOtpError('Invalid OTP. Please try again.');
            }
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

            <Toast
                visible={showToast}
                title="OTP Sent!"
                subtitle={`Your OTP: ${mockOtp}`}
                translateAnim={toastAnim}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                style={styles.keyboardView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}>

                    <LoginHeader
                        title="Secure OTP Login"
                        subtitle="Verify your identity to access your dashboard."
                    />

                    <PhoneSection
                        phoneInputRef={phoneInput}
                        value={value}
                        onChangeText={(text) => {
                            setValue(text);
                            const checkValid = phoneInput.current?.isValidNumber(text);
                            setValid(checkValid);
                            setMobileError('');
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        error={mobileError}
                    />

                    <CustomButton
                        title="Send Verification Code"
                        onPress={handleSendOtp}
                        disabled={!valid}
                        solid={true}
                        backgroundColor={COLORS.primary}
                        iconName="arrow-forward"
                        style={{ marginTop: 10 }}
                    />

                    <TextDivider text="THEN" />

                    <OtpSection
                        otp={otp}
                        otpRefs={otpRefs}
                        isOtpSent={isOtpSent}
                        isOtpValid={isOtpValid}
                        isAutoFilling={isAutoFilling}
                        otpError={otpError}
                        timer={timer}
                        onOtpChange={handleOtpChange}
                        onOtpKeyPress={handleOtpKeyPress}
                        onResendOtp={handleResendOtp}
                        onAutoFillOtp={handleAutoFillOtp}
                    />

                    <CustomButton
                        title="Login to Account"
                        onPress={handleLogin}
                        disabled={!isOtpValid}
                        solid={true}
                        backgroundColor={COLORS.surface}
                        iconName="log-in-outline"
                        style={{
                            borderWidth: 1,
                            borderColor: isOtpValid ? COLORS.primary : COLORS.border,
                            borderRadius: 30, // Redundant but safe
                            overflow: 'hidden'
                        }}
                        textStyle={{
                            color: isOtpValid ? COLORS.primary : COLORS.textMuted,
                            marginRight: 8
                        }}
                        arrowStyle={{
                            color: isOtpValid ? COLORS.primary : COLORS.textMuted,
                        }}
                    />

                    <Text style={styles.termsText}>
                        By logging in, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Leaf decoration at bottom */}
            <View style={styles.bottomLeaf}>
                <Icon name="leaf-outline" size={24} color={COLORS.primary} style={{ opacity: 0.6 }} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    termsText: {
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },
    termsLink: {
        fontFamily: FONTS.medium,
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
