import React from "react"; // Importa o React para suporte ao JSX
import { render, screen, waitFor } from "@testing-library/react"; // Funções para renderização e assertions
import userEvent from "@testing-library/user-event"; // Para simular interações do usuário
import { MemoryRouter } from "react-router-dom"; // Para simular o roteamento
import MovieSelection from "../pages/MovieSelection"; // Componente a ser testado
import { vi, beforeEach, describe, it, expect } from "vitest"; // Utilitários do Vitest

import axios from "axios";

// Cria um mock global para o useNavigate
let mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock do axios para controlar a resposta da API
vi.mock("axios");

const mockDataDict = {
  title_pt: ["Filme A", "Filme B", "Filme C"],
  poster_path: ["pathA.jpg", "pathB.jpg", "pathC.jpg"],
  overview: ["Sinopse A", "Sinopse B", "Sinopse C"],
  director: ["Diretor A", "Diretor B", "Diretor C"],
  runtime: [100, 110, 120],
  review: ["7.5", "8.0", "8.5"],
};

describe("MovieSelection Component", () => {
  beforeEach(() => {
    // Reseta o mock do navigate antes de cada teste
    mockNavigate = vi.fn();
    // Reseta os mocks do axios
    vi.resetAllMocks();
  });

  it("exibe mensagem de carregamento enquanto busca os filmes", async () => {
    // Configura o axios para retornar uma promise que nunca resolve imediatamente
    axios.get.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { index: 0 } }]}>
        <MovieSelection />
      </MemoryRouter>
    );

    expect(screen.getByText("Carregando filmes...")).toBeInTheDocument();
  });

  it("renderiza corretamente o filme quando os dados são carregados", async () => {
    // Configura o axios para retornar os dados esperados
    axios.get.mockResolvedValue({ data: { data_dict: mockDataDict } });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { index: 1 } }]}>
        <MovieSelection />
      </MemoryRouter>
    );

    // Aguarda até que o carregamento seja finalizado e os dados apareçam
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());

    // Verifica se o título do filme correto (Filme B, pois index=1) é renderizado
    expect(screen.getByRole("img")).toHaveAttribute("src", expect.stringContaining("pathB.jpg"));
    expect(screen.getByText("Filme B")).toBeInTheDocument();
    // Verifica o indicador de posição
    expect(screen.getByText("2 de 3")).toBeInTheDocument();
  });

  it("chama navigate com '/final_da_fila' quando não há filmes disponíveis", async () => {
    // Simula uma resposta com data_dict inválido ou vazio (ex: title_pt vazio)
    axios.get.mockResolvedValue({ data: { data_dict: { title_pt: [], poster_path: [] } } });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { index: 0 } }]}>
        <MovieSelection />
      </MemoryRouter>
    );

    // Aguarda o término do loading e o disparo do useEffect que redireciona
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/final_da_fila");
    });
  });

  it("chama navigate com '/info_filmes' e o state correto ao clicar no botão 'Não'", async () => {
    axios.get.mockResolvedValue({ data: { data_dict: mockDataDict } });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { index: 0 } }]}>
        <MovieSelection />
      </MemoryRouter>
    );

    // Aguarda o carregamento dos dados
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());

    // Seleciona o botão "Não" e simula o clique
    const naoButton = screen.getByRole("button", { name: "Não" });
    await userEvent.click(naoButton);

    // Verifica se o navigate foi chamado com o caminho correto e o state esperado
    expect(mockNavigate).toHaveBeenCalledWith("/info_filmes", {
      state: {
        filme: {
          title_pt: mockDataDict.title_pt[0],
          poster_path: expect.stringContaining(mockDataDict.poster_path[0]),
          overview: mockDataDict.overview[0],
          director: mockDataDict.director[0],
          runtime: mockDataDict.runtime[0],
          review: mockDataDict.review[0],
        },
        index: 1,
        dataDict: mockDataDict,
      },
    });
  });

  it("avança para o próximo filme ao clicar em 'Próximo Filme' e redireciona se for o último", async () => {
    axios.get.mockResolvedValue({ data: { data_dict: mockDataDict } });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { index: 0 } }]}>
        <MovieSelection />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());

    // Clica no botão "Próximo Filme" três vezes:
    // 1º clique: index 0 -> 1
    // 2º clique: index 1 -> 2
    // 3º clique: já que index 2 é o último, dispara o navigate
    const proximoButton = screen.getByRole("button", { name: "Próximo Filme" });
    await userEvent.click(proximoButton);
    await userEvent.click(proximoButton);
    await userEvent.click(proximoButton);

    // Verifica se o navigate foi chamado com "/final_da_fila"
    expect(mockNavigate).toHaveBeenCalledWith("/final_da_fila");
  });

  it("retrocede para o filme anterior ao clicar em 'Filme Anterior'", async () => {
    axios.get.mockResolvedValue({ data: { data_dict: mockDataDict } });

    // Inicia com o índice 2 para ter um filme anterior disponível
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { index: 2 } }]}>
        <MovieSelection />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());

    // Verifica que o indicador mostra "3 de 3"
    expect(screen.getByText("3 de 3")).toBeInTheDocument();

    // Clica no botão "Filme Anterior"
    const anteriorButton = screen.getByRole("button", { name: "Filme Anterior" });
    await userEvent.click(anteriorButton);

    // Verifica se o indicador atualiza para "2 de 3"
    expect(screen.getByText("2 de 3")).toBeInTheDocument();
  });
});
