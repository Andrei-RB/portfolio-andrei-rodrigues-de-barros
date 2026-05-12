import { create } from 'zustand';
import { Options } from 'qr-code-styling';

interface EstadoQrCode {
  opcoes: Options;
  extensaoDownload: 'png' | 'jpeg' | 'webp' | 'svg';
  atualizarOpcoes: (novasOpcoes: Partial<Options>) => void;
  atualizarOpcoesAninhadas: (chave: keyof Options, valor: any) => void;
  setExtensaoDownload: (ext: 'png' | 'jpeg' | 'webp' | 'svg') => void;
}

export const useStoreQrCode = create<EstadoQrCode>((set) => ({
  opcoes: {
    width: 300,
    height: 300,
    data: 'https://qr-code-styling.com',
    margin: 0,
    qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
    dotsOptions: { type: 'rounded', color: '#6a1a4c' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { type: 'extra-rounded', color: '#000000' },
    cornersDotOptions: { type: 'dot', color: '#000000' },
  },
  extensaoDownload: 'png',
  atualizarOpcoes: (novasOpcoes) => set((state) => ({ opcoes: { ...state.opcoes, ...novasOpcoes } })),
  atualizarOpcoesAninhadas: (chave, valor) => set((state) => ({
    opcoes: {
      ...state.opcoes,
      [chave]: { ...(state.opcoes[chave] as object), ...valor }
    }
  })),
  setExtensaoDownload: (extensaoDownload) => set({ extensaoDownload }),
}));
