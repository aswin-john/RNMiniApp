import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    emptyEmoji: {
        fontSize: 50,
        marginBottom: 15,
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
});

export default styles;
