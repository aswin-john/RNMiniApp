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
import LogoSection from '../components/splash/LogoSection/LogoSection';
import BottomSection from '../components/splash/BottomSection/BottomSection';
import { COLORS } from '../utils/constants';

const SplashScreen = ({ navigation }) => {
    const handleContinue = () => {
        navigation.navigate('Login');
    };

    const handleCreateAccount = () => {
        // Handle account creation navigation if needed
        console.log('Navigate to Create Account');
    };

    return (
        <LinearGradient
            colors={[COLORS.backgroundGradientStart, COLORS.backgroundGradientEnd]}
            style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <LogoSection />

            <BottomSection
                onContinue={handleContinue}
                onCreateAccount={handleCreateAccount}
            />
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
});

export default SplashScreen;
