export async function getCurrentSearch(name) {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      console.log(data);
      return data;
  } catch (err) {
    console.error(err);
  }
}
