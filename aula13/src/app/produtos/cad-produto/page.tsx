"use client";
import { TipoLanche } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadLanche() {

  const navigate = useRouter();


  // Estados para armazenar os valores dos inputs
  const [produtos, setProdutos] = useState<TipoLanche>({
    id: 0,
    nome: "",
    preco: 0,
    desc: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    //Pegar o event target, desestruturar e depois adicionar no state:
    const { name, value } = e.target;
    setProdutos((prev) => ({ ...prev, [name]: value }));
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    // Exemplo de envio para o backend (integrar com sua API)

    //Determinando o próximo ID
    const dados = await fetch("http://localhost:3000/api/base-route/", {
      method: "GET",
    });
    const listaDeLanches = await dados.json();

    //Determinando último lanche da lista e pegando seu ID + 1.
    const id = listaDeLanches[listaDeLanches.length - 1].id + 1;

    // Atualizando o estado com o novo ID
    setProdutos({ ...produtos, id: id });

    try {
      const response = await fetch("http://localhost:3000/api/base-route/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtos),
      });

      if (response.ok) {
        alert("Lanche cadastrado com sucesso!");
        // Resetar os campos após o envio
        setProdutos({
          id: 0,
          nome: "",
          preco: 0,
          desc: "",
        });

          navigate.push("/");

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
            name="nome"
            value={produtos.nome} onChange={(e) => handleChange(e)} required />
        </div>
        <div>
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            step="0.01"
            id="preco"
            name="preco"
            value={produtos.preco} onChange={(e) => handleChange(e)} required />
        </div>
        <div>
          <label htmlFor="desc">Descrição:</label>
          <textarea
            id="desc"
            name="desc"
            value={produtos.desc} onChange={(e) => handleChange(e)} required></textarea>
        </div>
        <button type="submit">Cadastrar Lanche</button>
      </form>
    </div>
  );
}



// <form onSubmit={handleSubmit}>
// <div>
//   <label htmlFor="nome">Nome do Lanche:</label>
//   <input
//     type="text"
//     id="nome"
//     value={produtos.nome}
//     onChange={(e) => setProdutos({...produtos, nome:e.target.value})}
//     required
//   />
// </div>
// <div>
//   <label htmlFor="preco">Preço:</label>
//   <input
//     type="number"
//     step="0.01"
//     id="preco"
//     value={produtos.preco}
//     onChange={(e) => setProdutos({...produtos, preco: parseFloat(e.target.value)})}
//     required
//   />
// </div>
// <div>
//   <label htmlFor="desc">Descrição:</label>
//   <textarea
//     id="desc"
//     value={produtos.desc}
//     onChange={(e) => setProdutos({...produtos, desc:e.target.value})}
//     required
//   ></textarea>
// </div>
// <button type="submit">Cadastrar Lanche</button>
// </form>