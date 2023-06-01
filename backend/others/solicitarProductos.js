// Importación de módulos
const { mongoose } = require('../database');
const axios = require('axios');
const Producto = require('../models/producto');

// Verificar el argumento de línea de comandos y llamar a la función correspondiente
if (process.argv[2] === 'ebay') {
  productosEbay();
}
if (process.argv[2] === 'amazon') {
  productosAmazon();
}

// Función asincrónica para obtener productos de eBay
async function productosEbay() {
  // Configuración de opciones para la solicitud a la API de eBay
  const options = {
    method: 'GET',
    url: 'https://ebay-data-scraper.p.rapidapi.com/products',
    params: {
      page_number: '1',
      product_name: 'television',
      country: ''
    },
    headers: {
      'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
      'X-RapidAPI-Host': 'ebay-data-scraper.p.rapidapi.com'
    }
  };

  try {
    // Realizar la solicitud a la API de eBay
    const response = await axios.request(options);
    console.log(response.data.length);

    // Iterar sobre los productos recibidos y guardarlos en la base de datos
    for (let i = 0; i < response.data.length; i++) {
      const producto = response.data[i];

      // Crear una instancia de Producto y asignar los valores correspondientes
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
        categoria: "Televisiones"
      });

      // Guardar el nuevo producto en la base de datos
      await nuevoProducto.save();
    }
  } catch (error) {
    console.error(error);
  }
}

// Función asincrónica para obtener productos de Amazon
async function productosAmazon() {
  // Configuración de opciones para la solicitud a la API de Amazon
  const options = {
    method: 'GET',
    url: 'https://amazon-data-scraper124.p.rapidapi.com/search/movies',
    params: {
      api_key: '3ba0325127417000e0b265200ab7ed34'
    },
    headers: {
      'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
      'X-RapidAPI-Host': 'amazon-data-scraper124.p.rapidapi.com'
    }
  };

  let respuesta;

  try {
    // Realizar la solicitud a la API de Amazon
    respuesta = await axios.request(options);
    console.log(respuesta.data.results);
  } catch (error) {
    console.error(error);
  }

  if (respuesta != null) {
    // Iterar sobre los resultados recibidos y obtener información adicional de cada producto
    for (let i = 0; i < respuesta.data.results.length; i++) {
      const url = respuesta.data.results[i].url;
      const start = 'dp/';
      const end = '/ref';
      const id = url.substring(url.indexOf(start) + start.length, url.indexOf(end));
      const prime = respuesta.data.results[i].has_prime == true ? "con prime" : "sin prime";
      const cantidad_disponible = respuesta.data.results[i].availability_quantity == null ? "" : respuesta.data.results[i].availability_quantity;
      const img = respuesta.data.results[i].image;
      console.log(id);

      // Configuración de opciones para la solicitud a la API de extracción de datos de Amazon
      const options = {
        method: 'GET',
        url: 'https://amazon_data_extractor.p.rapidapi.com/products/' + id,
        params: {
          api_key: '8045a19e2deb0a201d022a330d701576'
        },
        headers: {
          'X-RapidAPI-Key': '570a3c45a3mshbd067cf0a53628bp1759bajsn58c188faeb8a',
          'X-RapidAPI-Host': 'amazon_data_extractor.p.rapidapi.com'
        }
      };

      try {
        // Realizar la solicitud a la API de extracción de datos de Amazon
        const response = await axios.request(options);
        console.log(response.data);
        console.log("Asin producto solo: " + response.data);
        const producto = response.data;

        if (producto.name == "StatusCodeError") {
          break;
        }

        // Crear una instancia de Producto y asignar los valores correspondientes
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
          categoria: "Peliculas"
        });
        console.log(nuevoProducto);
        
        // Guardar el nuevo producto en la base de datos
        await nuevoProducto.save();
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    console.log("La respuesta está vacía, algún dato mal puesto");
  }
}