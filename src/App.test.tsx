import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('ReactFuelCalc', () => {
  it('renderiza os campos e botão principal', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /reactfuelcalc/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/preço da gasolina/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/preço do etanol/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calcular/i })).toBeInTheDocument()
  })

  it('inicia com botão calcular desabilitado e habilita após preencher ambos os campos', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /calcular/i })
    expect(button).toBeDisabled()

    await user.type(screen.getByLabelText(/preço da gasolina/i), '6,00')
    expect(button).toBeDisabled()

    await user.type(screen.getByLabelText(/preço do etanol/i), '4,00')
    expect(button).toBeEnabled()
  })

  it('recomenda etanol quando razão <= 0,70 e exibe detalhes do cálculo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/preço da gasolina/i), '6,00')
    await user.type(screen.getByLabelText(/preço do etanol/i), '4,00')
    await user.click(screen.getByRole('button', { name: /calcular/i }))

    expect(await screen.findByText(/etanol é mais vantajoso/i)).toBeInTheDocument()
    expect(screen.getByText(/0,667/)).toBeInTheDocument()
    expect(screen.getByText(/66,67%/)).toBeInTheDocument()
    expect(screen.getByText(/regra aplicada/i)).toBeInTheDocument()
  })

  it('recomenda gasolina quando razão > 0,70', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/preço da gasolina/i), '5,00')
    await user.type(screen.getByLabelText(/preço do etanol/i), '4,00')
    await user.click(screen.getByRole('button', { name: /calcular/i }))

    expect(await screen.findByText(/gasolina é mais vantajosa/i)).toBeInTheDocument()
    expect(screen.getByText(/0,800/)).toBeInTheDocument()
  })

  it('aceita entrada com ponto decimal e calcula corretamente no limiar de 0,70', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/preço da gasolina/i), '10.00')
    await user.type(screen.getByLabelText(/preço do etanol/i), '7.00')
    await user.click(screen.getByRole('button', { name: /calcular/i }))

    expect(await screen.findByText(/etanol é mais vantajoso/i)).toBeInTheDocument()
    expect(screen.getByText(/0,700/)).toBeInTheDocument()
  })

  it('mostra erro para valor não numérico', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/preço da gasolina/i), 'abc')
    await user.type(screen.getByLabelText(/preço do etanol/i), '4,00')
    await user.click(screen.getByRole('button', { name: /calcular/i }))

    expect(await screen.findByText(/preencha os dois valores com números válidos/i)).toBeInTheDocument()
  })

  it('mostra erro para valores menores ou iguais a zero', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/preço da gasolina/i), '0')
    await user.type(screen.getByLabelText(/preço do etanol/i), '3,50')
    await user.click(screen.getByRole('button', { name: /calcular/i }))

    expect(await screen.findByText(/os preços devem ser maiores que zero/i)).toBeInTheDocument()
  })

  it('mostra erro para valores muito altos', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/preço da gasolina/i), '25')
    await user.type(screen.getByLabelText(/preço do etanol/i), '18')
    await user.click(screen.getByRole('button', { name: /calcular/i }))

    expect(
      await screen.findByText(/verifique os valores informados. eles parecem acima do esperado/i),
    ).toBeInTheDocument()
  })

  it('permite múltiplos cálculos em sequência atualizando o resultado', async () => {
    const user = userEvent.setup()
    render(<App />)

    const gasolinaInput = screen.getByLabelText(/preço da gasolina/i)
    const etanolInput = screen.getByLabelText(/preço do etanol/i)
    const button = screen.getByRole('button', { name: /calcular/i })

    await user.type(gasolinaInput, '6,00')
    await user.type(etanolInput, '4,00')
    await user.click(button)
    expect(await screen.findByText(/etanol é mais vantajoso/i)).toBeInTheDocument()

    await user.clear(gasolinaInput)
    await user.clear(etanolInput)
    await user.type(gasolinaInput, '5,00')
    await user.type(etanolInput, '4,00')
    await user.click(button)

    expect(await screen.findByText(/gasolina é mais vantajosa/i)).toBeInTheDocument()
  })
})
