let addToCart = document.querySelectorAll(".addshoetocart")
let cartCounter = document.querySelector("#cartCounter")

function updateCart(shoes) {
    // Add shoe to cart
    axios.post("/updatecart", shoes).then(function (res) {

        cartCounter.innerText = res.data.totalQty


    })


}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let shoes = JSON.parse(btn.dataset.shoes);
        updateCart(shoes)
        // console.log(shoes);
    })
})