import { service } from './base'

export function login(name, password) {
  // https://daily-dot.vercel.app/auth/login
 return service.post('/auth/login', {
    username: name,
    password,
  })
}
