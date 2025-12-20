import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const TextDivider = ({ text }) => {
    return (
        <View style={styles.thenContainer}>
            <View style={styles.thenLine} />
            <Text style={styles.thenText}>{text}</Text>
            <View style={styles.thenLine} />
        </View>
    );
};

export default TextDivider;
