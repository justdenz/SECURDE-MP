1. When creating a user...
  - URL
    /user/validate_signup
  - Success 
    status = "OK"
    payload = user object
  - Duplicate username or email
    status = "DUPLICATE"
    payload = "The (whatever is duplicate, can be both) already exists, please try another one..."
  - Error
    status = "ERROR"
    paylod = "There was an error creating the user, please try again..."

2. When logging in...
  - URL
    /user/validate_login

