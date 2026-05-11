import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title="Settings" />

      <View>
        <Text>Settings screen</Text>
      </View>
    </ScreenContainer>
  );
}
