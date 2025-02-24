/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Themes } from '@/src/core/presentation/themes/Themes';
import { useColorScheme } from './useColorScheme';

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Themes.light & keyof typeof Themes.dark
) {
	const theme = useColorScheme() ?? 'light';
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Themes[theme][colorName];
	}
}
