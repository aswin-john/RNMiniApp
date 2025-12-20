import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';

const styles = StyleSheet.create({
    settingsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 15,
        marginBottom: 25,
    },
    settingsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#3A3A3A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingsIconText: {
        fontSize: 18,
    },
    settingsTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '600',
    },
    settingsSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    settingsArrow: {
        color: COLORS.textSecondary,
        fontSize: 24,
    },
});

export default styles;
