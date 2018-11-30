const hostURL = 'simple.beaux.media'
const apiVersion = 'v3.0.2'

const baseURL = `https://${hostURL}/${apiVersion}`

// AUTH
/* POST */
const register = `/account/register`
const registerVerify = `/account/register/verify`

const loginRequest = `/account/login`
const loginAuthentication = `/account/auth`

// PROFILE
/* GET */
const myProfile = `/sc/profile`
const userProfile = `/sc/profiles` // .../_id/

// SHARED
/* POST */
const smallImageUpload = `/media/upload`

// BROWSE
/* GET */
const browse = `/sc/marketplace`

// TYPEAHEADS
/* GET */
const getTypes = `/typeaheads`

export {
  baseURL,
  register,
  registerVerify,
  loginRequest,
  loginAuthentication,
  myProfile,
  userProfile,
  smallImageUpload,
  browse,
  getTypes
}
