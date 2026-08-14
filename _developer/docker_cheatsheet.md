
# Docker Development

```bash
## rebuild
docker builder prune -f

docker build -t mighty-todo:local .

#Verify the image:
docker images | grep mighty-todo


#Run Container Locally

docker rm -f mighty-todo
docker run \
  --name mighty-todo \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e HOST=0.0.0.0 \
  -e PORT=3000 \
  -e ORIGIN=http://localhost:3000 \
  -e DATABASE_URL=file:/app/prisma/dev.db \
  -v "$(pwd)/prisma:/app/prisma" \
  mighty-todo:local

# Application:
# http://localhost:3000

#View running containers:
docker ps

#Stop container:
docker stop mighty-todo

#Remove container:
docker rm mighty-todo

#Restart:
docker start mighty-todo

#View Logs
docker logs -f mighty-todo

#Stop existing container:

docker rm mighty-todo
```


## Then rebuild and reload the image: 
rebuild docker and reload kind

```bash
docker build -t mighty-todo:local .
kind load docker-image mighty-todo:local --name mighty-todo
kubectl rollout restart deployment mighty-todo
```