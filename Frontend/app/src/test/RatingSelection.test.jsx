import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RuntimeSelection from '../pages/RuntimeSelection';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';

// Mock da função axios.post
vi.mock('axios');

describe('RuntimeSelection', () => {
  test('deve renderizar os tempos e selecionar um', () => {
    render(
      <Router>
        <RuntimeSelection />
      </Router>
    );

    // Verificar se os tempos estão sendo renderizados
    const times = [
      { label: "1h30", value: "90" },
      { label: "1h45", value: "105" },
      { label: "2h00", value: "120" },
      { label: "2h30", value: "150" },
      { label: "3h00", value: "180" },
      { label: "Longo", value: "210" },
    ];

    times.forEach(time => {
      expect(screen.getByText(time.label)).toBeInTheDocument();
    });

    // Simular o clique em um tempo
    const firstTime = screen.getByText("1h30").closest('.time-point');
    fireEvent.click(firstTime);

    // Verificar se o tempo foi selecionado
    expect(firstTime).toHaveClass('selected');
  });

  test('deve chamar a função de enviar tempo ao backend', async () => {
    render(
      <Router>
        <RuntimeSelection />
      </Router>
    );

    // Mock de resposta do axios
    axios.post.mockResolvedValue({ data: 'sucesso' });

    // Simular o clique no botão "Prosseguir"
    const button = screen.getByText(/Prosseguir/i);
    fireEvent.click(button);

    // Verificar se o axios foi chamado com o tempo correto
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/tempo'),
      { time: '90' }
    ));
  });
});
 