import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EmptyLine from "../pages/EmptyLine";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("EmptyLine Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Limpa chamadas anteriores para evitar interferências entre testes
  });

  it("deve renderizar a imagem corretamente", () => {
    render(
      <MemoryRouter>
        <EmptyLine />
      </MemoryRouter>
    );

    const image = screen.getByAltText("Imagem final da fila");
    expect(image).toBeInTheDocument();
  });

  it("deve navegar para '/escolha_generos' ao clicar no botão", () => {
    render(
      <MemoryRouter>
        <EmptyLine />
      </MemoryRouter>
    );

    const button = screen.getByText(/clique aqui para refazer a seleção/i);
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/escolha_generos");
  });
});
