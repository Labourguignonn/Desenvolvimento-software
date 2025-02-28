import React from "react"; // Importa o React para o suporte ao JSX (forma correta: JSX)
import { render, screen } from "@testing-library/react"; // Importa funções de teste da Testing Library
import userEvent from "@testing-library/user-event"; // Importa o userEvent para simular interações do usuário
import { MemoryRouter } from "react-router-dom"; // Importa o MemoryRouter para simular rotas no teste
import InfoMovies from "../pages/InfoMovies"; // Importa o componente a ser testado
import { vi, beforeEach } from "vitest"; // Importa o utilitário de mock do Vitest

// Cria uma variável global para o mock do useNavigate
let mockNavigate = vi.fn();

// Mock global do react-router-dom para sobrescrever useNavigate
vi.mock("react-router-dom", async () => {
  // Importa a implementação real para não sobrescrever outros hooks
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Objeto com dados fictícios do filme para o teste
const mockFilme = {
  title_pt: "Teste Filme",
  overview: "Sinopse do filme de teste.",
  director: "Diretor Teste",
  runtime: 120,
  review: "8.5",
  poster_path: "test-poster.jpg"
};

describe("InfoMovies Component", () => {
  // Antes de cada teste, reseta o mockNavigate
  beforeEach(() => {
    mockNavigate = vi.fn();
  });

  it("renderiza corretamente os detalhes do filme", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { filme: mockFilme, index: 0, dataDict: {} } }]}>
        <InfoMovies />
      </MemoryRouter>
    );

    // Verifica se o título, a sinopse, o diretor, a duração, a avaliação e a imagem foram renderizados
    expect(screen.getByText("Teste Filme")).toBeInTheDocument();
    expect(screen.getByText("Sinopse do filme de teste.")).toBeInTheDocument();
    expect(screen.getByText("Diretor Teste", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("2h 0min", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("8.5", { exact: false })).toBeInTheDocument();
    expect(screen.getByAltText("Teste Filme")).toHaveAttribute("src", "test-poster.jpg");
  });

  it("exibe mensagem de erro quando não há filme", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { filme: null, index: 0, dataDict: {} } }]}>
        <InfoMovies />
      </MemoryRouter>
    );

    expect(screen.getByText("Erro: Nenhum filme encontrado!")).toBeInTheDocument();
  });

  it("chama navigate com '/ultima_pagina' quando clica em 'Sim'", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { filme: mockFilme, index: 1, dataDict: { chave: "valor" } } }]}>
        <InfoMovies />
      </MemoryRouter>
    );

    // Seleciona o botão "Sim" e simula um clique
    const simButton = screen.getByRole("button", { name: "Sim" });
    await userEvent.click(simButton);

    // Verifica se navigate foi chamado com o caminho correto
    expect(mockNavigate).toHaveBeenCalledWith("/ultima_pagina");
  });

  it("chama navigate com '/seleção' e o state correto quando clica em 'Não'", async () => {
    const filmeIndex = 1;
    const dataDict = { chave: "valor" };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { filme: mockFilme, index: filmeIndex, dataDict } }]}>
        <InfoMovies />
      </MemoryRouter>
    );

    // Seleciona o botão "Não" e simula um clique
    const naoButton = screen.getByRole("button", { name: "Não" });
    await userEvent.click(naoButton);

    // Verifica se navigate foi chamado com o caminho e state corretos
    expect(mockNavigate).toHaveBeenCalledWith("/seleção", { state: { index: filmeIndex, dataDict } });
  });
});
