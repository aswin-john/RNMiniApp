import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../utils/constants';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
});

export default styles;
