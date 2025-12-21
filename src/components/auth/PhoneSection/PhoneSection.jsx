import React from 'react';
import { View, Text } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const PhoneSection = ({
    phoneInputRef,
    value,
    onChangeText,
    onChangeFormattedText,
    error
}) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <PhoneInput
                ref={phoneInputRef}
                defaultValue={value}
                defaultCode="IN"
                layout="first"
                onChangeText={onChangeText}
                onChangeFormattedText={onChangeFormattedText}
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.phoneTextContainer}
                textInputStyle={styles.phoneTextInput}
                codeTextStyle={styles.phoneCodeText}
                flagButtonStyle={styles.phoneFlagButton}
                renderDropdownImage={<Icon name="chevron-down" size={12} color="white" />}
                placeholder="Enter mobile number"
                withDarkTheme
                autoFocus={false}
            />
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
        </View>
    );
};

export default PhoneSection;
