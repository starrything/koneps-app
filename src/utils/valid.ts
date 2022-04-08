import axiosConfig from "@utils/axiosConfig";

export const isEmpty = (str: any) => {
  if (typeof str === "undefined" || str === undefined || str === null || str === "") return true;
  else return false;
};

export const isNotEmpty = (str: any) => {
  if (typeof str === "undefined" || str === undefined || str === null || str === "") return false;
  else return true;
};

export const isValidSession = () => {
  // Description: check Browser - Local Storage
  // TODO: 추후 websocket 방식으로 세션 체크 변경 고려
  const loginInfo = JSON.parse(global.localStorage.getItem("loginInfo") || '{}');
  let lastAccessTime = loginInfo.lastAccessTime;

  const now = new Date();
  const currentTime: number = now.getTime();

  const sessionTimeOut: number = 0;
  if (isNotEmpty(lastAccessTime)) {
    console.log("Login User");
    // login User
    if (currentTime - lastAccessTime < sessionTimeOut) {
      // unit: Millisecond
      // TODO: sessionTimeOut value (interval time)

      // clear browser Local storage
      global.localStorage.clear();
    }
  } else {
    console.log("Anonymous User");
    // anonymous User
    
    // clear browser Local storage
    global.localStorage.clear();
  }
}
