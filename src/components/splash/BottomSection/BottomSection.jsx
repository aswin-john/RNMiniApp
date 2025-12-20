import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../common/Button/CustomButton';
import styles from './styles';

const BottomSection = ({ onContinue, onCreateAccount }) => {
    return (
        <View style={styles.bottomSection}>
            <CustomButton
                title="Continue to Login"
                onPress={onContinue}
            />

            <View style={styles.createAccountContainer}>
                <Text style={styles.newHereText}>New here? </Text>
                <TouchableOpacity onPress={onCreateAccount}>
                    <Text style={styles.createAccountText}>Create an account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BottomSection;
