import React from 'react';
import { CabecalhoPrincipal } from './CabecalhoPrincipal';

interface GradePrincipalProps {
  painelControles: React.ReactNode;
  areaVisualizacao: React.ReactNode;
}

export function GradePrincipal({ painelControles, areaVisualizacao }: GradePrincipalProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CabecalhoPrincipal />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-6">
            {painelControles}
          </section>
          <section className="lg:sticky lg:top-24 h-fit">
            {areaVisualizacao}
          </section>
        </div>
      </main>
    </div>
  );
}
