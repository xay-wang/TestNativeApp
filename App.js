// App.js
import React, { useState, useEffect, useCallback } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './context/CartContext';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen
import { useFonts } from 'expo-font'; // Import useFonts
import {
  NotoSans_100Thin,
  NotoSans_200ExtraLight,
  NotoSans_300Light,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
  NotoSans_800ExtraBold,
  NotoSans_900Black,
} from '@expo-google-fonts/noto-sans'; // Import the Noto Sans weights you want to use

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    // Map the font names you'll use in your StyleSheet to the imported font modules
    'NotoSans-Thin': NotoSans_100Thin,
    'NotoSans-ExtraLight': NotoSans_200ExtraLight,
    'NotoSans-Light': NotoSans_300Light,
    'NotoSans-Regular': NotoSans_400Regular,
    'NotoSans-Medium': NotoSans_500Medium,
    'NotoSans-SemiBold': NotoSans_600SemiBold,
    'NotoSans-Bold': NotoSans_700Bold,
    'NotoSans-ExtraBold': NotoSans_800ExtraBold,
    'NotoSans-Black': NotoSans_900Black,
    // Add other font variants if you plan to use them
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide only when fonts are fully loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If fonts are not yet loaded, return null to keep the splash screen visible
  if (!fontsLoaded) {
    return null;
  }

  return (
    <CartProvider>
      {/* Pass the onLayout prop to the root component of your app, which is AppNavigator */}
      <AppNavigator onLayout={onLayoutRootView} />
    </CartProvider>
  );
}