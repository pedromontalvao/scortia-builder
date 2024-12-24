import React from 'react';
import { StateTemplate } from '@/components/state/StateTemplate';

const SaoPaulo = () => {
  return (
    <StateTemplate
      name="São Paulo"
      flagUrl="https://assets.codante.io/codante-apis/bandeiras-do-brasil/sp-full.svg"
      description="São Paulo é um estado brasileiro localizado na região Sudeste do país. É a unidade federativa mais populosa e maior polo industrial do Brasil."
      population="44.420.459"
      founded="22 de janeiro de 1532"
    />
  );
};

export default SaoPaulo;