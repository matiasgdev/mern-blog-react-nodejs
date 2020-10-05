const URL_NEW_USER = 'http://localhost:4000/api/auth/signup'

export default function fetchNewUser({ payload } = {}) {

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }

  const data = fetch(URL_NEW_USER, config)
  .then((res) => res.json())
  .then(data => data)
  .catch(e => e)

  return data
}