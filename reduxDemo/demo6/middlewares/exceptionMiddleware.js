const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action)
  } catch (error) {
    console.log('报告错误：', error)
  }
}

export default exceptionMiddleware;