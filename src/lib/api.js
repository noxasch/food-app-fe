
async function getFoods() {
  const res = await fetch('http://localhost:3000/api/v1/users/foods')
  const data = await res.json()
  return data;
}

async function createFood(payload) {
  const res = await fetch('http://localhost:3000/api/v1/users/foods', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  return data;
}

async function updateFood(id, payload) {
  const res = await fetch(`http://localhost:3000/api/v1/users/foods/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  return data;
}

async function removeFood(id) {
  const res = await fetch(`http://localhost:3000/api/v1/users/foods/${id}`, {
    method: 'DELETE',
  })
  const data = await res.json()
  return data;
}

export { getFoods, createFood, updateFood, removeFood }
