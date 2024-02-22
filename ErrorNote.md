문제 : can't not module react-router-dom

해결 : @types(@types/react-router-dom)를 설치하고 React-router-dom을 설치하기만 하면 됩니다.
yarn add --dev @types/react-router-dom 만 설치해주었을 때 문제의 에러가 발생. 기본 react-router-dom도 설치받아주었을 때 문제 해결되었습니다.

Typescript react-router-dom은 최신 업데이트가 5ver임.
--dev로 깔았을 때는 에러가 났는데, --dev를 지우고 일반 의존성에 넣어 설치했는데 정상 작동함.

왜 그런지는 아직 잘 모르겠으나, 다시 이런일이 일어난다면 이 메모를 보고 확인해보자.

<hr>

참고 : https://stackoverflow.com/questions/68899565/what-causes-the-typescript-module-has-no-exported-member-ts2305-error-and-how

https://stackoverflow.com/questions/56695271/react-router-and-typescript-throwing-cant-resolve-react-router-dom-error

24.02.22(목)

- .env 파일을 수정하고 터미널을 한 번 종로 후, 다시 켜서 확인하는 습관을 들여야 합니다.
