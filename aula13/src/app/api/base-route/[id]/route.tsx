
import client from "../../../../lib/appwrite_client"; 
import { NextResponse } from "next/server";
import { TipoLanche } from "@/types";
import { Databases} from "appwrite";

const database = new Databases(client);


export async function pegaLanche(id:string){
    try {
            const response = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TBL_1 as string,
            id);

        return response;
    } catch (error) {
        console.error("Erro atualizando a tabela lanche", error);
        throw new Error("Falha em deletar o lanche.")
    }
}


export async function atualizandoLanche(id:string,lanche:TipoLanche){
    try {
            const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TBL_1 as string,
            id,
            lanche);

        return response;
    } catch (error) {
        console.error("Erro atualizando a tabela lanche", error);
        throw new Error("Falha em criar a tabela lanche.")
    }
}

export async function deletaLanche(id:string){
    try {
            const response = await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TBL_1 as string,
            id);

        return response;
    } catch (error) {
        console.error("Erro atualizando a tabela lanche", error);
        throw new Error("Falha em deletar o lanche.")
    }
}

export async function GET(request:Request, {params}:{params:{id:number}}) {
    
    try {
        const id = params.id.toString();
        const lanche = await pegaLanche(id);
        return NextResponse.json(lanche);
    } catch (error) {
        console.error("Erro recuperando o lanche", error);
        throw new Error("Falha em recuperar o lanche.")
    }
}

export async function DELETE(request:Request, {params}:{params:{id:number}}) {
    
    try {
        const id = params.id.toString();
        await deletaLanche(id);
        return NextResponse.json({msg:"Lanche deletado com sucesso."});
    } catch (error) {
        console.error("Erro deletando o lanche", error);
        throw new Error("Falha em deletar o lanche.")
    }
}

export async function PUT(request:Request, {params}:{params:{id:number}}) {
    
    try {
        const {nome,preco,desc} = await request.json();
        const lanchinho = {nome,preco,desc} as TipoLanche;
        const id = params.id.toString();
        const lanche = await atualizandoLanche(id,lanchinho);
        return NextResponse.json(lanche);
    } catch (error) {
        console.error("Erro atualizar o lanche", error);
        throw new Error("Falha em atualizar o lanche.")
    }
}





// export async function GET(request:Request, {params}:{params:{id:number}}) {
//     const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
//     const data:TipoLanche[] = JSON.parse(file);
//     const produto = data.find(p => p.id == params.id);

//     return NextResponse.json(produto);
// }


