import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useStoreQrCode } from '../../estado/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function AreaDeVisualizacao() {
  const ref = useRef<HTMLDivElement>(null);
  const { opcoes, extensaoDownload, setExtensaoDownload } = useStoreQrCode();
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling(opcoes);
      qrCode.current.append(ref.current!);
    } else {
      qrCode.current.update(opcoes);
    }
  }, [opcoes]);

  const handleDownload = () => {
    if (qrCode.current) {
      qrCode.current.download({ extension: extensaoDownload });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 lg:sticky lg:top-24">
      <div ref={ref} className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex items-center justify-center min-h-[300px] min-w-[300px]" />
      
      <div className="mt-8 flex items-center gap-2 w-full max-w-xs">
        <Button onClick={handleDownload} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
          Download
        </Button>
        <Select value={extensaoDownload} onValueChange={(val: any) => setExtensaoDownload(val)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Formato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="svg">SVG</SelectItem>
            <SelectItem value="webp">WEBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
