import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ECONOMIC_THRESHOLD = 0.7

type FuelResult = {
  ratio: number
  recommendation: 'etanol' | 'gasolina'
}

function parseCurrencyInput(value: string): number {
  const normalized = value.replace(',', '.').trim()
  return Number(normalized)
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(2).replace('.', ',')}%`
}

function App() {
  const [gasolina, setGasolina] = useState('')
  const [etanol, setEtanol] = useState('')
  const [result, setResult] = useState<FuelResult | null>(null)

  const canCalculate = useMemo(() => gasolina.trim() !== '' && etanol.trim() !== '', [gasolina, etanol])

  function validateInputs(gasolineValue: number, ethanolValue: number): string | null {
    if (!Number.isFinite(gasolineValue) || !Number.isFinite(ethanolValue)) {
      return 'Preencha os dois valores com números válidos.'
    }

    if (gasolineValue <= 0 || ethanolValue <= 0) {
      return 'Os preços devem ser maiores que zero.'
    }

    if (gasolineValue > 20 || ethanolValue > 20) {
      return 'Verifique os valores informados. Eles parecem acima do esperado.'
    }

    return null
  }

  function handleCalculate(event: FormEvent) {
    event.preventDefault()

    const gasolineValue = parseCurrencyInput(gasolina)
    const ethanolValue = parseCurrencyInput(etanol)

    const validationError = validateInputs(gasolineValue, ethanolValue)
    if (validationError) {
      setResult(null)
      toast.error(validationError)
      return
    }

    const ratio = ethanolValue / gasolineValue
    const recommendation = ratio <= ECONOMIC_THRESHOLD ? 'etanol' : 'gasolina'

    setResult({ ratio, recommendation })
    toast.success('Cálculo realizado com sucesso!')
  }

  const gasolinaValue = parseCurrencyInput(gasolina)
  const etanolValue = parseCurrencyInput(etanol)

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <Toaster position="top-center" />
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">ReactFuelCalc</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Compare os preços e descubra qual combustível vale mais a pena.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleCalculate}>
          <div>
            <label htmlFor="gasolina" className="mb-1 block text-sm font-medium text-slate-700">
              Preço da Gasolina (R$)
            </label>
            <input
              id="gasolina"
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 6,00"
              value={gasolina}
              onChange={(event) => setGasolina(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="etanol" className="mb-1 block text-sm font-medium text-slate-700">
              Preço do Etanol (R$)
            </label>
            <input
              id="etanol"
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 4,00"
              value={etanol}
              onChange={(event) => setEtanol(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            disabled={!canCalculate}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Calcular
          </button>
        </form>

        {result && Number.isFinite(gasolinaValue) && Number.isFinite(etanolValue) && (
          <article className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <h2 className="text-lg font-semibold text-slate-900">Resultado</h2>
            <p className="mt-2 text-slate-700">
              Razão: {formatBRL(etanolValue)} / {formatBRL(gasolinaValue)} ={' '}
              <strong>{result.ratio.toFixed(3).replace('.', ',')}</strong> ({formatPercent(result.ratio)})
            </p>
            <p className="mt-2 text-slate-800">
              {result.recommendation === 'etanol' ? (
                <>
                  <strong>Etanol é mais vantajoso</strong>, pois a razão é menor ou igual a 0,70.
                </>
              ) : (
                <>
                  <strong>Gasolina é mais vantajosa</strong>, pois a razão é maior que 0,70.
                </>
              )}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Regra aplicada: etanol/gasolina ≤ 0,70 → etanol; acima disso → gasolina.
            </p>
          </article>
        )}
      </section>
    </main>
  )
}

export default App
