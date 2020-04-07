export default {
  countPets: (state) => {
    return state.cats.length + state.dogs.length
  },
  getAllCats: (state) => {
    return state.allPets.filter((pet) => {
      return pet.species === 'cat'
    })
  }
}
