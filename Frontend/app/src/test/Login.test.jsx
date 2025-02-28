import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import Login from "../pages/Login";

vi.mock("axios");

describe("Teste do componente Login", () => {
  it("Renderiza o formulário de login", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/usuário/i)).toBeInTheDocument();
  });

  it("Alterna entre login e registro", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Não tem uma conta/i));
    expect(screen.getByText(/Registre-se/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Já tem uma conta/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("Exibe alerta ao tentar logar com campos vazios", () => {
    window.alert = vi.fn(); // Mock para evitar erro no alert
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Enviar/i));
    expect(window.alert).toHaveBeenCalled();
  });
});
