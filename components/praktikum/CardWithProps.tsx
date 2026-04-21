/**
 * CardWithProps.tsx
 *
 * Contoh Functional Component DENGAN PROPS.
 * Props = data yang dikirim dari component parent; bersifat read-only (tidak diubah dari dalam).
 *
 * Konsep: satu component bisa dipakai berkali-kali dengan data berbeda lewat props.
 * Panduan lengkap: doc/PRAKTIKUM_02_Functional_Component.md
 */

import { StyleSheet, Text, View } from 'react-native';

/**
 * Type untuk props — mendefinisikan "bentuk" data yang diterima component.
 * title wajib (string), subtitle opsional (string?) sehingga bisa tidak dikirim.
 */
type CardWithPropsType = {
  title: string;
  subtitle?: string;
};

/**
 * CardWithProps — menerima props lalu menampilkannya di UI.
 * Destructuring { title, subtitle } = langsung dapat variabel dari props, tidak perlu props.title.
 */
export default function CardWithProps({ title, subtitle }: CardWithPropsType) {
  return (
    <View style={styles.card}>
      {/* title selalu ditampilkan */}
      <Text style={styles.title}>{title}</Text>
      {/* subtitle hanya ditampilkan jika ada (conditional rendering) */}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
