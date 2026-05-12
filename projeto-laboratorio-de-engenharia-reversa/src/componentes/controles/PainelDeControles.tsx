import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStoreQrCode } from '../../estado/store';

export function PainelDeControles() {
  const { opcoes, atualizarOpcoes, atualizarOpcoesAninhadas } = useStoreQrCode();

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
    downloadAnchorNode.setAttribute("download", "qr-code-options.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800">Opções Principais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label>Dados (URL ou Texto)</Label>
            <Textarea
              value={opcoes.data}
              onChange={(e) => atualizarOpcoes({ data: e.target.value })}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Arquivo de Imagem (Logo)</Label>
            <div className="flex items-center gap-3">
              <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
              {opcoes.image && (
                <Button variant="outline" onClick={removerImagem} className="shrink-0 text-red-600 hover:text-red-700">
                  Remover
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Largura (px)</Label>
              <Input type="number" value={opcoes.width} onChange={(e) => atualizarOpcoes({ width: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Altura (px)</Label>
              <Input type="number" value={opcoes.height} onChange={(e) => atualizarOpcoes({ height: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Margem (px)</Label>
              <Input type="number" value={opcoes.margin} onChange={(e) => atualizarOpcoes({ margin: Number(e.target.value) })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="bg-white rounded-xl shadow-sm border border-gray-200">
        <AccordionItem value="dots" className="px-6">
          <AccordionTrigger className="hover:no-underline py-4 font-medium text-gray-700">Opções dos Pontos</AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estilo</Label>
                <Select value={opcoes.dotsOptions?.type} onValueChange={(val: any) => atualizarOpcoesAninhadas('dotsOptions', { type: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded">Arredondado</SelectItem>
                    <SelectItem value="dots">Pontos</SelectItem>
                    <SelectItem value="classy">Elegante</SelectItem>
                    <SelectItem value="classy-rounded">Elegante Arredondado</SelectItem>
                    <SelectItem value="square">Quadrado</SelectItem>
                    <SelectItem value="extra-rounded">Extra Arredondado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cor</Label>
                <div className="flex gap-2">
                  <Input type="color" value={opcoes.dotsOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('dotsOptions', { color: e.target.value })} className="w-12 h-10 p-1 cursor-pointer" />
                  <Input type="text" value={opcoes.dotsOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('dotsOptions', { color: e.target.value })} className="flex-1 uppercase" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cornersSquare" className="px-6">
          <AccordionTrigger className="hover:no-underline py-4 font-medium text-gray-700">Opções dos Cantos Externos</AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estilo</Label>
                <Select value={opcoes.cornersSquareOptions?.type} onValueChange={(val: any) => atualizarOpcoesAninhadas('cornersSquareOptions', { type: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dot">Ponto</SelectItem>
                    <SelectItem value="square">Quadrado</SelectItem>
                    <SelectItem value="extra-rounded">Extra Arredondado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cor</Label>
                <div className="flex gap-2">
                  <Input type="color" value={opcoes.cornersSquareOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersSquareOptions', { color: e.target.value })} className="w-12 h-10 p-1 cursor-pointer" />
                  <Input type="text" value={opcoes.cornersSquareOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersSquareOptions', { color: e.target.value })} className="flex-1 uppercase" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cornersDot" className="px-6">
          <AccordionTrigger className="hover:no-underline py-4 font-medium text-gray-700">Opções dos Cantos Internos</AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estilo</Label>
                <Select value={opcoes.cornersDotOptions?.type} onValueChange={(val: any) => atualizarOpcoesAninhadas('cornersDotOptions', { type: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dot">Ponto</SelectItem>
                    <SelectItem value="square">Quadrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cor</Label>
                <div className="flex gap-2">
                  <Input type="color" value={opcoes.cornersDotOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersDotOptions', { color: e.target.value })} className="w-12 h-10 p-1 cursor-pointer" />
                  <Input type="text" value={opcoes.cornersDotOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('cornersDotOptions', { color: e.target.value })} className="flex-1 uppercase" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="background" className="px-6">
          <AccordionTrigger className="hover:no-underline py-4 font-medium text-gray-700">Opções de Fundo</AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <div className="space-y-2">
              <Label>Cor de Fundo</Label>
              <div className="flex gap-2">
                <Input type="color" value={opcoes.backgroundOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('backgroundOptions', { color: e.target.value })} className="w-12 h-10 p-1 cursor-pointer" />
                <Input type="text" value={opcoes.backgroundOptions?.color} onChange={(e) => atualizarOpcoesAninhadas('backgroundOptions', { color: e.target.value })} className="flex-1 uppercase" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="imageOptions" className="px-6">
          <AccordionTrigger className="hover:no-underline py-4 font-medium text-gray-700">Opções de Imagem</AccordionTrigger>
          <AccordionContent className="space-y-6 pb-6">
            <div className="flex items-center justify-between">
              <Label className="cursor-pointer" htmlFor="hide-bg-dots">Ocultar pontos de fundo atrás da imagem</Label>
              <Switch
                id="hide-bg-dots"
                checked={opcoes.imageOptions?.hideBackgroundDots}
                onCheckedChange={(checked) => atualizarOpcoesAninhadas('imageOptions', { hideBackgroundDots: checked })}
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Tamanho da Imagem</Label>
                  <span className="text-sm text-gray-500">{opcoes.imageOptions?.imageSize}</span>
                </div>
                <Slider
                  value={[opcoes.imageOptions?.imageSize || 0.4]}
                  min={0.1} max={1} step={0.1}
                  onValueChange={(val) => atualizarOpcoesAninhadas('imageOptions', { imageSize: val[0] })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Margem da Imagem</Label>
                  <span className="text-sm text-gray-500">{opcoes.imageOptions?.margin}px</span>
                </div>
                <Slider
                  value={[opcoes.imageOptions?.margin || 0]}
                  min={0} max={50} step={1}
                  onValueChange={(val) => atualizarOpcoesAninhadas('imageOptions', { margin: val[0] })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="qrOptions" className="px-6 border-b-0">
          <AccordionTrigger className="hover:no-underline py-4 font-medium text-gray-700">Opções do QR Code</AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <div className="space-y-2">
              <Label>Nível de Correção de Erro</Label>
              <Select value={opcoes.qrOptions?.errorCorrectionLevel} onValueChange={(val: any) => atualizarOpcoesAninhadas('qrOptions', { errorCorrectionLevel: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">L (Baixo - 7%)</SelectItem>
                  <SelectItem value="M">M (Médio - 15%)</SelectItem>
                  <SelectItem value="Q">Q (Quartil - 25%)</SelectItem>
                  <SelectItem value="H">H (Alto - 30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" onClick={exportarJson} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200">
        Exportar Opções como JSON
      </Button>
    </div>
  );
}
