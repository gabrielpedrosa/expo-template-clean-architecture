/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "./types";

const BASE_ULR = "/";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL(BASE_ULR)],
  config: {
    screens: {
      NotFound: "*",
    },
  },
};

export default linking;