import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../utils/constants';
import styles from './styles';

const CustomButton = ({
    title,
    onPress,
    colors = [COLORS.primary, COLORS.primaryDark],
    solid = false,
    backgroundColor = COLORS.primary,
    showArrow = true,
    arrow = '→',
    iconName = 'chevron-forward',
    iconSize = 20,
    iconColor,
    disabled = false,
    style,
    buttonStyle,
    textStyle,
    arrowStyle
}) => {
    const ContentWrapper = solid ? View : LinearGradient;
    const wrapperProps = solid
        ? { style: [styles.buttonGradient, { backgroundColor }, buttonStyle] }
        : {
            colors,
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
            style: [styles.buttonGradient, buttonStyle]
        };

    return (
        <TouchableOpacity
            style={[styles.continueButton, style, disabled && { opacity: 0.5 }]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <ContentWrapper {...wrapperProps}>
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                {showArrow && (
                    iconName ? (
                        <Icon
                            name={iconName}
                            size={iconSize}
                            color={iconColor || (textStyle?.color || COLORS.textInverse)}
                            style={arrowStyle}
                        />
                    ) : (
                        <Text style={[styles.arrow, arrowStyle]}>{arrow}</Text>
                    )
                )}
            </ContentWrapper>
        </TouchableOpacity>
    );
};

export default CustomButton;
