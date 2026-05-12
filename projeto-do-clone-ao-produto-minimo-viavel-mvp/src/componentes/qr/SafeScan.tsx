import React, { useEffect } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStoreQrCode, TipoSeguranca } from '../../estado/store';

export function SafeScan() {
  const { opcoes, statusSeguranca, setStatusSeguranca } = useStoreQrCode();

  useEffect(() => {
    if (!opcoes.data) {
      setStatusSeguranca('pendente');
      return;
    }

    const analisarUrl = async () => {
      setStatusSeguranca('analisando');
      
      // Simulação de análise por IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const url = opcoes.data.toLowerCase();
      if (url.includes('bit.ly') || url.includes('tinyurl') || url.includes('t.co')) {
        setStatusSeguranca('suspeito');
      } else if (url.includes('malware') || url.includes('phishing') || url.includes('virus')) {
        setStatusSeguranca('perigoso');
      } else if (url.startsWith('http')) {
        setStatusSeguranca('seguro');
      } else {
        setStatusSeguranca('pendente');
      }
    };

    analisarUrl();
  }, [opcoes.data, setStatusSeguranca]);

  const renderizarStatus = () => {
    switch (statusSeguranca) {
      case 'analisando':
        return (
          <div className="flex items-center gap-2 text-primary animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest">Analisando Segurança...</span>
          </div>
        );
      case 'seguro':
        return (
          <div className="flex items-center gap-2 text-emerald-500">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Link Seguro</span>
          </div>
        );
      case 'suspeito':
        return (
          <div className="flex items-center gap-2 text-amber-500">
            <ShieldAlert className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Link Suspeito</span>
          </div>
        );
      case 'perigoso':
        return (
          <div className="flex items-center gap-2 text-rose-500">
            <ShieldX className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Link Perigoso</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-6 flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={statusSeguranca}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {renderizarStatus()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
