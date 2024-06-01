const obtenerProductos = async () =>{
    try{
        let respuesta = await fetch("");
        let json = await respuesta.json();
        return json;

    }catch(error){
        console.error('se produjo un error', error);
    }

}

const main = async() =>{
    let producto = await obtenerProductos();
    console.log(producto)
}

await main()