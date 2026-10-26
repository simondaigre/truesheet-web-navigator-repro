import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <View style={{ padding: 24 }}>
      <Link href="/sheet">Open the sheet</Link>
    </View>
  );
}
