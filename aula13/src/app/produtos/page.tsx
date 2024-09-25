import Link from "next/link";

export default function Produtos() {

    const lista = [
        { id: 1, nome: "cachorro-quente", preco: 10.50, desc: "Doguito" },
        { id: 2, nome: "sanduba-frio", preco: 15.55, desc: "Chapinha" },
        { id: 3, nome: "misto-cheio", preco: 22.77, desc: "Cheio de Vento" },
        { id: 4, nome: "miauzito-dalhe", preco: 9.80, desc: "Churrasquinho da tia" },
        { id: 5, nome: "coxinha-vem-que-tem", preco: 7.50, desc: "Vem que tem nada..." },
    ];

    return (
        <div>
            <h2>Produtos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>R$</th>
                        <th>DESCRIÇÃO</th>
                        <th>EDITAR</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((lanche) => (
                        <tr key={lanche.id}>
                            <td>{lanche.id}</td>
                            <td>{lanche.nome}</td>
                            <td>{lanche.preco}</td>
                            <td>{lanche.desc}</td>
                            <td> <Link href={`/produtos/produto/${lanche.id}`}>Editar</Link></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            Quantidade de lanches : {lista.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}
