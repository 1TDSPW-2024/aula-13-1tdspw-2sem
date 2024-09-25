
export default function Produto({params}:{params:{id:number}}) {



  return (
    <div>
        <h1>Produto</h1>
        <div>
            <p>ID: {params.id}</p>
            
        </div>
    </div>
  )
}
