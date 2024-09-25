"use client";
import { useState } from "react";

export  default function CadLanche() {
  // Estados para armazenar os valores dos inputs
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [desc, setDesc] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construção do objeto lanche
    const novoLanche = {
      nome,
      preco: parseFloat(preco), // Convertendo o preço para número
      desc,
    };

    // Exemplo de envio para o backend (integrar com sua API)
    try {
      const response = await fetch("http://localhost:3000/api/base-route/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLanche),
      });

      if (response.ok) {
        alert("Lanche cadastrado com sucesso!");
        // Resetar os campos após o envio
        setNome("");
        setPreco("");
        setDesc("");
      } else {
        alert("Erro ao cadastrar o lanche.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o lanche:", error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Novo Lanche</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do Lanche:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            step="0.01"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="desc">Descrição:</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Cadastrar Lanche</button>
      </form>
    </div>
  );
}