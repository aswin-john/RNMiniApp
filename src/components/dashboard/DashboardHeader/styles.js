import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: COLORS.background,
        fontFamily: FONTS.bold,
        fontSize: 20,
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        borderWidth: 2,
        borderColor: COLORS.background,
    },
    headerText: {
        marginLeft: 12,
    },
    greeting: {
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        fontSize: 18,
    },
    welcomeBack: {
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        color: COLORS.text,
        fontSize: 18,
    },
});

export default styles;
