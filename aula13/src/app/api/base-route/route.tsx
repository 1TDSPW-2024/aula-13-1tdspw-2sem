import client from "../../../../lib/appwrite_client";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoLanche } from "@/types";
import { Databases, ID, Query } from "appwrite";


const database = new Databases(client);

//CRIANDO O LANCHE NA BASE
export async function createLanche(lanche:TipoLanche) {
    try {
        const response = await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TBL_1 as string,
              ID.unique(), 
              lanche);

              return response;
    } catch (error) {
        console.error("Erro criando a tabela geladeira", error);
        throw new Error("Falha em criar a tabela geladeira.")
    }
}

//PEGANDO O LANCHE
export async function pegandoLanche() {
    try {
        const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TBL_1 as string,
              [Query.orderDesc("$createdAt")]);

              return response.documents;
    } catch (error) {
        console.error("Erro pegando a tabela geladeira", error);
        throw new Error("Falha em ler a tabela geladeira.")
    }
}

export async function GET() {
    
    try{
        const lanches = await pegandoLanche();    
        return NextResponse.json(lanches);
    
        }catch(error){
            return NextResponse.json({error:"Falha na listagem dos Lanches."},{status:500});
        }

}

export async function POST(request: Request) {

    try{
    const {nome, preco, desc } = await request.json();
    const lanche = {nome, preco, desc } as TipoLanche;
    const response = await createLanche(lanche);
    
    return NextResponse.json({msg:"Lanche criado."},{status:201});

    }catch(error){
        return NextResponse.json({error:"Falha na criação do Lanche."},{status:500});
    }
}




// export async function GET() {
//     const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
//     const data = JSON.parse(file);
//     return NextResponse.json(data);
// }


// export async function POST(request: Request, response: Response) {

//     const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
//     const data = JSON.parse(file);

//     const { nome, preco, desc } = await request.json();

//     const lanche = { nome, preco, desc } as TipoLanche;

//     //Criando um novo atributo no obj lanche de nome ID:
//     lanche.id = (data[data.length - 1].id + 1);

//     //Iserindo o obj lanche no arquivo JSON:
//     data.push(lanche);
//     const json = JSON.stringify(data);
//     await fs.writeFile(process.cwd() + '/src/data/base.json', json);

//     return NextResponse.json(lanche);
// }