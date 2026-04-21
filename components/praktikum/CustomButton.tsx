/**
 * CustomButton.tsx
 *
 * Component tombol reusable dengan props: title (teks tombol), onPress (aksi saat diklik),
 * dan variant (primary/secondary) untuk tampilan berbeda.
 * Bagian dari target pelajaran: Header, Card, CustomButton, Counter.
 * Disimpan di components/praktikum/ bersama component praktikum lainnya.
 *
 * Konsep: Functional Component dengan PROPS; memakai Pressable (bukan Button)
 * agar styling lebih fleksibel (warna, border, efek pressed).
 *
 * Contoh pemakaian:
 *   <CustomButton title="Simpan" onPress={() => alert('Simpan')} />
 *   <CustomButton title="Batal" variant="secondary" onPress={() => ...} />
 */

import { Pressable, StyleSheet, Text } from 'react-native';

/**
 * Type untuk props CustomButton.
 * title = teks yang tampil di tombol (wajib).
 * onPress = function yang dipanggil saat tombol ditekan (wajib).
 * variant = tampilan: 'primary' (isi warna) atau 'secondary' (outline); opsional, default 'primary'.
 */
type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

/**
 * CustomButton — tombol yang menampilkan title dan menjalankan onPress saat diklik.
 * variant default 'primary' sehingga tidak wajib dikirim dari parent.
 */
export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
}: CustomButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
        {title}
      </Text>
    </Pressable>
  );
}

/**
 * Penjelasan style:
 *
 * - style={({ pressed }) => [...]}  → Pressable memberi callback dengan state pressed (true saat user menekan).
 * - Array style [...]  → style bisa digabung; yang belakang menimpa yang depan jika bentrok.
 * - pressed && styles.pressed  → saat ditekan, tambahkan opacity 0.8 untuk feedback visual.
 * - primary = tombol isi (background biru); secondary = tombol outline (border biru, background putih).
 */
const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#0a7ea4',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: '#0a7ea4',
  },
});
