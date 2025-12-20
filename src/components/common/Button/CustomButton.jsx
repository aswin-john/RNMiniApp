import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const CustomButton = ({
    title,
    onPress,
    colors = [COLORS.primary, COLORS.primaryDark],
    showArrow = true,
    arrow = '→',
    style,
    buttonStyle,
    textStyle,
    arrowStyle
}) => {
    return (
        <TouchableOpacity
            style={[styles.continueButton, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.buttonGradient, buttonStyle]}>
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                {showArrow && <Text style={[styles.arrow, arrowStyle]}>{arrow}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CustomButton;
