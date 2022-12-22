//定义一个“总花费”
let totalMoney = 0;

//定义一个“购物车信息”carInfo
let carInfo;

//获取元素"购物车盒子"
let car_box = document.querySelector("#car_box");

//设置默认请求地址
axios.defaults.baseURL = "http://127.0.0.1:8000";

//获取购物车信息并渲染
axios.get("/api/getShopCarInfo")
    .then(res => {
        //如果返回结果为空 则返回“购物车为空”
        if (res.data == "no data") return null;

        carInfo = res.data
        console.log(carInfo);
        car_box.innerHTML = ""; //先清空
        for (let i = 0; i < carInfo.length; i++) {
            car_box.innerHTML += `
        <div class="car_items">
            <div class="car_item_check">
                <input type="checkbox" id="shop[${i}]_check">
                <div></div>
            </div>
            <a href="items.html?race=${carInfo[i].race}&item=${carInfo[i].item}">
                <div class="car_item_info">
                    <img src="data:image/png;base64,${carInfo[i].pictures}" title="${carInfo[i].item}">
                    <div>${carInfo[i].item}</div>
                    <div>x${carInfo[i].count}</div>
                    <div><em>￥${carInfo[i].cost}</em></div>
                </div>
            </a>
        </div>`
        }
        return carInfo;
    })
    .then(carInfo => {
        //给渲染出的元素加交互
        //获取复选框盒子元素
        let checkBox = document.querySelectorAll(".car_item_check");
        console.log(checkBox);
        let checkInput;
        for (let i = 0; i < checkBox.length; i++) {
            (function (i) {
                //将复选框盒子点击事件与复选框控件绑定
                checkBox[i].addEventListener("click", function (e) {
                    //获取复选框元素
                    checkInput = checkBox[i].querySelector("input");
                    checkInput.checked = !checkInput.checked;

                    //选中后加到“总花费”里
                    if (checkInput.checked) {
                        totalMoney += carInfo[i].cost;
                    } else {
                        totalMoney -= carInfo[i].cost;
                    }
                    //重绘“总花费”
                    let total_money = document.querySelector('.total_money');
                    total_money.innerHTML = `￥${totalMoney}`;
                }, false)
            })(i);
        }

        return checkBox;
    }).then(checkBox => {
        /* 购买物品并得到花费 */
        // 获取购买按钮
        let buyButton = document.querySelector('.shopCar_submit');
        //定义一个数组，用来存放选中的购物车项目信息
        let cleanCarItem = [];
        //绑定事件 选中（取消）后存入（移出cleanCarItem）
        for (let i = 0; i < checkBox.length; i++) {
            checkBox[i].addEventListener('click', () => {
                checkInput = checkBox[i].querySelector("input");
                if (checkInput.checked) {
                    cleanCarItem.push(carInfo[i]);
                } else {
                    cleanCarItem.shift(carInfo[i]);
                }
            })
        }

        //购买按钮点击事件 结算并删去对应购物车元组
        buyButton.addEventListener('click', () => {
            console.log(JSON.stringify(cleanCarItem))
            axios.post('/api/buy', JSON.stringify(cleanCarItem), {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    }
                })
                .then(res => {
                    alert(totalMoney)
                    window.location.reload();
                })
        })
    })