# Snap Scope

자주 쓰는 렌즈 초점거리 알아보기

## 소개

Snap Scope는 사진 파일의 EXIF 데이터 중 렌즈의 초점거리(Focal length) 정보를 분석하여 이를 시각화해주는 애플리케이션입니다. 자주 사용하는 초점거리를 한눈에 볼 수 있어, 자신의 촬영 스타일을 더 잘 이해할 수 있습니다.

여기서 사용하는 모든 초점거리는 35mm 포맷 기준으로 환산된 값입니다.

## 프라이버시

- 모든 이미지 처리와 EXIF 데이터 분석은 사용자의 브라우저에서만 이루어집니다.
- 이미지와 이미지에서 추출하는 모든 데이터는 그 어떤 곳에도 전송하지 않습니다.

## 시작하기

이 프로젝트는 [Node.js@22](https://nodejs.org/ko) 및 [PNPM@9.15.3](https://pnpm.io/ko/)을 이용합니다. PNPM은 [Node Corepack](https://nodejs.org/api/corepack.html)을 이용합니다. 자세한 설정은 [package.json](./package.json) 파일을 참고해 주세요.

```bash
# 1. 리포지토리 클론
git clone https://github.com/Gumball12/snap-scope.git
cd snap-scope

# 2. 디펜던시 설치
corepack enable # Corepack 활성화
pnpm install

# 3. 개발 서버 실행
pnpm dev # http://localhost:5173/

# 프로덕션 빌드
pnpm build
```

## 라이선스

[MIT License](./LICENSE)
