### flyctl
[https://fly.io/docs/hands-on/install-flyctl/](Install)  
[https://fly.io/docs/hands-on/sign-up/](Sign up)
[https://fly.io/docs/hands-on/sign-in/](Sign in)

Run cell below to enable `fly` commmand:
```bash
export FLYCTL_INSTALL=<path to folder fly>
export PATH="$FLYCTL_INSTALL/bin:$PATH"
```
Setup MONGODB:
```bash
fly secrets MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.vwz1m.mongodb.net/phonebookApp?retryWrites=true&w=majority
```

```bash
cd phonebook-backend
npm run deploy:full
```
Go to the website https://twilight-bird-9641.fly.dev/