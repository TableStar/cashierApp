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
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { SiWindows } from "react-icons/si";
import Navbar from "./Navbar/Navbar";


const LayoutPage = (props) => {
  return (
    <Flex flexDirection={"row"} justifyContent={"flex-start"}>
      <Navbar/>
      {props.children}
    </Flex>
  );
};

export default LayoutPage;
