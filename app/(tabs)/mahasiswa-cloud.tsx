/**
 * mahasiswa-cloud.tsx — Full CRUD (Create, Read, Update, Delete)
 */

import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type MahasiswaRow = {
  id: string;
  nim: string;
  nama: string;
  prodi: string;
  kelas: string | null;
  created_at: string;
};

export default function MahasiswaCloudScreen() {
  const [rows, setRows] = useState<MahasiswaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // State Form & UI
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // State untuk Edit
  const [form, setForm] = useState({ nim: '', nama: '', prodi: '', kelas: '' });

  const configured = isSupabaseConfigured();

  // 1. READ: Ambil Data
  const loadData = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('mahasiswa')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setRows((data as MahasiswaRow[]) ?? []);
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // 2. CREATE & UPDATE: Simpan Data
  const handleSave = async () => {
    if (!form.nim || !form.nama || !form.prodi) {
      Alert.alert('Peringatan', 'Mohon isi NIM, Nama, dan Prodi.');
      return;
    }

    setIsSubmitting(true);

    if (editingId) {
      // PROSES EDIT (UPDATE)
      const { data, error } = await supabase
        .from('mahasiswa')
        .update(form)
        .eq('id', editingId)
        .select();

      if (error) {
        Alert.alert('Gagal Update', error.message);
      } else if (data) {
        // Update list secara lokal agar responsif
        setRows((prev) => prev.map((item) => (item.id === editingId ? (data[0] as MahasiswaRow) : item)));
        closeModal();
      }
    } else {
      // PROSES TAMBAH (CREATE)
      const { data, error } = await supabase.from('mahasiswa').insert([form]).select();
      if (error) {
        Alert.alert('Gagal Simpan', error.message);
      } else if (data) {
        setRows((prev) => [data[0] as MahasiswaRow, ...prev]);
        closeModal();
      }
    }
    setIsSubmitting(false);
  };

  // 3. DELETE: Hapus Data
  const handleDelete = (id: string, nama: string) => {
    Alert.alert('Hapus', `Yakin hapus ${nama}?`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase.from('mahasiswa').delete().eq('id', id);
          if (!error) setRows((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  // Helper buka modal edit
  const openEditModal = (item: MahasiswaRow) => {
    setEditingId(item.id);
    setForm({
      nim: item.nim,
      nama: item.nama,
      prodi: item.prodi,
      kelas: item.kelas ?? '',
    });
    setModalVisible(true);
  };

  // Helper tutup modal
  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setForm({ nim: '', nama: '', prodi: '', kelas: '' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Daftar Mahasiswa</Text>
          <Text style={styles.subtitle}>{rows.length} Mahasiswa Terdaftar</Text>
        </View>
        <Pressable style={styles.btnAddMain} onPress={() => setModalVisible(true)}>
          <Text style={styles.btnAddMainText}>+ Tambah</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} />}
      >
        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#0a7ea4" style={{ marginTop: 50 }} />
        ) : (
          rows.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardNim}>{item.nim}</Text>
                <Text style={styles.cardNama}>{item.nama}</Text>
                <Text style={styles.cardProdi}>{item.prodi} • {item.kelas || '-'}</Text>
              </View>
              
              <View style={styles.actionRow}>
                <Pressable onPress={() => openEditModal(item)} style={styles.btnEdit}>
                  <Text style={styles.btnEditText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handleDelete(item.id, item.nama)} style={styles.btnDelete}>
                  <Text style={styles.btnDeleteText}>Hapus</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* MODAL (TAMBAH & EDIT) */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingId ? 'Edit Data' : 'Tambah Mahasiswa'}</Text>
            
            <TextInput placeholder="NIM" style={styles.input} value={form.nim} onChangeText={(v) => setForm({...form, nim: v})} />
            <TextInput placeholder="Nama Lengkap" style={styles.input} value={form.nama} onChangeText={(v) => setForm({...form, nama: v})} />
            <TextInput placeholder="Prodi" style={styles.input} value={form.prodi} onChangeText={(v) => setForm({...form, prodi: v})} />
            <TextInput placeholder="Kelas" style={styles.input} value={form.kelas} onChangeText={(v) => setForm({...form, kelas: v})} />

            <View style={styles.modalAction}>
              <Pressable style={styles.btnCancel} onPress={closeModal}>
                <Text style={{ color: '#666' }}>Batal</Text>
              </Pressable>
              <Pressable style={styles.btnSave} onPress={handleSave} disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnSaveText}>{editingId ? 'Update' : 'Simpan'}</Text>}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#003049' },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, paddingTop: 15, paddingBottom: 20,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0'
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  subtitle: { fontSize: 13, color: '#888' },
  btnAddMain: { backgroundColor: '#0a7ea4', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  btnAddMainText: { color: '#fff', fontWeight: 'bold' },
  card: { 
    backgroundColor: '#fff', padding: 18, borderRadius: 16, marginTop: 15, 
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
  },
  cardNim: { fontSize: 12, color: '#0a7ea4', fontWeight: '800' },
  cardNama: { fontSize: 17, fontWeight: '700', color: '#333', marginVertical: 4 },
  cardProdi: { fontSize: 14, color: '#777' },
  actionRow: { flexDirection: 'row', gap: 8 },
  btnEdit: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#e6f7ff', borderRadius: 10 },
  btnEditText: { color: '#1890ff', fontWeight: '700', fontSize: 13 },
  btnDelete: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#fff5f5', borderRadius: 10 },
  btnDeleteText: { color: '#ff4d4f', fontWeight: '700', fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: '#fff', borderRadius: 24, padding: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 15, marginBottom: 15, fontSize: 15 },
  modalAction: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 10 },
  btnCancel: { padding: 15, flex: 1, alignItems: 'center' },
  btnSave: { backgroundColor: '#0a7ea4', paddingVertical: 15, flex: 2, borderRadius: 12, alignItems: 'center' },
  btnSaveText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
}); 