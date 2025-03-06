import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import GenreSelection from "../pages/GenreSelection";
import { MemoryRouter } from "react-router-dom";


vi.mock("axios");

describe("GenreSelection Component", () => {
  test("deve renderizar os botões de gênero", () => {
    render(
      <MemoryRouter>
        <GenreSelection />
      </MemoryRouter>
    );

    const genreButtons = screen.getAllByRole("button", { name: /ação|aventura|comédia|drama/i });
    expect(genreButtons.length).toBeGreaterThan(0);
  });

  test("deve permitir selecionar até 3 gêneros", () => {
    render(
      <MemoryRouter>
        <GenreSelection />
      </MemoryRouter>
    );

    const actionButton = screen.getByText("Ação");
    const adventureButton = screen.getByText("Aventura");
    const comedyButton = screen.getByText("Comédia");
    const dramaButton = screen.getByText("Drama");

    fireEvent.click(actionButton);
    fireEvent.click(adventureButton);
    fireEvent.click(comedyButton);
    fireEvent.click(dramaButton);

    expect(actionButton).toHaveClass("selected");
    expect(adventureButton).toHaveClass("selected");
    expect(comedyButton).toHaveClass("selected");
    expect(dramaButton).not.toHaveClass("selected");
  });

  test("deve exibir erro se nenhum gênero for selecionado ao submeter", () => {
    render(
      <MemoryRouter>
        <GenreSelection />
      </MemoryRouter>
    );

    const submitButton = screen.getByText(/prosseguir/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/por favor, selecione ao menos um gênero/i)).toBeInTheDocument();
  });

  test("deve enviar os gêneros corretamente para o backend", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });
    render(
      <MemoryRouter>
        <GenreSelection />
      </MemoryRouter>
    );

    const actionButton = screen.getByText("Ação");
    fireEvent.click(actionButton);

    const submitButton = screen.getByText(/prosseguir/i);
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/selecionar_generos"), {
      selectedGenres: ["Action"],
    });
  });

  test("deve adicionar novos gêneros ao clicar no botão de adicionar", () => {
    render(
      <MemoryRouter>
        <GenreSelection />
      </MemoryRouter>
    );

    const addButton = screen.getByText("+");
    const initialGenres = screen.getAllByRole("button", { name: /ação|aventura|comédia|drama/i }).length;

    fireEvent.click(addButton);

    const updatedGenres = screen.getAllByRole("button").length;
    expect(updatedGenres).toBeGreaterThan(initialGenres);
  });

  test("deve exibir erro se nenhum gênero for selecionado ao clicar em 'Prosseguir'", () => {
    render(
      <MemoryRouter>
        <GenreSelection />
      </MemoryRouter>
    );

    const submitButton = screen.getByText(/prosseguir/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/por favor, selecione ao menos um gênero/i)).toBeInTheDocument();
  });

  test("deve chamar handleSubmit e enviar os gêneros corretamente", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <GenreSelection />
      </MemoryRouter>
    );

    const actionButton = screen.getByText("Ação");
    fireEvent.click(actionButton);

    const submitButton = screen.getByText(/prosseguir/i);
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/selecionar_generos"), {
      selectedGenres: ["Action"],
    });
  });

});
