/**
 * Counter.tsx
 *
 * Contoh Functional Component DENGAN STATE (useState).
 * State = data yang bisa berubah di dalam component; saat berubah, React akan render ulang UI.
 *
 * Konsep: useState(0) mengembalikan [nilaiSaatIni, fungsiUbahNilai].
 * Jangan ubah nilai langsung; selalu pakai setCount agar React mendeteksi perubahan.
 * Panduan lengkap: doc/PRAKTIKUM_02_Functional_Component.md
 */

import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

/**
 * Counter — component dengan state lokal untuk angka.
 * Setiap tombol diklik, setCount dipanggil → state berubah → component di-render ulang → UI ter-update.
 */
export default function Counter() {
  /**
   * useState(0) — nilai awal count = 0.
   * count = nilai saat ini, setCount = function untuk mengubah count (misalnya setCount(1)).
   */
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      {/* Menampilkan nilai count; kurung kurawal { } untuk menempatkan variabel/ekspresi di JSX */}
      <Text style={styles.label}>Count: {count}</Text>

      {/* View dengan flexDirection: 'row' agar kedua tombol sejajar horizontal */}
      <View style={styles.row}>
        {/* Pressable = komponen yang bisa ditekan; lebih fleksibel dari Button untuk styling */}
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => setCount(count - 1)}>
          <Text style={styles.buttonText}>Kurangi</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonPrimary,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => setCount(count + 1)}>
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Tambah</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2e7d32',
  },
  buttonPrimary: {
    backgroundColor: '#2e7d32',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  buttonTextPrimary: {
    color: '#fff',
  },
});
