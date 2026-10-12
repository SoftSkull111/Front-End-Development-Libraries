interface Item {
  type: "book"|"electronics"|"clothing";
  id: string;
  price: number;
}

interface Book extends Item {
  type: "book";
  title: string;
  author: string;
}

interface Electronics extends Item {
  type: "electronics";
  item: string;
  model: string;
  warranty?: number;
}

interface Clothing extends Item {
  type: "clothing";
  item: string;
  brand: string;
  size?: "S"|"M"|"L";
}

type Product = Book|Electronics|Clothing

class Collection<T> {
  items!: T[]
  constructor(items: T[]) {
    this.items = items
  }
  getAll() {
    return this.items
  }
  filter(callback: (item: T)=>boolean) {
    return this.items.filter((item)=>callback(item))
  }
}

const renderProduct = (product: Product) => {
  if (product.type == "book")
    return `
    <span class="item" id="${product.id}"></span>
    <span class="price">${product.price}</span>
    <div class="product-info">Book: ${product.title} by ${product.author}</div>
    `
    else if (product.type == "electronics") {
    return `
    <span class="item" id="${product.id}"></span>
    <span class="price">${product.price}</span>
    <div class="product-info">Electronics: ${product.item} - ${product.model}${product.warranty?` - Warranty: ${product.warranty} year(s)`:""}</div>
    `
    }
    else if (product.type == "clothing") {
          return `
    <span class="item" id="${product.id}"></span>
    <span class="price">${product.price}</span>
    <div class="product-info">Clothing: ${product.item} by ${product.brand}${product.size?` - Size ${product.size}`:""}</div>
    `
    }
    else {
      throw new Error(`Unknown product type: ${JSON.stringify(product)}`)
    }
}

const products = new Collection<Product>([
  {
    type: "book",
    id: "book-1",
    price: 20,
    title: "1984",
    author: "George Orwell"
  },
  {
    type: "electronics",
    id: "electronics-1",
    price: 150,
    item: "Headphones",
    model: "WH-1000",
    warranty: 2
  },
  {
    type: "clothing",
    id: "clothing-1",
    price: 40,
    item: "T-Shirt",
    brand: "Nike",
    size: "M"
  }
]);

const showProducts = (productType?: string) => {
  const output = document.querySelector<HTMLElement>("#output")!
  if (productType == undefined) {
    output.innerHTML = products.items.map((product)=>renderProduct(product)).join("")
  }
  else {
    output.innerHTML = products.items.filter((item)=>item.type == productType).map((product)=>renderProduct(product)).join("")
  }
}

document.addEventListener("click", (e)=> {
  switch ((e.target as HTMLInputElement).id) {
    case "all": showProducts()
    break
    case "books": showProducts("book")
    break
    case "electronics": showProducts("electronics")
    break
    case "clothing": showProducts("clothing")
    break
  }
})

document.addEventListener("DOMContentLoaded", ()=> showProducts())
