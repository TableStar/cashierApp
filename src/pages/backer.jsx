{
  order.length > 0 && (
    <Flex flexDirection={"column"} bg={"white"} width={"200px"}>
      <h1>Order List</h1>

      <Flex flexDirection={"column"} padding={"10px"} minHeight={"70vh"}>
        {order.map((val, idx) => (
          <Flex gap={"1"} key={idx}>
            <BasketDrop
              button={() => {
                OrderList(val);
              }}
              {...val}
            />
            <Flex flexDirection={"column"}>
              <IconContext.Provider value={{ size: "30" }}>
                <IconButton
                  aria-label="minus"
                  bg={"white"}
                  icon={<AiOutlineMinusSquare />}
                  _hover={{
                    color: "white",
                    bg: "red",
                    borderColor: "transparent",
                  }}
                  onClick={() => {
                    onHandleDeleteOrder(val);
                  }}
                />
              </IconContext.Provider>
              <Text>X{val.quantity}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Flex
        flexDirection={"column"}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"right"}
      >
        <Text>Total = Rp. {sumBasket().toLocaleString("id-ID")}</Text>
        <Button
          borderColor={"transparent"}
          _hover={{
            color: "white",
            borderColor: "transparent",
            bg: "red",
          }}
        >
          SUBMIT
        </Button>
      </Flex>
    </Flex>
  );
}

const foodMenu = [
  {
    id: 1,
    text: "Hot Plate",
    price: 32000,
    type: "Hot",
    gambar: hotplate,
    isReady: true,
  },
  {
    id: 2,
    text: "Chicken Soup",
    price: 18000,
    type: "Hot",
    gambar: soup,
    isReady: true,
  },
  {
    id: 3,
    text: "Martini",
    price: 21000,
    type: "Drink",
    gambar: martini,
    isReady: true,
  },
  {
    id: 4,
    text: "French Fries",
    price: 12000,
    type: "Snack",
    gambar: fries,
    isReady: true,
  },
  {
    id: 5,
    text: "Dorayaki",
    price: 17000,
    type: "Dessert",
    gambar: dorayaki,
    isReady: true,
  },
  {
    id: 6,
    text: "Beef Borgar",
    price: 40000,
    gambar: beefBorgar,
    type: "Burger",
    isReady: true,
  },
  {
    id: 7,
    text: "Grilled Pork Borgar",
    price: 49000,
    gambar: porkBorgar,
    type: "Burger",
    isReady: true,
  },
  {
    id: 8,
    text: "Black Forest",
    price: 41000,
    gambar: cake,
    type: "Cake",
    isReady: true,
  },
];

const OrderList = (props) => {
  const existingOrder = order.find((order) => order.id === props.id);
  setBasketActive(true);
  handleClickScrollToBasket();
  if (existingOrder) {
    const updatedOrder = order.map((orderItem) =>
      orderItem.id === props.id
        ? { ...orderItem, quantity: orderItem.quantity + 1 }
        : orderItem
    );
    setOrder(updatedOrder);
  } else {
    const newOrder = foodMenu.find((item) => item.id === props.id);
    if (newOrder) {
      newOrder.quantity = 1;
      setOrder([...order, newOrder]);
    }
  }
};
