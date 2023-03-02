import { render , screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter";

describe("Testes no Counter", () => {
    test("Aumentar o contador para 3 quando botão clicado 3x", async () => {
        // renderizar o componente
        render(<Counter />)

        // interagir com os elementos
        const user = userEvent.setup();

        // selecionar o elemento que queremos utilizar
        const button = screen.getByText("+");

        // três cliques
        for (let i = 0; i < 3; i++){
            await user.click(button)
        }
         //ou

        //await user.tripleClick(button)

        //ou
        
        // await user.click(button)
        // await user.click(button)
        // await user.click(button)

        // selecionar o elemento que mostra o valor do contador
        const counterValue = screen.getByText("3");

        // assercoes
        expect(counterValue).toBeInTheDocument();
    })
})