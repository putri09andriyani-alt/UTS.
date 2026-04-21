/**
 * =============================================================================
 * login.tsx — Halaman Demo Login
 * =============================================================================
 *
 * Halaman ini tampil pertama kali saat aplikasi dibuka. Setelah user menekan
 * "Masuk", aplikasi mengarahkan ke tab utama (Home, Explore, Praktikum, Modul).
 * Ini demo saja: tidak ada validasi ke server; cukup tekan Masuk untuk lanjut.
 *
 * ----- Struktur file -----
 * 1. Import: router (untuk pindah halaman), useState, komponen UI (TextInput,
 *    Pressable, dll), SafeAreaView.
 * 2. LoginScreen: state untuk email & password, fungsi handleMasuk, lalu return
 *    tampilan (form + tombol Masuk).
 * 3. styles: StyleSheet buat tampilan (warna, ukuran, jarak).
 * =============================================================================
 */

/* ----- Import dari expo-router: dipakai buat pindah halaman setelah login ----- */
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * LoginScreen — Komponen halaman login.
 * Export default = file ini "nge-export" satu komponen utama; waktu route /login
 * dibuka, Expo Router akan render komponen ini.
 */
export default function LoginScreen() {
  /* ----- State: data yang bisa berubah waktu user ngetik -----
     useState('') = nilai awal kosong. setEmail / setPassword dipanggil waktu
     user ngetik di TextInput (onChangeText). Nilai ini dipakai di value={email}
     dan value={password} supaya kotak isian ter-update (controlled input). */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* handleMasuk: dipanggil waktu tombol "Masuk" ditekan.
     router.replace('/(tabs)') = ganti halaman ke tab utama dan buang history
     login dari stack, jadi user enggak bisa "back" ke layar login. */
  const handleMasuk = () => {
    router.replace('/(tabs)');
  };

  return (
    /* SafeAreaView = area aman (enggak kena notch atau tombol home). edges:
       top & bottom biar konten enggak tertutup status bar / home indicator. */
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* KeyboardAvoidingView: waktu keyboard muncul (user ngetik), konten
          naik supaya form enggak kehalang. behavior 'padding' di iOS bikin
          padding bawah; di Android sering enggak perlu (undefined). */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        {/* ScrollView: kalau layar kecil atau keyboard besar, user bisa scroll.
            keyboardShouldPersistTaps="handled" = tap di luar keyboard tetap
            dianggap "handled" jadi keyboard bisa nutup pas tap tombol Masuk. */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>Selamat Datang</Text>
            <Text style={styles.subtitle}>Demo Login — isi bebas lalu tekan Masuk</Text>

            {/* Input email/NIM: value dari state, onChangeText update state.
                autoCapitalize="none" & keyboardType="email-address" bikin
                keyboard cocok buat ngetik email. */}
            <TextInput
              style={styles.input}
              placeholder="Email atau NIM"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
            {/* Input password: secureTextEntry = teks disembunyikan (titik-titik). */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Tombol Masuk: style bisa pakai fungsi (pressed) buat ubah tampilan
                waktu ditekan (opacity). onPress panggil handleMasuk. */}
            <Pressable
              style={({ pressed }) => [styles.btnMasuk, pressed && styles.btnPressed]}
              onPress={handleMasuk}>
              <Text style={styles.btnMasukText}>Masuk</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* =============================================================================
   STYLE — Tampilan (warna, ukuran, jarak)
   =============================================================================
   StyleSheet.create bikin object style yang dipakai di component. Nama property
   (container, card, input, dll.) sama dengan yang dipakai di style={styles.xxx}.
   flex: 1 = ambil sisa ruang. padding = jarak dalam, margin = jarak luar.
   borderRadius = sudut membulat. shadow* & elevation = bayangan (iOS vs Android).
   ============================================================================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingVertical: 48,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e8ecf0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6c6c6c',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  btnMasuk: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  btnPressed: {
    opacity: 0.88,
  },
  btnMasukText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
