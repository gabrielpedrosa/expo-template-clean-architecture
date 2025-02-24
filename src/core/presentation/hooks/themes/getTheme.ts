/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Themes } from '@/src/core/presentation/themes/Themes';
import { useColorScheme } from './useColorScheme';

export function getTheme() {
    const theme = useColorScheme() ?? 'light';

    return Themes[theme];
}
