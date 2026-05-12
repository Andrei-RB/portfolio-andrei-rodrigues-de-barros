/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { GradePrincipal } from './componentes/layout/GradePrincipal';
import { PainelDeControles } from './componentes/controles/PainelDeControles';
import { AreaDeVisualizacao } from './componentes/qr/AreaDeVisualizacao';
import { useAuthStore } from './estado/authStore';

export default function App() {
  const init = useAuthStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <GradePrincipal
      painelControles={<PainelDeControles />}
      areaVisualizacao={<AreaDeVisualizacao />}
    />
  );
}
