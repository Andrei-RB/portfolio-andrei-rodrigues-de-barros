import React from 'react';
import { CabecalhoPrincipal } from './CabecalhoPrincipal';
import { motion } from 'motion/react';

interface GradePrincipalProps {
  painelControles: React.ReactNode;
  areaVisualizacao: React.ReactNode;
}

export function GradePrincipal({ painelControles, areaVisualizacao }: GradePrincipalProps) {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <CabecalhoPrincipal />
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight dark:text-white">
                Crie algo <span className="text-gradient">Único.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md">
                Personalize cada detalhe do seu QR Code com nossa tecnologia de ponta.
              </p>
            </div>
            {painelControles}
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              {areaVisualizacao}
            </div>
          </motion.section>
        </div>
      </main>
      
      {/* Elementos Decorativos de Fundo */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}
