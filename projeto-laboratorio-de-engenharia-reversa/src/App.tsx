/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GradePrincipal } from './componentes/layout/GradePrincipal';
import { PainelDeControles } from './componentes/controles/PainelDeControles';
import { AreaDeVisualizacao } from './componentes/qr/AreaDeVisualizacao';

export default function App() {
  return (
    <GradePrincipal
      painelControles={<PainelDeControles />}
      areaVisualizacao={<AreaDeVisualizacao />}
    />
  );
}
