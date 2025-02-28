import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LastPage from "../pages/LastPage";

describe("LastPage Component", () => {
  it("deve renderizar o texto corretamente", () => {
    render(<LastPage />);
    expect(screen.getByText("Hora da pipoca")).toBeInTheDocument();
  });

  it("deve renderizar a imagem corretamente", () => {
    render(<LastPage />);
    const image = screen.getByAltText("Imagem final da fila");
    expect(image).toBeInTheDocument();
  });
});
