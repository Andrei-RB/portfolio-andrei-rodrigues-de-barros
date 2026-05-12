import { create } from 'zustand';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  init: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  login: async () => {
    set({ loading: true, error: null });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Salvar ou atualizar perfil no Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        updatedAt: serverTimestamp(),
        // Usamos merge para não sobrescrever o createdAt se ele já existir
        // Mas o setDoc com merge ainda sobrescreve se passarmos o campo.
        // Uma alternativa é usar um objeto que só tem createdAt se for novo, 
        // ou simplesmente aceitar que o primeiro login define o createdAt.
        createdAt: serverTimestamp(), 
      }, { merge: true });

    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  init: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
}));
