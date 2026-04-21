/**
 * =============================================================================
 * icon-symbol.ios.tsx — Komponen Ikon untuk iOS (SF Symbols)
 * =============================================================================
 *
 * File ini dipakai khusus di iOS. Ekstensi .ios.tsx artinya: waktu app jalan
 * di iPhone/iPad, React Native akan pakai file INI (icon-symbol.ios.tsx).
 * Di Android & web, yang dipakai adalah icon-symbol.tsx (tanpa .ios) yang
 * pakai Material Icons.
 *
 * Kenapa beda? Di iOS ada SF Symbols (ikon native Apple) yang tampil lebih
 * rapi dan konsisten dengan sistem. Jadi di iOS kita pakai SymbolView dari
 * expo-symbols; di Android/web kita pakai MaterialIcons dengan mapping nama.
 *
 * ----- Isi file -----
 * 1. Import: SymbolView & type dari expo-symbols, type style dari React Native.
 * 2. IconSymbol: komponen dengan props name, size, color, style, weight.
 *    Langsung pass name ke SymbolView (enggak ada mapping), karena SF Symbols
 *    dipakai asli di sini.
 * =============================================================================
 */

import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * IconSymbol (versi iOS) — Tampilkan Ikon SF Symbols
 * =============================================================================
 * Di iOS, kita enggak perlu map nama ke Material Icons; SymbolView terima
 * langsung nama SF Symbol (name). Props:
 *
 *   name   = nama ikon SF Symbol (misal 'house.fill', 'folder.fill'). Wajib.
 *   size   = lebar & tinggi ikon (px). Default 24.
 *   color  = warna ikon (tintColor).
 *   style  = style tambahan (opsional).
 *   weight = ketebalan ikon: 'regular', 'medium', 'bold', dll. Default 'regular'.
 *
 * Return: SymbolView dengan width/height dari size, supaya ukuran ikon sesuai.
 * resizeMode="scaleAspectFit" = ikon di-scale proporsional di dalam kotak.
 * =============================================================================
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        /* width & height dari prop size, biar ikon segi empat dengan ukuran
           yang kita mau. style dari props digabung di belakang (override). */
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
