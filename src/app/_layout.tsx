import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ReaderProvider, useReader } from '../components/ReaderProvider';
import { themes } from '../lib/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

function ReaderStack() {
  const { theme } = useReader();
  return <>
    <StatusBar style={theme === 'night' ? 'light' : 'dark'} />
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: themes[theme].background } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="scene" options={{ presentation: 'modal' }} />
    </Stack>
  </>;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({ Literata: require('../../assets/fonts/Literata.ttf') });
  useEffect(() => { if (loaded || error) SplashScreen.hideAsync().catch(() => {}); }, [loaded, error]);
  if (!loaded && !error) return null;
  return <ReaderProvider><ReaderStack /></ReaderProvider>;
}
