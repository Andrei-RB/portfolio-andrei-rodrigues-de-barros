import { create } from 'zustand';
import { Options } from 'qr-code-styling';

export type TipoSeguranca = 'seguro' | 'suspeito' | 'perigoso' | 'analisando' | 'pendente';

export interface TemplateMoldura {
  id: string;
  nome: string;
  texto: string;
  estilo: string;
}

interface EstadoQrCode {
  opcoes: Options;
  extensaoDownload: 'png' | 'jpeg' | 'webp' | 'svg' | 'pdf';
  ehDinamico: boolean;
  idCurto: string | null;
  statusSeguranca: TipoSeguranca;
  templateAtivo: string | null;
  
  // Ações
  atualizarOpcoes: (novasOpcoes: Partial<Options>) => void;
  atualizarOpcoesAninhadas: (chave: keyof Options, valor: any) => void;
  setExtensaoDownload: (ext: 'png' | 'jpeg' | 'webp' | 'svg' | 'pdf') => void;
  setEhDinamico: (valor: boolean) => void;
  setIdCurto: (id: string | null) => void;
  setStatusSeguranca: (status: TipoSeguranca) => void;
  setTemplateAtivo: (id: string | null) => void;
  resetarParaEdicao: (config: any) => void;
}

export const useStoreQrCode = create<EstadoQrCode>((set) => ({
  opcoes: {
    width: 300,
    height: 300,
    data: 'https://google.com',
    margin: 10,
    qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
    dotsOptions: { type: 'rounded', color: '#6a1a4c' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { type: 'extra-rounded', color: '#000000' },
    cornersDotOptions: { type: 'dot', color: '#000000' },
  },
  extensaoDownload: 'png',
  ehDinamico: false,
  idCurto: null,
  statusSeguranca: 'pendente',
  templateAtivo: null,

  atualizarOpcoes: (novasOpcoes) => set((state) => ({ 
    opcoes: { ...state.opcoes, ...novasOpcoes } 
  })),
  
  atualizarOpcoesAninhadas: (chave, valor) => set((state) => ({
    opcoes: {
      ...state.opcoes,
      [chave]: { ...(state.opcoes[chave] as object), ...valor }
    }
  })),

  setExtensaoDownload: (extensaoDownload) => set({ extensaoDownload }),
  setEhDinamico: (ehDinamico) => set({ ehDinamico }),
  setIdCurto: (idCurto) => set({ idCurto }),
  setStatusSeguranca: (statusSeguranca) => set({ statusSeguranca }),
  setTemplateAtivo: (templateAtivo) => set({ templateAtivo }),
  
  resetarParaEdicao: (config) => set({ 
    opcoes: config.opcoes,
    ehDinamico: config.ehDinamico || false,
    idCurto: config.idCurto || null,
    templateAtivo: config.templateAtivo || null
  }),
}));
