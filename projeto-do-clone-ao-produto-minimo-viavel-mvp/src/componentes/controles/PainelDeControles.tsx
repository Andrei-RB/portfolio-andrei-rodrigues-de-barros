import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStoreQrCode } from '../../estado/store';
import { SafeScan } from '../qr/SafeScan';
import { MoldurasTemplates } from '../qr/MoldurasTemplates';
import { GaleriaHistorico } from '../qr/GaleriaHistorico';
import { 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Maximize, 
  Settings2, 
  Trash2, 
  Download,
  CircleDot,
  Square,
  Layout,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export function PainelDeControles() {
  const { 
    opcoes, 
    atualizarOpcoes, 
    atualizarOpcoesAninhadas, 
    ehDinamico, 
    setEhDinamico 
  } = useStoreQrCode();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        atualizarOpcoes({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removerImagem = () => {
    atualizarOpcoes({ image: undefined });
  };

  const exportarJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(opcoes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "qr-code-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const ItemControle = ({ label, children, icon: Icon }: { label: string, children: React.ReactNode, icon?: any }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-foreground/80 uppercase tracking-wider">
        {Icon && <Icon className="h-4 w-4 text-primary" />}
        {label}
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-12">
      <Card className="glass-card border-0 overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <ItemControle label="Conteúdo do QR Code" icon={Type}>
              <div />
            </ItemControle>
            <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-2xl border border-border/50">
              <Zap className={`h-4 w-4 ${ehDinamico ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">QR Dinâmico</span>
              <Switch checked={ehDinamico} onCheckedChange={setEhDinamico} />
            </div>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Digite sua URL ou texto aqui..."
              value={opcoes.data}
              onChange={(e) => atualizarOpcoes({ data: e.target.value })}
              className="min-h-[120px] bg-muted/30 border-border/50 rounded-2xl focus:ring-primary/20 resize-none text-lg font-medium"
            />
            <SafeScan />
          </div>

          <ItemControle label="Templates de Moldura" icon={Layout}>
            <MoldurasTemplates />
          </ItemControle>

          <ItemControle label="Logo Central" icon={ImageIcon}>
            <div className="group relative">
              <div className="flex items-center gap-4 p-4 bg-muted/30 border-2 border-dashed border-border/50 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer">
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">
                    {opcoes.image ? 'Imagem selecionada' : 'Clique para enviar logo'}
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG ou SVG (Max 2MB)</p>
                </div>
                {opcoes.image && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => { e.stopPropagation(); removerImagem(); }} 
                    className="shrink-0 text-destructive hover:bg-destructive/10 z-20"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </ItemControle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ItemControle label="Tamanho" icon={Maximize}>
              <Input 
                type="number" 
                value={opcoes.width} 
                onChange={(e) => atualizarOpcoes({ width: Number(e.target.value), height: Number(e.target.value) })}
                className="bg-muted/30 border-border/50 rounded-xl font-bold"
              />
            </ItemControle>
            <ItemControle label="Margem" icon={Layout}>
              <Input 
                type="number" 
                value={opcoes.margin} 
                onChange={(e) => atualizarOpcoes({ margin: Number(e.target.value) })}
                className="bg-muted/30 border-border/50 rounded-xl font-bold"
              />
            </ItemControle>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={exportarJson} 
                className="w-full h-10 rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-bold"
              >
                <Download className="h-4 w-4 mr-2" />
                Config
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        {[
          {
            id: 'dots',
            title: 'Estilo dos Pontos',
            icon: CircleDot,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <ItemControle label="Formato">
                  <Select value={opcoes.dotsOptions?.type} onValueChange={(val: any) => atualizarOpcoesAninhadas('dotsOptions', { type: val })}>
                    <SelectTrigger className="bg-muted/30 border-border/50 rounded-xl h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl glass-card">
                      <SelectItem value="rounded">Arredondado</SelectItem>
                      <SelectItem value="dots">Pontos</SelectItem>
                      <SelectItem value="classy">Elegante</SelectItem>
                      <SelectItem value="square">Quadrado</SelectItem>
                      <SelectItem value="extra-rounded">Extra Arredondado</SelectItem>
                    </SelectContent>
                  </Select>
                </ItemControle>
                <ItemControle label="Cor">
                  <div className="flex gap-3">
                    <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden border border-border/50">
                      <Input 
                        type="color" 
                        value={opcoes.dotsOptions?.color} 
                        onChange={(e) => atualizarOpcoesAninhadas('dotsOptions', { color: e.target.value })} 
                        className="absolute inset-0 scale-150 cursor-pointer" 
                      />
                    </div>
                    <Input 
                      type="text" 
                      value={opcoes.dotsOptions?.color} 
                      onChange={(e) => atualizarOpcoesAninhadas('dotsOptions', { color: e.target.value })} 
                      className="h-12 bg-muted/30 border-border/50 rounded-xl font-mono uppercase font-bold" 
                    />
                  </div>
                </ItemControle>
              </div>
            )
          },
          {
            id: 'corners',
            title: 'Cantos e Bordas',
            icon: Square,
            content: (
              <div className="space-y-8 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ItemControle label="Estilo Externo">
                    <Select value={opcoes.cornersSquareOptions?.type} onValueChange={(val: any) => atualizarOpcoesAninhadas('cornersSquareOptions', { type: val })}>
                      <SelectTrigger className="bg-muted/30 border-border/50 rounded-xl h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl glass-card">
                        <SelectItem value="dot">Ponto</SelectItem>
                        <SelectItem value="square">Quadrado</SelectItem>
                        <SelectItem value="extra-rounded">Extra Arredondado</SelectItem>
                      </SelectContent>
                    </Select>
                  </ItemControle>
                  <ItemControle label="Cor Externa">
                    <div className="flex gap-3">
                      <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden border border-border/50">
                        <Input type="color" value={opcoes.cornersSquareOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersSquareOptions', { color: e.target.value })} className="absolute inset-0 scale-150 cursor-pointer" />
                      </div>
                      <Input type="text" value={opcoes.cornersSquareOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersSquareOptions', { color: e.target.value })} className="h-12 bg-muted/30 border-border/50 rounded-xl font-mono uppercase font-bold" />
                    </div>
                  </ItemControle>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ItemControle label="Estilo Interno">
                    <Select value={opcoes.cornersDotOptions?.type} onValueChange={(val: any) => atualizarOpcoesAninhadas('cornersDotOptions', { type: val })}>
                      <SelectTrigger className="bg-muted/30 border-border/50 rounded-xl h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl glass-card">
                        <SelectItem value="dot">Ponto</SelectItem>
                        <SelectItem value="square">Quadrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </ItemControle>
                  <ItemControle label="Cor Interna">
                    <div className="flex gap-3">
                      <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden border border-border/50">
                        <Input type="color" value={opcoes.cornersDotOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersDotOptions', { color: e.target.value })} className="absolute inset-0 scale-150 cursor-pointer" />
                      </div>
                      <Input type="text" value={opcoes.cornersDotOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersDotOptions', { color: e.target.value })} className="h-12 bg-muted/30 border-border/50 rounded-xl font-mono uppercase font-bold" />
                    </div>
                  </ItemControle>
                </div>
              </div>
            )
          },
          {
            id: 'advanced',
            title: 'Configurações Avançadas',
            icon: Settings2,
            content: (
              <div className="space-y-8 pt-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Limpeza de Fundo</Label>
                    <p className="text-xs text-muted-foreground">Ocultar pontos atrás da logo</p>
                  </div>
                  <Switch
                    checked={opcoes.imageOptions?.hideBackgroundDots}
                    onCheckedChange={(checked) => atualizarOpcoesAninhadas('imageOptions', { hideBackgroundDots: checked })}
                  />
                </div>

                <ItemControle label={`Escala da Logo (${opcoes.imageOptions?.imageSize})`}>
                  <Slider
                    value={[opcoes.imageOptions?.imageSize || 0.4]}
                    min={0.1} max={1} step={0.05}
                    onValueChange={(val) => atualizarOpcoesAninhadas('imageOptions', { imageSize: val[0] })}
                    className="py-4"
                  />
                </ItemControle>

                <ItemControle label="Correção de Erro">
                  <Select value={opcoes.qrOptions?.errorCorrectionLevel} onValueChange={(val: any) => atualizarOpcoesAninhadas('qrOptions', { errorCorrectionLevel: val })}>
                    <SelectTrigger className="bg-muted/30 border-border/50 rounded-xl h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl glass-card">
                      <SelectItem value="L">Baixa (7%)</SelectItem>
                      <SelectItem value="M">Média (15%)</SelectItem>
                      <SelectItem value="Q">Quartil (25%)</SelectItem>
                      <SelectItem value="H">Alta (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </ItemControle>
              </div>
            )
          }
        ].map((item) => (
          <AccordionItem key={item.id} value={item.id} className="glass-card border-0 rounded-3xl px-8 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6 group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-bold tracking-tight">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <GaleriaHistorico />
    </div>
  );
}
