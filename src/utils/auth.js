export const setToken = (token) => {
  localStorage.setItem("token", token)
}

export const getToken = () => {
  return localStorage.getItem("token")
}

export const removeToken = () => {
  localStorage.removeItem("token")
}

export const isAuthenticated = () => {
  return !!getToken()
}

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const getUser = () => {
  try {
    const user = localStorage.getItem("user")
    if (!user || user === "undefined" || user === "null") {
      return null
    }
    return JSON.parse(user)
  } catch (error) {
    console.error("Error parsing user data:", error)
    localStorage.removeItem("user")
    return null
  }
}
