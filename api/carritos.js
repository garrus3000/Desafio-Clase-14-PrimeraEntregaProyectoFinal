import fs from 'fs';

class Carritos {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async makeNewCart() {
        try {
            if (fs.existsSync(this.fileName)) {
                const carrito = JSON.parse(
                    fs.readFileSync(this.fileName, "utf8")
                );
                const id =
                    carrito.length > 0 ? carrito[carrito.length - 1].id + 1 : 1;
                const contenido = {
                    id: id,
                    timestamp: Date().toLocaleString(),
                    productos: [],
                };
                carrito.push(contenido);
                fs.writeFileSync(
                    this.fileName,
                    JSON.stringify(carrito, null, 2)
                );
                return carrito.id;
            }
        } catch (error) {
            console.log("Error newCart :", error);
        }
    }

    async deleteCartbyId(id) {
        try {
            const carrito = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            const index = carrito.findIndex(
                (carrito) => carrito.id === Number(id)
            );
            if (index === -1) return null;
            else {
                carrito.splice(index, 1);
                fs.writeFileSync(
                    this.fileName,
                    JSON.stringify(carrito, null, 2)
                );
            }
        } catch (error) {
            console.log("Error deleteCartbyId: ", error);
        }
    }

    async getProductsByCartId(id) {
        try {
            const carrito = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            const index = carrito.findIndex(
                (carrito) => carrito.id === Number(id)
            );
            if (index === -1) return null;
            else return carrito[index].productos;
        } catch (error) {
            console.log("Error getProductsByCartId: ", error);
        }
    }

    async addProductToCart(id, producto) {
        try {
            const carrito = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            const index = carrito.findIndex(
                (carrito) => carrito.id === Number(id)
            );
            if (index === -1) return null;
            else {
                carrito[index].productos.push(producto);
                fs.writeFileSync(
                    this.fileName,
                    JSON.stringify(carrito, null, 2)
                );
            }
        } catch (error) {
            console.log("Error addProductToCart: ", error);
        }
    }

    async deleteProductFromCart(id, producto) {
        try {
            const carrito = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            const index = carrito.findIndex(
                (carrito) => carrito.id === Number(id)
            );
            if (index === -1) return null;
            else {
                const indexProducto = carrito[index].productos.findIndex(
                    (producto) => producto.id === Number(producto.id)
                );
                if (indexProducto === -1) return null;
                else {
                    carrito[index].productos.splice(indexProducto, 1);
                    fs.writeFileSync(this.fileName, JSON.stringify(carrito, null, 2));
                }
            }
        } catch (error) {
            console.log("Error deleteProductFromCart: ", error);
        }
    }
}

export default Carritos;