import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoLanche } from "@/types";



export async function GET(request:Request, {params}:{params:{id:number}}) {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const data:TipoLanche[] = JSON.parse(file);
    const produto = data.find(p => p.id == params.id);

    return NextResponse.json(produto);
}