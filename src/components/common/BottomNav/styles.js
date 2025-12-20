import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../utils/constants';

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: COLORS.surface,
        paddingVertical: 10,
        paddingBottom: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        alignItems: 'center',
        paddingVertical: 5,
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
        opacity: 0.5,
    },
    navIconActive: {
        fontSize: 20,
        marginBottom: 4,
    },
    navText: {
        color: COLORS.textMuted,
        fontSize: 11,
    },
    navTextActive: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
        fontSize: 11,
    },
    fabContainer: {
        marginTop: -30,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    fabIcon: {
        color: COLORS.background,
        fontSize: 28,
        fontWeight: '300',
    },
});

export default styles;
