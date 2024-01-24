# 베이스 이미지 설정
FROM node:18.13.0-alpine

# 작업 디렉토리 생성
WORKDIR /usr/src/app

# 포트 바인딩
EXPOSE 3000

# 애플리케이션 의존성 설치
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드와 필요한 패키지들을 위한 npm ci
# RUN npm ci --only=production

# 애플리케이션 소스 추가
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 애플리케이션 실행
CMD [ "npm", "run", "start:dev" ]
# CMD [ "npm", "run", "start:prod" ]