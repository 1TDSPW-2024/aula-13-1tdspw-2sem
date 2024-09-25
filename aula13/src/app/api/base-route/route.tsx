import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoLanche } from "@/types";


export async function GET() {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
}

export async function POST(request:Request,response:Response) {

    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const data = JSON.parse(file);

    const {nome,preco,desc} = await request.json();
    
    const lanche = {nome,preco,desc} as TipoLanche;

    //Criando um novo atributo no obj lanche de nome ID:
    lanche.id = (data[data.length-1].id + 1);
    
    //Iserindo o obj lanche no arquivo JSON:
    data.push(lanche);
    const json = JSON.stringify(data);
    await fs.writeFile(process.cwd() + '/src/data/base.json', json);

    return NextResponse.json(lanche);
}