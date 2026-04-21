/**
 * =============================================================================
 * _layout.tsx — Root Layout (Layar Akar Aplikasi)
 * =============================================================================
 *
 * File ini adalah "kerangka" paling luar dari app. Semua halaman (login, tabs,
 * modal) diatur di sini pakai Stack. Urutan tampil: pertama login, setelah
 * login user masuk ke (tabs), dan modal bisa dipanggil dari mana aja.
 *
 * Kenapa namanya _layout? Di Expo Router, file yang namanya diawali underscore
 * (_layout) = file layout, bukan halaman yang punya URL sendiri. Jadi /login
 * itu dari login.tsx, tapi "wadah" yang bikin bisa pindah dari login ke tabs
 * itu Stack di file ini.
 *
 * ----- Isi singkat -----
 * 1. unstable_settings: tentuin halaman pertama yang tampil (login).
 * 2. ThemeProvider: tema terang/gelap ikut setting HP.
 * 3. Stack: navigator tumpukan — login, (tabs), modal. initialRouteName
 *    bikin app selalu buka di login dulu.
 * 4. StatusBar: tampilan bar status (waktu, baterai) ikut tema.
 * =============================================================================
 */

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * unstable_settings — Pengaturan Awal Route
 * =============================================================================
 * initialRouteName: 'login' = waktu app baru dibuka, halaman pertama yang
 * ditampilkan adalah login. Tanpa ini, Expo Router bisa pakai route default
 * (misalnya langsung ke tabs). Nama "unstable" artinya API ini bisa berubah
 * di versi berikutnya, tapi untuk sekarang dipakai buat tentuin entry point.
 * =============================================================================
 */
export const unstable_settings = {
  initialRouteName: 'login',
};

/**
 * RootLayout — Komponen Layout Akar
 * =============================================================================
 * useColorScheme() = deteksi tema HP (terang/gelap). Dipakai buat ThemeProvider
 * dan StatusBar biar warna navigasi & status bar cocok sama tema.
 * =============================================================================
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    /* ThemeProvider: bungkus semua navigasi biar warna (tab, header, dll.)
       ikut tema. DarkTheme = tema gelap, DefaultTheme = tema terang. */
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Stack = navigator tumpukan: satu halaman di atas yang lain. Waktu
          pindah (misal login → tabs), halaman baru "numpuk" atau ganti (replace).
          initialRouteName="login" = layar pertama yang keluar waktu app buka. */}
      <Stack initialRouteName="login">
        {/* login: halaman form login. headerShown: false = enggak tampil
            bar judul di atas (kita pakai judul di dalam halaman). */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* (tabs): grup tab (Home, Explore, Praktikum, Modul). Satu "screen"
            di Stack, tapi isinya banyak tab. headerShown: false karena
            tiap tab punya tampilan sendiri. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* modal: halaman yang bisa dipanggil sebagai popup (presentation: 'modal').
            Biasanya dari template Expo; bisa dipakai buat about, settings, dll. */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      {/* StatusBar: bar di paling atas HP (waktu, baterai). style="auto" =
          ikut tema (terang/gelap). */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
