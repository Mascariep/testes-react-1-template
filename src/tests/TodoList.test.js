import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoList from "../components/TodoList"

describe("Testando componento TodoList.js", () => {
    test("deve renderizar com o título", () => {
        // 1. renderizar o componente
        render(<TodoList />)
        // 2. selecionar os elementos que queremos analisar
        // screen.debug()
        // const titulo = screen.getByText("Todo List") 
        const titulo = screen.getByText(/todo list/i)
        // 4. criar asserções baseadas no comportamento esperado
        expect(titulo).toBeInTheDocument()
    })    

    test("deve atualizar o valor do input ao digitar nele", async () => {
        // 1. renderizar o componente
        render(<TodoList/>)
        // 2. selecionar os elementos que queremos analisar
        // screen.logTestingPlaygroundURL()
        // screen.debug()
        const input = screen.getByPlaceholderText("Enter a todo") 
        // 3. interagir com os elementos
        const usuario = userEvent.setup()
        await usuario.type(input, "Almoçar")
        // screen.debug() 
        // screen.logTestingPlaygroundURL() 
        // 4. criar asserções baseadas no comportamento esperado
        expect(input).toHaveValue("Almoçar")  
    })
    
    test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla ENTER", async () => {
        // 1. renderizar o componente
        render(<TodoList/>)
    
        // 2. selecionar os elementos que queremos analisar
        const input = screen.getByPlaceholderText(/enter a todo/i)
        
        // 3. interagir com os elementos
        const usuario = userEvent.setup()
        await usuario.type(input, "Almoçar{enter}")
        const tarefa = screen.getByText("Almoçar") 
        // screen.debug()
        // 4. criar asserções baseadas no comportamento esperado
        expect(tarefa).toBeInTheDocument()
        expect(input).toHaveValue("") 
    })

    test("deve alterar o status da tarefa quando o botão de alterar status for clicado", async () => {
        // 1. renderizar o componente
        render(<TodoList/>)
    
        // 2. selecionar os elementos que queremos analisar
        const input = screen.getByPlaceholderText(/enter a todo/i)
        
        // 3. interagir com os elementos
        const usuario = userEvent.setup()
        await usuario.type(input, "Almoçar{enter}")
        const tarefa = screen.getByText("Almoçar") 
        const botaoToggle = screen.getByText("Toggle")
        // screen.logTestingPlaygroundURL() 
        
        await usuario.click(botaoToggle ) //primeiro click
        screen.logTestingPlaygroundURL() 
        // screen.debug()
        // 4. criar asserções baseadas no comportamento esperado
        expect(tarefa).toBeInTheDocument()
        expect(input).toHaveValue("")
        expect(tarefa).toHaveStyle("text-decoration: line-through")

        await usuario.click(botaoToggle )  //segundo click
        expect(tarefa).toHaveStyle("text-decoration: none")
        
    })

    test("deve remover a tarefa quando o botão de deletar for clicado", async () => {
        // renderiza o componente
        render(<TodoList />)

        // seleciona o elemento
        const input = screen.getByPlaceholderText("Enter a todo");
        
        // interagir com os elementos
        const user = userEvent.setup();
        await user.type(input, "Almoçar{enter}");

        // usuario clica no botao
        const tarefa = screen.getByText("Almoçar");
        const button = screen.getByText(/delete/i);
        await user.click(button);

        // assercoes
        expect(tarefa).not.toBeInTheDocument();
    })

})