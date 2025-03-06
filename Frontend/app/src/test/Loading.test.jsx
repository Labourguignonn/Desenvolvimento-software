import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Loading from "../pages/Loading";
import axios from "axios";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("axios");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Loading Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("deve renderizar a mensagem de carregamento", () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );
    expect(screen.getByText("Carregando seus filmes...")).toBeInTheDocument();
  });

  it("deve chamar a API e navegar para '/seleção' em caso de sucesso", async () => {
    axios.get.mockResolvedValue({
      data: {
        data_dict: {},
        processamento_concluido: true,
      },
    });

    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/seleção"));
  });

  it("deve lidar com erro na requisição", async () => {
    axios.get.mockRejectedValue(new Error("Erro ao processar os filmes"));

    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("Aguardando resposta do servidor...")).toBeInTheDocument());
  });
});
