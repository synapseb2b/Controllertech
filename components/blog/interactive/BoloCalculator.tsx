'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

/**
 * Calculadora de precificação de bolo.
 *
 * Recriação fiel da ferramenta interativa do artigo legado
 * (/en/tabela-de-precificacao-de-bolo-2), preservada na migração para
 * o site novo a fim de manter o ranking orgânico da página.
 *
 * Fórmula original:
 *   custoIngredientes = peso * custoPorKg
 *   preco = (custoIngredientes + (indiretos% * custoIngredientes) + entrega) / (1 - margem)
 */

const parse = (v: string) => parseFloat(v.replace(',', '.')) || 0;

export function BoloCalculator() {
    const [peso, setPeso] = useState('');
    const [custoKg, setCustoKg] = useState('');
    const [indiretos, setIndiretos] = useState('');
    const [entrega, setEntrega] = useState('');
    const [margem, setMargem] = useState('20,0');
    const [preco, setPreco] = useState<string | null>(null);

    const calcular = () => {
        const custoIngredientes = parse(peso) * parse(custoKg);
        const resultado =
            (custoIngredientes +
                (parse(indiretos) / 100) * custoIngredientes +
                parse(entrega)) /
            (1 - parse(margem) / 100);
        setPreco(resultado.toFixed(2).replace('.', ','));
    };

    const campos = [
        {
            label: 'Peso do bolo (kg)',
            value: peso,
            set: setPeso,
            placeholder: 'Ex: 2,5',
            hint: null,
        },
        {
            label: 'Custo ingredientes (R$/kg)',
            value: custoKg,
            set: setCustoKg,
            placeholder: 'Ex: 30,00',
            hint: null,
        },
        {
            label: 'Custos indiretos (% sobre insumos)',
            value: indiretos,
            set: setIndiretos,
            placeholder: 'Ex: 35,36',
            hint: 'Some suas despesas fixas (aluguel, luz, gás, funcionário…) e divida pelo total gasto em ingredientes de todos os bolos no mês; multiplique por 100 e insira o valor aqui.',
        },
        {
            label: 'Taxa de Entrega (R$)',
            value: entrega,
            set: setEntrega,
            placeholder: 'Ex: 15,00',
            hint: null,
        },
        {
            label: 'Margem de Lucro (%)',
            value: margem,
            set: setMargem,
            placeholder: 'Ex: 20,0',
            hint: null,
        },
    ];

    return (
        <div className="not-prose my-10 bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-6 md:p-8 card-glow">
            <div className="flex items-center gap-3 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Calculator className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold text-foreground m-0">Calculadora de Preço do Bolo</h2>
            </div>

            <div className="space-y-4">
                {campos.map((campo) => (
                    <label key={campo.label} className="block">
                        <span className="text-sm font-medium text-foreground">{campo.label}</span>
                        <input
                            type="text"
                            inputMode="decimal"
                            placeholder={campo.placeholder}
                            value={campo.value}
                            onChange={(e) => campo.set(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-border bg-background/60 p-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                        />
                        {campo.hint && (
                            <span className="mt-1 block text-xs text-muted-foreground">{campo.hint}</span>
                        )}
                    </label>
                ))}
            </div>

            <button
                onClick={calcular}
                className="mt-6 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition"
            >
                Calcular Preço do Bolo
            </button>

            {preco !== null && (
                <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-5 text-center">
                    <span className="block text-sm text-muted-foreground">Preço de venda sugerido</span>
                    <strong className="block text-3xl font-bold text-primary mt-1">R$ {preco}</strong>
                </div>
            )}
        </div>
    );
}
