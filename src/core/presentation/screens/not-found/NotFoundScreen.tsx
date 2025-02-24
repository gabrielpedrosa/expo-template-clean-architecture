import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { RootStackScreenProps } from "../../navigation/types";
// import { useI18n } from "@core/presentation/hooks/useI18n";
// import { PortraitStrategy } from "./strategies/PortraitStrategy";
// import { Smile } from 'assets/icons';


export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
//   const i18n = useI18n();
//   const styles = new PortraitStrategy().getStyles();

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <StatusBar hidden={true} />
      <Text>Not Found</Text>
      {/* <Smile style={styles.icon} width={200} height={200} /> */}
      {/* <Text style={styles.title}>{i18n.t("core.errors.screenNotFound")}</Text> */}
      {/* <TouchableOpacity onPress={() => navigation.replace("Login")}> */}
        {/* <Text>{i18n.t("core.screens.NotFound.goHome")}</Text> */}
      {/* </TouchableOpacity> */}
    </View>
  );
}