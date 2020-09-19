### File Structure

```
├── index.js
├── package-lock.json
├── package.json
├── models
|  └── User.js
├── routes
|  ├── admin
|  ├── auth
|  └── protected
└── utils
   ├── checkAuth.js
   ├── comparePass.js
   ├── db.js
   └── hashPass.js
```

### ENV Variables

Set environment variables

```JS
PORT=
MONGO_URI=
ADMIN_EMAIL=
ADMIN_PASS=
ADMIN_COOKIE_NAME=
ADMIN_COOKIE_PASS=
JWT_SECRET=
```

### Admin Bro Endpoint

```
http://localhost:PORT/admin
```

### `Run`

Run in root

```sh
node index
```
