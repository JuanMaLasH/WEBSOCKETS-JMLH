import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
      this.products = []; 
      this.path = path;
  }  
  
  async getProducts() {
      try {
          const readProductsJSON = await fs.promises.readFile(this.path, "utf8");
          if (readProductsJSON.length > 0) {
          this.products = JSON.parse(readProductsJSON)
          return this.products;
        } else return [];
      } catch (error) {
        console.log(error);
      }
    }

  async addProduct(prod) {
    try {
      const product = {
        id: uuidv4(),
        ...prod,
      };
      const products = await this.getProducts();
      const productExist = products.find((p) => p.title === product.title);
      if (productExist) return "Product already exists";
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(prod, id) {
    try {
      const products = await this.getProducts();
      let productExist = await this.getProductById(id);
      if (!productExist) return null;
      productExist = { ...productExist, ...prod };
      const newArrayOfProducts = products.filter((p) => p.id !== id);
      newArrayOfProducts.push(productExist)
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayOfProducts));
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    if (products.length > 0) {
      const productExist = await this.getProductById(id);
      if (productExist) {
        const newArrayOfProducts = products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArrayOfProducts));
        return productExist;
      } 
    } else return null
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("Delete file");
    } catch (error) {
      console.log(error);
    }
  }
}

// PRODUCTOS

/*
[
{
    "title": "Disco Rígido WD 2TB BLUE 256MB SATA 6.0GB/s",
    "description": "Características: Tipo de conexión: SATA, Consumo: 5w y Tipo de disco: Mecánico",
    "code": "WD20EZBX-00AYRA0",
    "price": 73840,
    "status": true,
    "stock": 50,
    "category": "Disco rígido",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_35996_Disco_Rigido_WD_2TB_BLUE_256MB_SATA_6.0GB_s_7200RPM_dc36f8f5-grn.jpg"	
},
{
    "title": "Disco Sólido SSD WD 480GB GREEN 545MB/s SATA",
    "description": "Características: Tipo de conexión: SATA, Consumo: 3w y Tipo de Disco: Sólido",
    "code": "WDS480G2G0A",
    "price": 42600,
    "status": true,
    "stock": 100,
    "category": "Disco rígido",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_11198_Disco_S__lido_SSD_WD_480GB_GREEN_545MB_s_SATA_401cd02f-grn.jpg"	
},
{
    "title": "Fuente Deepcool 500W DA500 80 Plus Bronze",
    "description": "Características: Watts Nominal: 500w y Watts Reales: 500w",
    "code": "4718009157231",
    "price": 67900,
    "status": true, 
    "stock": 30,
    "category": "Fuente",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_14808_Fuente_Aerocool_Cylon_500W_Full_Range_RGB_80_Plus_Bronze_a3fec892-grn.jpg"	
},
{
    "title": "Fuente Deepcool 600W DA600 80 Plus Bronze",
    "description": "Características: Watts Nominal: 600w y Watts Reales: 600w",
    "code": "4718009157248",
    "price": 77500,
    "status": true, 
    "stock": 40,
    "category": "Fuente",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_14814_Fuente_Aerocool_Cylon_600W_Full_Range_RGB_80_Plus_Bronze_a3fec892-grn.jpg"
},
{
    "title": "Memoria Team DDR4 8GB 3200MHz T-Force Vulcan Z",
    "description": "Características: Latencia: 16 cl y Voltaje: 1.35v",
    "code": "TLZGD48G3200HC16F01",
    "price": 27900,
    "status": true, 
    "stock": 100,
    "category": "Memoria RAM", 
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_33872_Memoria_Team_DDR4_8GB_3200MHz_T-Force_Vulcan_Z_Grey_CL16_07ea04cc-grn.jpg"
},
{
    "title": "Memoria Corsair DDR4 16GB 3200MHz Vengeance RGB RS Black",
    "description": "Características: Latencia: 16cl y Voltaje: 1.20 v",
    "code": "CMG16GX4M1E3200C16",
    "price": 56990,
    "status": true, 
    "stock": 50,
    "category": "Memoria RAM",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39404_Memoria_Corsair_DDR4_16GB_3200MHz_Vengeance_RGB_RS_Black_CL16_13536a39-grn.jpg"
},
{
    "title": "Mother Asrock H610M-HVS LGA 1700",
    "description": "Chipseat principal: Intel H610",
    "code": "H610M-HVS",
    "price": 89950,
    "status": true,
    "stock": 10,
    "category": "Mother",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_34006_Mother_Asrock_H610M-HVS_LGA_1700_486791bd-grn.jpg"	
},
{
    "title": "Mother Gigabyte H470M H Socket 1200",
    "description": "Chipseat principal: Intel H470",
    "code": "H470M-H",
    "price": 89110,
    "status": true,
    "stock": 150,
    "category": "Mother",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_37182_Mother_Gigabyte_H470M_H_Socket_1200_11c1fdca-grn.jpg" 
},
{
    "title": "Procesador AMD Ryzen 5 4500 + Wraith Stealth Cooler AM4",
    "description": "Características: Núcleos:6",
    "code": "100-100000644BOX",
    "price": 118450,
    "status": true,
    "stock": 100, 		
    "category": "Procesador",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_32727_Procesador_AMD_Ryzen_5_4500___Wraith_Stealth_Cooler_AM4_475b8356-grn.jpg"
},
{
    "title": "Procesador AMD Ryzen 5 4600G 3.7GHz + Wraith Stealth Cooler AM4",
    "description": "Características: Núcleos: 6",
    "code": "100-100000031SBX",
    "price": 154500,
    "status": true,
    "stock": 20,
    "category": "Procesador",
    "thumbnails": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_16749_Procesador_AMD_RYZEN_5_3600_4.2GHz_Turbo_AM4_Wraith_Stealth_Cooler_f8ab4915-grn.jpg"
}
]
*/