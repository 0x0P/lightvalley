# LIGHTVALLEY 상태코드

## 상태코드 해석법

### 타입:상세코드

```
ex) Auth:1
```

계정 및 로그인 문제의 1번 항목 참조

## 타입

Request : 리퀘스트  
Auth : 계정 및 로그인  
Docs : 문서  
Server : 서버

### Request : 리퀘스트

1 : 필수 body 누락  
2 : RefreshToken 쿠키 손상

### Auth : 계정 및 로그인

1 : 계정을 찾을 수 없음  
2 : 비밀번호 불일치

### Docs : 문서

1 : 문서를 찾을 수 없음  
2 : READ 권한 부족  
3 : EDIT 권한 부족
4 : EDIT 변경 사항 없음

### Server : 서버

1 : 서버 오류 발생
