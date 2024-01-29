let removeshoefromcart = document.querySelectorAll(".removeshoefromcart");
let cartCounter = document.querySelector("#cartCounter");
let itemremoved = document.querySelector(".itemremoved");

console.log(removeshoefromcart);


function removeCart(shoes) {
    axios.post("/removecart", shoes).then(function (res) {
        console.log(res);
        cartCounter.innerText = res.data.totalQty
    }
    )
}

removeshoefromcart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let shoes = JSON.parse(btn.dataset.shoes);


        removeCart(shoes)
    })
})