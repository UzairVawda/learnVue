import cats from '@/data/cats'
import dogs from '@/data/dogs'

export default {
  cats,
  dogs,
  allPets: [...cats, ...dogs]
}
