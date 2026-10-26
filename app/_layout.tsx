import { TrueSheetProvider } from '@lodev09/react-native-true-sheet';
import { Sheet } from '@lodev09/react-native-true-sheet/navigation/expo-router';

// No screen uses `reanimated: true`, and react-native-reanimated isn't installed.
export default function RootLayout() {
  return (
    <TrueSheetProvider>
      <Sheet>
        <Sheet.Screen name="index" />
        <Sheet.Screen name="sheet" options={{ detents: [0.5] }} />
      </Sheet>
    </TrueSheetProvider>
  );
}
