
async function getFoods() {
  const res = await fetch('http://localhost:3000/api/v1/users/foods')
  const data = await res.json()
  return data;
}

export { getFoods }
