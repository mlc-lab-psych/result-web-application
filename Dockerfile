FROM node:22-alpine AS npm-builder

WORKDIR /app

COPY web/package*.json ./

RUN npm ci

COPY web/ .

RUN npm run build

FROM docker.io/golang:1.26.2-alpine AS go-build

WORKDIR /src/
RUN apk add git
COPY go.* .
RUN go mod download

COPY internal internal
COPY --from=npm-builder /app/build /src/web/build

COPY *.go .
RUN go build -v -o results

FROM docker.io/alpine
RUN apk add --no-cache tzdata

COPY --from=go-build /src/results /results

ENTRYPOINT [ "/results" ]
