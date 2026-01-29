import { createContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../lib/api"

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  /* ---------- AUTH ACTIONS ---------- */

  async function login(email, password) {
    const res = await api("/auth/login", "POST", { email, password })
    setUser(res.user)
    setToken(res.token)

    await AsyncStorage.setItem("token", res.token)
    await AsyncStorage.setItem("user", JSON.stringify(res.user))
  }

  async function register(email, password) {
    const res = await api("/auth/register", "POST", { email, password })
    setUser(res.user)
    setToken(res.token)

    await AsyncStorage.setItem("token", res.token)
    await AsyncStorage.setItem("user", JSON.stringify(res.user))
  }

  async function logout() {
    setUser(null)
    setToken(null)
    await AsyncStorage.multiRemove(["token", "user"])
  }

  /* ---------- INIT ---------- */

  async function loadUser() {
    const storedToken = await AsyncStorage.getItem("token")
    const storedUser = await AsyncStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setAuthChecked(true)
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        authChecked
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
