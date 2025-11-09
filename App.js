import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { TrackerProvider } from './src/context/TrackerContext';

export default function App() {
  return (
    <TrackerProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </TrackerProvider>
  );
}
