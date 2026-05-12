import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuthStore } from '../../estado/authStore';
import { useStoreQrCode } from '../../estado/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Trash2, Edit3, ExternalLink, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function GaleriaHistorico() {
  const { user } = useAuthStore();
  const { resetarParaEdicao } = useStoreQrCode();
  const [historico, setHistorico] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!user) {
      setHistorico([]);
      setCarregando(false);
      return;
    }

    const q = query(
      collection(db, 'historico_qr_codes'),
      where('usuarioId', '==', user.uid),
      orderBy('criadoEm', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistorico(itens);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, [user]);

  const excluirItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'historico_qr_codes', id));
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl">
          <History className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-black tracking-tight uppercase">Seu Histórico</h3>
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-muted/30 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : historico.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-3xl border-dashed border-2">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground font-medium">Nenhum QR Code salvo ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {historico.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="glass-card border-0 group overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 overflow-hidden">
                        <p className="text-xs font-black text-primary uppercase tracking-widest">
                          {item.ehDinamico ? 'Dinâmico' : 'Estático'}
                        </p>
                        <p className="font-bold truncate text-sm">{item.configuracoes.data}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary"
                          onClick={() => resetarParaEdicao(item)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-destructive/10 text-destructive"
                          onClick={() => excluirItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      <span>{new Date(item.criadoEm?.toDate()).toLocaleDateString('pt-BR')}</span>
                      {item.ehDinamico && (
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          {item.idCurto}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
