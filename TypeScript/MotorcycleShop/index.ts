type Category = 'Sport'| 'Cruiser'| 'Touring'| 'Dirt'| 'Adventure'| 'Naked'| 'Electric'
interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
}
const fetchMotorcycles = (): Promise<Motorcycle[]> => {
  return fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json").then((response)=>response.json())
}

const renderMotorcycleCard = (motorcycle: Motorcycle): string => {
  return `
  <img src="${motorcycle.image_url}" alt="motorcycle image" class="motorcycle-card-image-container">
  <p class="motorcycle-card-year-badge">${motorcycle.year}</p>
  <p class="motorcycle-card-title">${motorcycle.name}</p>
  <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
  <p class="motorcycle-card-category">${motorcycle.category}</p>
  <p class="motorcycle-card-description">${motorcycle.description}</p>
  <p class="motorcycle-card-price">${motorcycle.price}</p>
  <p class="motorcycle-card-engine">${0}</p>
  `
}

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = []
  public renderMotorcycles = () => {
    fetchMotorcycles().then((motorcycles)=> {
      this.allMotorcycles = motorcycles
      const motorcycleGrid = document.getElementById("motorcycle-grid") as HTMLElement
      motorcycleGrid.innerHTML = this.allMotorcycles.map((motorcycle)=>renderMotorcycleCard(motorcycle)).join("")
      const resultsNumber = document.getElementById("results-number") as HTMLElement
      resultsNumber.textContent = `${this.allMotorcycles.length}`
    })
  }
}
const gallery1 = new MotorcycleGalleryApp()
gallery1.renderMotorcycles()
document.addEventListener("input", ()=>{
  const gallery1 = new MotorcycleGalleryApp()
  gallery1.renderMotorcycles()
})

