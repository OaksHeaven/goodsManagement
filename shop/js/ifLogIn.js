//设置默认请求地址
axios.defaults.baseURL = "https://229f-183-227-150-131.jp.ngrok.io";
//允许携带cookie
axios.defaults.withCredentials = true;

//得到login.html的路径路径备用
let pathArr = window.location.pathname.split("/");
pathArr.splice(pathArr.length - 1, 1, "login.html");
pathArr = pathArr.join("/");

//查询登录状态
axios.get("/api/logState").then(res => {
  //如果没有登录
  if (!res.data.state) {
    alert(res.data.msg);
    console.log(pathArr);

    window.location.pathname = pathArr; //跳转到登录页面
  } else console.log(res.data.msg);
});

/*退出登录模块*/
let logoutDom = document.querySelector(".logout");
logoutDom.addEventListener("click", () => {
  if (confirm("确定退出登录吗？")) {
    axios.get("/api/logout").then(res => {
      alert(res.data.msg);
      window.location.pathname = pathArr; //跳转到登录页面
    });
  }
});
