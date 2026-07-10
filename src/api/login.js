import { request } from './base'

export function login(name, password) {
  // https://daily-dot.vercel.app/auth/login
 return request.post('/auth/login', {
    username: name,
    password,
  })
}
