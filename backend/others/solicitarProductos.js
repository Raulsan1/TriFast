const {mongoose} = require('../database');
const axios = require('axios');
const Producto = require('../models/producto');


if(process.argv[2] === 'ebay'){
    productosEbay();
}
if(process.argv[2] === 'amazon'){
    productosAmazon();
}

async function productosEbay() {

    const options = {
        method: 'GET',
        url: 'https://ebay-data-scraper.p.rapidapi.com/products',
        params: {
            page_number: '1',
            product_name: 'console',
            country: ''
        },
        headers: {
            'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
            'X-RapidAPI-Host': 'ebay-data-scraper.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.length);
        
        for (let i = 0; i < response.data.length; i++){

            const producto = response.data[i];

            const nuevoProducto = new Producto({
                id_producto: producto.product_id,
                nombre: producto.name,
                condicion: producto.condition,
                precio: producto.price,
                descuento: producto.discount,
                localizacion_producto: producto.product_location,
                envio: producto.logistics_cost,
                descripcion: producto.description,
                cantidad_disponible: producto.sales_potential,
                link: producto.link,
                img: producto.thumbnail,
                tienda: "Ebay",
                categoria: "consolas"
            });

            await nuevoProducto.save();
        }


    } catch (error) {
        console.error(error);
    }

}


async function productosAmazon(){

    const options = {
        method: 'GET',
        url: 'https://amazon_data_extractor.p.rapidapi.com/search/consoles',
        params: {
          api_key: '8045a19e2deb0a201d022a330d701576'
        },
        headers: {
          'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
          'X-RapidAPI-Host': 'amazon_data_extractor.p.rapidapi.com'
        }
      };

    let respuesta;
        
    try {
        respuesta = await axios.request(options);
        console.log(respuesta.data.results.length);

    } catch (error) {
        console.error(error);
    }
    
    if(respuesta != null){

        for (let i = 0; i < respuesta.data.results.length; i++){

            const url = respuesta.data.results[i].url;
            const start = 'dp/';
            const end = '/ref';
            const id = url.substring(url.indexOf(start) + start.length, url.indexOf(end));
            const prime = respuesta.data.results[i].has_prime == true ? "con prime" : "sin prime";
            const cantidad_disponible = respuesta.data.results[i].availability_quantity == null ? "" : respuesta.data.results[i].availability_quantity;
            const img = respuesta.data.results[i].image
            console.log(id);
    
            const options = {
                method: 'GET',
                url: 'https://amazon_data_extractor.p.rapidapi.com/products/'+id,
                params: {
                  api_key: '8045a19e2deb0a201d022a330d701576'
                },
                headers: {
                  'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
                  'X-RapidAPI-Host': 'amazon_data_extractor.p.rapidapi.com'
                }
              };
            
    
            try {
                const response = await axios.request(options);
                console.log(response.data);
                console.log("Asin producto solo: "+response.data);
                const producto = response.data;

                if(producto.name == "StatusCodeError"){
                    break;
                }
                
                const nuevoProducto = new Producto({
                    id_producto: id,
                    nombre: producto.name,
                    condicion: "",
                    precio: producto.pricing,
                    descuento: "",
                    localizacion_producto: "",
                    envio: prime,
                    descripcion: producto.small_description,
                    cantidad_disponible: cantidad_disponible,
                    link: url,
                    img: img,
                    tienda: "Amazon",
                    categoria: "Consolas"
    
                });
                console.log(nuevoProducto);
                await nuevoProducto.save();

            } catch (error) {
                console.error(error);
            }
        }

    }else {
        console.log("La respuesta esta vacia, algun dato mal puesto");
    }

}