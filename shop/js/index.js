axios.defaults.withCredentials = true;
//获取‘全部商品’元素
let dd_productions = document.querySelector("#dd_productions");

//得到全部商品
axios
  .get("/api/allProductions")
  .then(res => {
    let dd_li = res.data;
    console.log(dd_li);
    //动态生成商品种类列表及其链接
    for (let i = 0; i < dd_li.length; i++) {
      dd_productions.innerHTML += `<li class='dd_li'><a href='list.html?name=${dd_li[i].TABLE_NAME}' target='_blank'>${dd_li[i].TABLE_NAME}</a><div class="dd_cancel">X</div></li>`;
    }
  })
  .then(() => {
    let ddCancel = document.querySelectorAll(".dd_cancel");
    for (let single of ddCancel) {
      console.log(single);
      single.addEventListener("click", () => {
        let race = single.previousElementSibling.innerText; //商品种类即为这个元素的上一个兄弟元素的文本内容

        if (confirm(`确认删除该类商品:${race}？`)) {
          console.log("yes");
          //请求删除该类
          axios.get(`/api/popClass?race=${race}`).then(res => {
            console.log(res);
            window.location.reload();
          });
        }
      });
    }
  })
  .then(() => {
    //添加商品种类操作 把他放在 .innerHTML后，因为.innerHTML会更新dom导致事件绑定失败
    let addLink = document.querySelector("#add_class"); //“添加商品种类的那个link”

    // 点击后;
    addLink.addEventListener("click", function () {
      let cString = prompt("输入商品种类");
      if (cString) {
        console.log(cString);
        axios.get(`/api/addClass?race=${cString}`).then(res => {
          console.log(res);
          window.location.reload(); //创建完后刷新页面
        });
      }
    });
  });

// addLink.onclick = function (e) {
//   e.preventDefault(); //阻止默认跳转
//   console.log("a");
//   let cString = prompt("输入商品种类");
//   if (cString) {
//     console.log(cString);
//   }
// };
