import {
  Flex,
  Image,
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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/action/accountAction";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataGlobal = useSelector((state) => state.accountReducer);
  const onLogin = () => {
    //localStorage.setItem("dataLogin",JSON.stringify({ username: inUsername, password: inPassword },("")));
    //dispatch(loginAction({ username: inUsername, password: inPassword }));
    axios
      .get(
        `http://localhost:2021/account?username=${inUsername}&password=${inPassword}`
      )
      .then((response) => {
        console.log("check user", response.data);
        if (!response.data.length) {
          alert("account Not Found");
        } else {
          localStorage.setItem("dataLogin", JSON.stringify(response.data[0]));
          dispatch(loginAction(response.data[0]))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (dataGlobal.username && dataGlobal.password) {
      navigate("/dash");
    }
  }, [dataGlobal]);

  return (
    <div id="login">
      <Flex
        flexDirection={"column"}
        minWidth={"500px"}
        minHeight={"300px"}
        justifyContent={"center"}
        style={{ boxShadow: "0px 0px 2px 2px black" }}
        borderRadius={"20px"}
        padding={"10px"}
        alignContent={"center"}
        alignItems={"center"}
        gap={"6"}
      >
        <Text fontSize={30} fontWeight={"bold"}>
          Welcome to Our Restaurant
        </Text>
        <Text fontSize={20} fontWeight={"bold"}>
          abandon hope all ye who enter here
        </Text>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setInUsername(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => {
              setInPassword(e.target.value);
            }}
          />
        </FormControl>

        <Button
          _hover={{ bg: "red", color: "white" }}
          width={"200px"}
          onClick={onLogin}
        >
          LOGIN
        </Button>
      </Flex>
    </div>
  );
}
export default Home;
