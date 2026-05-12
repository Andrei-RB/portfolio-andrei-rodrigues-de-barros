import React from 'react';
import { useStoreQrCode, TemplateMoldura } from '../../estado/store';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Smartphone, Wifi, Utensils, Info } from 'lucide-react';

const TEMPLATES: TemplateMoldura[] = [
  { id: 'padrao', nome: 'Padrão', texto: '', estilo: '' },
  { id: 'acesse', nome: 'Acesse Aqui', texto: 'ACESSE AQUI', estilo: 'bg-primary' },
  { id: 'wifi', nome: 'Wi-Fi', texto: 'CONECTAR WI-FI', estilo: 'bg-blue-600' },
  { id: 'cardapio', nome: 'Cardápio', texto: 'VER CARDÁPIO', estilo: 'bg-emerald-600' },
  { id: 'info', nome: 'Informação', texto: 'MAIS INFO', estilo: 'bg-amber-600' },
];

export function MoldurasTemplates() {
  const { templateAtivo, setTemplateAtivo } = useStoreQrCode();

  return (
    <div className="flex flex-wrap gap-3">
      {TEMPLATES.map((template) => {
        const Icone = {
          padrao: Smartphone,
          acesse: Smartphone,
          wifi: Wifi,
          cardapio: Utensils,
          info: Info,
        }[template.id] || Smartphone;

        return (
          <motion.div key={template.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={templateAtivo === template.id ? 'default' : 'outline'}
              onClick={() => setTemplateAtivo(template.id === 'padrao' ? null : template.id)}
              className={`h-auto py-3 px-4 flex flex-col items-center gap-2 rounded-2xl transition-all ${
                templateAtivo === template.id ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-black' : 'border-border/50'
              }`}
            >
              <Icone className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{template.nome}</span>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}

export const obterTemplatePorId = (id: string | null) => TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
