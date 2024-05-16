import * as React from "react"

export const useLogIn = () => {
  const [loggingIn, setLoggingIn] = React.useState<boolean>(false)

  const logIn = async (fun: Function) => {
    try {
      setLoggingIn(true)

      fun()
    } catch (err) {
      console.error(err)
    } finally {
      setLoggingIn(false)
    }
  }

  return { loggingIn, logIn }
}
