//绑定搜素框和搜素按钮
let searchInput = document.querySelector(".search").querySelector("input");
let searchButton = document.querySelector(".search").querySelector("button");

//方法：搜索
function search() {
  let searchText = searchInput.value; //搜素内容

  window.open(`list.html?name=${searchText}`);
}

//搜索框 回车
searchInput.addEventListener("keyup", function (e) {
  if (e.key == "Enter") search();
});

//搜索按钮 点击
searchButton.addEventListener("click", search);
