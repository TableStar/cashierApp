import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  ButtonGroup,
  Stack,
  HStack,
  VStack,
  Text,
  Grid,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { PhoneIcon, AddIcon, WarningIcon, Search2Icon } from "@chakra-ui/icons";
import DateTime from "../components/DateTime/DateTime";
import { IconContext } from "react-icons/lib";
import { AiOutlineHome } from "react-icons/ai";
import CategoryButton from "../components/CategoryButton/CategoryButton";
import { GoFlame } from "react-icons/go";
import { BiDrink } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { SiWindows } from "react-icons/si";
import { LuCakeSlice } from "react-icons/lu";
import { HiOutlineCake } from "react-icons/hi";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineMinusSquare } from "react-icons/ai";
import MenuCards from "../components/MenuCards/MenuCards";
import SearchDrop from "../components/SearchDrop/SearchDrop";
import hotplate from "../assets/hotplate.jpg";
import soup from "./assets/soup.jpg";
import BasketDrop from "../components/BasketDrop/BasketDrop";
import martini from "./assets/martini.jpg";
import fries from "./assets/fries.jpg";
import dorayaki from "./assets/dorayaki.jpg";
import beefBorgar from "./assets/beef-borgar.jpg";
import porkBorgar from "./assets/pork-borgar.jpg";
import cake from "./assets/cake.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { basketAction } from "../redux/action/basketAction";

const Dash = () => {
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState([]);
  const [basketActive, setBasketActive] = useState(false);
  const dispatch = useDispatch();
  const refBasket = useRef(null);

  const handleClickScrollToBasket = () => {
    refBasket.current?.scrollIntoView({ behavior: "smooth" });
  };
  const account = useSelector((state) => {
    return state.accountReducer;
  });
  const basketGlobalState = useSelector((state) => state.basketReducer);

  const displayName = () => {
    if (account.username && account.username.toLowerCase().includes("admin")) {
      return <Text>Welcome,Lord Ruler {account.username}</Text>;
    } else if (account.username) {
      return <Text>Welcome, Cashier {account.username}</Text>;
    }
  };
  const categoryButtonProps = [
    {
      label: "button1",
      icon: <GoFlame />,
      text: "Hot",
    },
    {
      label: "button2",
      icon: <BiDrink />,
      text: "Drink",
    },
    {
      label: "button3",
      icon: <MdFastfood />,
      text: "Snack",
    },
    {
      label: "button4",
      icon: <LuCakeSlice />,
      text: "Dessert",
    },
    {
      label: "button5",
      icon: <HiOutlineCake />,
      text: "Cake",
    },
    {
      label: "button6",
      icon: <FaHamburger />,
      text: "Burger",
    },
  ];
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

  const filterFood = foodMenu.filter((data) => {
    return data.type === selectedCategory;
  });

  const searchFood = foodMenu.filter((data) => {
    return data.text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const onHandleCategory = (props) => {
    if (selectedCategory == props) {
      return setSelectedCategory(false);
    } else {
      setSelectedCategory(props);
    }
  };
  const OrderList = (data) => {
    /*const existingOrder = order.find((order) => order.id === props.id);
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
    }*/
    const idx = basketGlobalState.findIndex((val) => {
      return val.id === data.id;
    });
    console.log(basketGlobalState);

    const temp = [...basketGlobalState];
    setBasketActive(true);
    if (idx < 0) {
      temp.push({ ...data, quantity: 1 });
    } else {
      temp[idx] = { ...temp[idx], quantity: temp[idx].quantity + 1 };
    }
    dispatch(basketAction(temp));
    console.log(dispatch(basketAction(temp)));
  };

  const onHandleDeleteOrder = (props) => {
    const existingOrder = basketGlobalState.find(
      (orderItem) => orderItem.id === props.id
    );

    if (basketGlobalState.length <= 1 && existingOrder.quantity <= 1) {
      setBasketActive(false);
    }
    if (existingOrder) {
      const idx = basketGlobalState.findIndex(
        (orderItem) => orderItem.id === props.id
      );

      if (existingOrder.quantity > 1) {
        const updatedOrder = basketGlobalState.map((orderItem) =>
          orderItem.id === props.id
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        );
        dispatch(basketAction(updatedOrder));
      } else {
        // If quantity is 1, remove the item from the order
        const updatedOrder = [...basketGlobalState];
        updatedOrder.splice(idx, 1);
        dispatch(basketAction(updatedOrder));
      }
    }
  };
  const sumBasket = () => {
    let sum = 0;
    for (let i = 0; i < basketGlobalState.length; i++) {
      sum += basketGlobalState[i].price * basketGlobalState[i].quantity;
    }
    return sum;
  };
  return (
    <div>
      <Flex flexDirection={"row"} justifyContent={"flex-start"}>
        <Box position={"fixed"} zIndex={"100"}>
          <Flex
            flexDirection={"column"}
            id="navbar"
            bg={"white"}
            padding={"8px"}
            height={"800px"}
            width={"70px"}
          >
            <Flex flexDirection="column" gap={"4"}>
              <Link to={"/"}>
                <Button
                  colorScheme="white"
                  height={"50px"}
                  width={"50px"}
                  color={"black"}
                  _hover={{ color: "red", border: "white" }}
                >
                  <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={"2"}
                  >
                    <IconContext.Provider value={{ size: 20 }}>
                      <AiOutlineHome />
                    </IconContext.Provider>
                    <Text fontSize={"12px"}>Home</Text>
                  </Flex>
                </Button>
              </Link>
              <Button
                colorScheme="white"
                height={"50px"}
                width={"50px"}
                color={"black"}
                _hover={{ color: "red", border: "white" }}
                _active={"none"}
                _focus={"none"}
              >
                <Flex flexDirection={"column"} alignItems={"center"} gap={"2"}>
                  <IconContext.Provider value={{ size: 20 }}>
                    <SiWindows />
                  </IconContext.Provider>
                  <Text fontSize={"12px"}>Manage</Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Flex id="spaceBehindNavbar" height={"800px"} width={"70px"}></Flex>
        <Flex id="row02" flexDirection={"row"} gap={"6"} ref={refBasket}>
          <Flex
            flexDirection={"column"}
            gap={"8"}
            bg={"gray.300"}
            width={`${basketActive ? `680px` : `880px`}`}
          >
            <Box>{displayName()}</Box>
            <div id="section1">
              <Flex
                padding={"10px"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={`${basketActive ? `20` : `180`}`}
              >
                <Flex gap={"2"}>
                  <Text fontSize={"2xl"} fontWeight={"bolder"}>
                    Order
                  </Text>
                  <Text fontSize={"2xl"}>Menu</Text>
                </Flex>

                <DateTime></DateTime>

                <InputGroup display={"flex"}>
                  <InputLeftElement
                    boxSize={8}
                    style={{
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    }}
                    pointerEvents="none"
                    bg={"white"}
                  >
                    <Search2Icon color="red" />
                  </InputLeftElement>
                  <Input
                    type="search"
                    placeholder="Search your menu"
                    size={"sm"}
                    width={"200px"}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    style={{ borderRadius: "20px", borderColor: "white" }}
                  />
                  <Flex
                    position={"absolute"}
                    flexDirection={"column"}
                    zIndex={"sticky"}
                    top={"32px"}
                    bg={"white"}
                  >
                    {searchTerm && searchFood.length > 0 ? (
                      searchFood.map((val, idx) => (
                        <SearchDrop key={idx} {...val} />
                      ))
                    ) : (
                      <p></p>
                    )}
                  </Flex>
                </InputGroup>
              </Flex>
              <div>
                <Flex></Flex>
              </div>
            </div>
            <div id="section2">
              <Flex padding={"20px"} gap={"3"}>
                {categoryButtonProps.map((val, idx) => (
                  <CategoryButton
                    button={() => {
                      onHandleCategory(val.text);
                    }}
                    key={idx}
                    {...val}
                  />
                ))}
              </Flex>
            </div>
            <Stack
              id="section3"
              display={"flex"}
              flexDirection={"row"}
              gap={`${basketActive ? `3` : `10`}`}
              padding={"10px"}
              justifyContent={"flex-start"}
              flexWrap={"wrap"}
              zIndex={"base"}
              width={`${basketActive ? `500px` : `650px`}`}
            >
              {selectedCategory
                ? filterFood.map((val, idx) => (
                    <MenuCards
                      button={() => {
                        OrderList(val);
                        handleClickScrollToBasket();
                      }}
                      key={idx}
                      basketActive={basketActive}
                      {...val}
                    />
                  ))
                : foodMenu.map((val, idx) => (
                    <MenuCards
                      button={() => {
                        OrderList(val);
                        handleClickScrollToBasket();
                      }}
                      key={idx}
                      basketActive={basketActive}
                      {...val}
                    />
                  ))}
            </Stack>
          </Flex>
          {basketActive ? (
            <Flex flexDirection={"column"} bg={"white"} width={"200px"}>
              <h1>Order List</h1>

              <Flex
                flexDirection={"column"}
                padding={"10px"}
                minHeight={"70vh"}
              >
                {basketGlobalState.map((val, idx) => (
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
          ) : (
            <div></div>
          )}
        </Flex>
      </Flex>
    </div>
  );
};
export default Dash;
