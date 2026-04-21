/**
 * praktikum.tsx — Halaman (Screen) Tab "Praktikum"
 *
 * File ini adalah satu halaman penuh yang ditampilkan ketika user memilih tab "Praktikum"
 * di tab bar bawah. Isinya: menyusun dan menampilkan semua contoh component dari folder
 * components/praktikum/ (HelloFunctional, CardWithProps, Counter) dalam satu layar scroll.
 *
 * Expo Router: nama file = route. Jadi praktikum.tsx = route /(tabs)/praktikum.
 * Layout tab didefinisikan di app/(tabs)/_layout.tsx.
 */

import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Import component sesuai target pelajaran — semuanya dari folder components/praktikum/
import Header from '@/components/praktikum/Header';
import CustomButton from '@/components/praktikum/CustomButton';
import HelloFunctional from '@/components/praktikum/HelloFunctional';
import CardWithProps from '@/components/praktikum/CardWithProps';
import Counter from '@/components/praktikum/Counter';

/**
 * PraktikumScreen — Functional component yang me-render satu halaman.
 * ScrollView memungkinkan konten di-scroll jika melebihi tinggi layar.
 */
export default function PraktikumScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}>
      {/* ========== TARGET PELAJARAN HARI INI ========== */}
      <Header
        title="Target Pelajaran Hari Ini"
        subtitle="1. Folder components · 2. Header, Card, CustomButton · 3. Counter (useState)"
      />

      {/* Header — component di folder components/ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✓ Header</Text>
        <Header title="Praktikum 2" subtitle="Pemrograman Mobile II - Expo" />
      </View>

      {/* Card — component Card (CardWithProps) dengan props */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✓ Card</Text>
        <CardWithProps title="Ini Card component" subtitle="Menerima props title dan subtitle." />
      </View>

      {/* CustomButton — component tombol dengan props title & onPress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✓ CustomButton</Text>
        <CustomButton title="Tombol Primary" onPress={() => alert('CustomButton diklik!')} />
        <View style={{ height: 8 }} />
        <CustomButton
          title="Tombol Secondary"
          variant="secondary"
          onPress={() => alert('Secondary diklik!')}
        />
      </View>

      {/* Counter — component dengan useState */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✓ Counter (useState)</Text>
        <Counter />
      </View>

      {/* ========== Contoh tambahan (Functional Component) ========== */}
      <Text style={styles.title}>Contoh Lain: Functional Component</Text>
      <Text style={styles.subtitle}>Tanpa props · Dengan props · State</Text>

      {/* Section 1: Contoh component tanpa props */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. HelloFunctional (tanpa props)</Text>
        <HelloFunctional />
      </View>

      {/* Section 2: Contoh component dengan props — dipanggil 3x dengan data berbeda */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. CardWithProps (dengan props)</Text>
        <CardWithProps title="Card pertama" subtitle="Ini contoh component dengan props." />
        <CardWithProps title="Card kedua" subtitle="Props bisa optional (subtitle)." />
        <CardWithProps title="Card tanpa subtitle" />
        <CardWithProps title="Belajar React Native" subtitle="Expo memudahkan development cross-platform." />
        <CardWithProps title="Functional Component" subtitle="Menerima data lewat props dari parent." />
        <CardWithProps title="Satu component, banyak tampilan" />
      </View>

      {/* Counter (useState) sudah ditampilkan sekali di blok Target Pelajaran di atas — tidak diulang di sini */}

      {/* Penunjuk ke panduan lengkap */}
      <Text style={styles.footer}>
        Panduan lengkap: doc/PRAKTIKUM_02_Functional_Component.md
      </Text>
    </ScrollView>
  );
}

/**
 * Style untuk halaman.
 * container = style untuk ScrollView itu sendiri (flex: 1 agar isi layar).
 * contentContainerStyle = style untuk "isi di dalam" ScrollView (padding, dll.).
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    marginTop: 16,
  },
});
