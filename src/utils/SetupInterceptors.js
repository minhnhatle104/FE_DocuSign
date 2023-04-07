import instance from './axiosConfig.js'

const SetupInterceptors = () => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.signaText_accessToken
      const user_id = localStorage.uid
      if (accessToken !== 'undefined') {
        console.log(user_id)
        config.headers['authorization'] = accessToken
        config.headers['user_id'] = user_id
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // instance.interceptors.response.use(
  //   (res) => {
  //     if (res.data.accessToken && !res.data.refreshToken) {
  //       const originalConfig = res.config
  //       localStorage.solarBanking_accessToken = res.data.accessToken
  //       return instance(originalConfig)
  //     }
  //     return res
  //   },
  //   async (err) => {
  //     if (err.response.status === 401) {
  //       alert("Login session was expired! Please login again to continue using application.")
  //       navigate('/login')
  //     }
  //
  //     return Promise.reject(err)
  //   }
  // )
}

export default SetupInterceptors
