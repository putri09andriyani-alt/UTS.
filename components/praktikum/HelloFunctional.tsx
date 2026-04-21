/**
 * HelloFunctional.tsx
 *
 * Contoh paling sederhana: Functional Component TANPA props dan TANPA state.
 * Digunakan untuk memperkenalkan bentuk dasar component di React/React Native.
 *
 * Konsep: function yang return JSX = satu "blok" UI yang bisa dipakai berulang.
 * Panduan lengkap: doc/PRAKTIKUM_02_Functional_Component.md
 */

import { StyleSheet, Text, View } from "react-native";

/**
 * HelloFunctional — Functional component tanpa parameter.
 * Setiap kali dipanggil, selalu menampilkan teks yang sama.
 * Export default agar bisa di-import di file lain: import HelloFunctional from '...'
 */
export default function HelloFunctional() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Halo, ini adalah halaman HelloFunctional di Expo React Native!
      </Text>
    </View>
  );
}

/**
 * StyleSheet.create — mendefinisikan style sekali, dipakai berulang.
 * Keuntungan: performa lebih baik dan style terpusat.
 * Di React Native, style pakai camelCase (backgroundColor, borderRadius, dll.).
 */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: "#1565c0",
  },
});
