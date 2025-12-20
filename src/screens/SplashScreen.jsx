import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/Button/CustomButton';
import { COLORS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const handleContinue = () => {
        navigation.navigate('Login');
    };

    return (
        <LinearGradient
            colors={[COLORS.backgroundGradientStart, COLORS.backgroundGradientEnd]}
            style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <View style={styles.logoOuter}>
                    <View style={styles.logoInner}>
                        <View style={styles.leafIcon}>
                            <View style={styles.leafShape} />
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>VERDANT</Text>
                <Text style={styles.subtitle}>
                    Your daily companion for{'\n'}sustainable living.
                </Text>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <CustomButton
                    title="Continue to Login"
                    onPress={handleContinue}
                />

                <View style={styles.createAccountContainer}>
                    <Text style={styles.newHereText}>New here? </Text>
                    <TouchableOpacity>
                        <Text style={styles.createAccountText}>Create an account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: height * 0.1,
    },
    logoOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1A2F1F',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 20,
    },
    logoInner: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#243828',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leafIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leafShape: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        transform: [{ rotate: '45deg' }],
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.text,
        marginTop: 30,
        letterSpacing: 4,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 24,
    },
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

export default SplashScreen;
