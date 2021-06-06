export const consoleLogger = function consoleLogger(...message) {
    if (process.env.NODE_ENV === "development") {
      console.log(message)
    }
  }