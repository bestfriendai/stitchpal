import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { colors } from '../src/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="pattern/[id]" 
          options={{ 
            headerShown: false,
            presentation: 'card',
          }} 
        />
        <Stack.Screen 
          name="pattern/new" 
          options={{ 
            headerShown: false,
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="project/[id]" 
          options={{ 
            headerShown: false,
            presentation: 'card',
          }} 
        />
        <Stack.Screen 
          name="project/new" 
          options={{ 
            headerShown: false,
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal',
          }} 
        />
        <Stack.Screen 
          name="paywall" 
          options={{ 
            headerShown: false,
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            headerShown: false,
            presentation: 'card',
          }} 
        />
      </Stack>
    </>
  );
}
