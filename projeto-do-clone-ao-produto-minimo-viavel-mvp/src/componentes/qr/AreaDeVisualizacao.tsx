import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useStoreQrCode } from '../../estado/store';
import { useAuthStore } from '../../estado/authStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Layers, Loader2, Share2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { obterTemplatePorId } from './MoldurasTemplates';

export function AreaDeVisualizacao() {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const { 
    opcoes, 
    extensaoDownload, 
    setExtensaoDownload, 
    templateAtivo, 
    ehDinamico, 
    idCurto, 
    setIdCurto 
  } = useStoreQrCode();
  const { user } = useAuthStore();
  const qrCode = useRef<QRCodeStyling | null>(null);
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling(opcoes);
      qrCode.current.append(qrRef.current!);
    } else {
      qrCode.current.update(opcoes);
    }
  }, [opcoes]);

  const gerarIdCurto = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const salvarNoHistorico = async () => {
    if (!user) return;

    try {
      let finalIdCurto = idCurto;
      if (ehDinamico && !finalIdCurto) {
        finalIdCurto = gerarIdCurto();
        setIdCurto(finalIdCurto);
        
        // Criar link dinâmico
        await setDoc(doc(db, 'links_dinamicos', finalIdCurto), {
          idCurto: finalIdCurto,
          urlDestino: opcoes.data,
          usuarioId: user.uid,
          cliques: 0,
          criadoEm: serverTimestamp()
        });
      }

      await addDoc(collection(db, 'historico_qr_codes'), {
        usuarioId: user.uid,
        configuracoes: JSON.parse(JSON.stringify(opcoes)),
        ehDinamico,
        idCurto: finalIdCurto || null,
        templateAtivo,
        criadoEm: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  };

  const exportarPDF = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current, {
      backgroundColor: null,
      scale: 2
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('drei-qr-code.pdf');
  };

  const handleDownload = async () => {
    setProcessando(true);
    try {
      if (extensaoDownload === 'pdf') {
        await exportarPDF();
      } else if (qrCode.current) {
        qrCode.current.download({ extension: extensaoDownload });
      }
      
      await salvarNoHistorico();
    } catch (error) {
      console.error('Erro no download:', error);
    } finally {
      setProcessando(false);
    }
  };

  const template = obterTemplatePorId(templateAtivo);

  return (
    <div className="space-y-8">
      <div 
        ref={containerRef}
        className="glass-card p-12 rounded-[3rem] flex flex-col items-center relative overflow-hidden transition-all duration-500"
      >
        {/* Efeito de Brilho de Fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sparkles className="h-32 w-32" />
        </div>

        <motion.div 
          layout
          className={`relative z-10 p-2 rounded-[2rem] transition-all duration-500 ${template.estilo ? 'shadow-2xl' : ''}`}
        >
          <div className="bg-white p-8 rounded-[1.8rem] shadow-inner border border-black/5">
            <div ref={qrRef} className="min-h-[280px] min-w-[280px] flex items-center justify-center" />
          </div>
          
          <AnimatePresence>
            {template.texto && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 py-3 px-6 rounded-2xl text-center ${template.estilo} shadow-lg`}
              >
                <span className="text-white font-black text-sm tracking-[0.2em] uppercase">
                  {template.texto}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md relative z-10">
          <Button 
            onClick={handleDownload} 
            disabled={processando}
            className="btn-dopamine w-full sm:flex-1 h-16 text-white font-black text-lg rounded-2xl group"
          >
            {processando ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Download className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                BAIXAR AGORA
              </>
            )}
          </Button>
          
          <Select value={extensaoDownload} onValueChange={(val: any) => setExtensaoDownload(val)}>
            <SelectTrigger className="w-full sm:w-[130px] h-16 rounded-2xl bg-muted/50 border-border/50 font-black text-sm">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/50 glass-card">
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="webp">WEBP</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Alta Resolução</span>
          </div>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-2">
            <Share2 className="h-3 w-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Pronto para Compartilhar</span>
          </div>
        </div>
      </div>
      
      {ehDinamico && idCurto && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl border-primary/20 flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Link Dinâmico Ativo</p>
            <p className="font-mono text-sm font-bold">ID: {idCurto}</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl font-bold">
            Gerenciar Link
          </Button>
        </motion.div>
      )}
    </div>
  );
}
