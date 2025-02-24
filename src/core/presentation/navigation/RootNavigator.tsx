import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import NotFoundScreen from "../screens/not-found/NotFoundScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
	const initialRouteName: keyof RootStackParamList = "NotFound";

	return (
		<Stack.Navigator initialRouteName={initialRouteName} 
			screenOptions={{ headerShown: false }}>
			<Stack.Screen name="NotFound" component={NotFoundScreen} />
		</Stack.Navigator>
	);
}