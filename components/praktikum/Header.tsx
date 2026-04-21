/**
 * Header.tsx
 *
 * Component Header reusable — menampilkan judul (dan opsional subtitle) di bagian atas.
 * Bagian dari target pelajaran: Header, Card, CustomButton, Counter.
 * Disimpan di components/praktikum/ bersama component praktikum lainnya.
 *
 * Konsep: Functional Component dengan PROPS (title wajib, subtitle opsional).
 * Contoh pemakaian: <Header title="Praktikum 2" subtitle="Pemrograman Mobile II" />
 */

import { StyleSheet, Text, View } from 'react-native';

/**
 * Type untuk props Header.
 * title = judul utama (wajib).
 * subtitle = teks di bawah judul (opsional; pakai ? agar bisa tidak dikirim).
 */
type HeaderProps = {
  title: string;
  subtitle?: string;
};

/**
 * Header — menerima props lalu menampilkan judul dan subtitle (jika ada).
 * Destructuring { title, subtitle } = mengambil nilai langsung dari props.
 */
export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Judul utama — selalu ditampilkan */}
      <Text style={styles.title}>{title}</Text>
      {/* Subtitle hanya di-render jika ada (conditional rendering); kurung kurawal { } untuk ekspresi JSX */}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

/**
 * StyleSheet.create — mendefinisikan style sekali, dipakai berulang.
 * container = pembungkus; borderBottom memberi garis pemisah di bawah header.
 */
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
