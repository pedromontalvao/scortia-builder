import React from 'react';
import { StateTemplate } from '@/components/state/StateTemplate';

const RioDeJaneiro = () => {
  return (
    <StateTemplate
      name="Rio de Janeiro"
      flagUrl="https://assets.codante.io/codante-apis/bandeiras-do-brasil/rj-full.svg"
      description="O Rio de Janeiro é um estado brasileiro situado na região Sudeste do país. É conhecido por suas praias, carnaval e pontos turísticos icônicos."
      population="16.054.524"
      founded="1 de março de 1565"
    />
  );
};

export default RioDeJaneiro;