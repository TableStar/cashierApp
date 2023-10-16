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
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { SiWindows } from "react-icons/si";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box>
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
                <Flex flexDirection={"column"} alignItems={"center"} gap={"2"}>
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
              onClick={() => {
                navigate("/manage/menu");
              }}
            >
              <Flex flexDirection={"column"} alignItems={"center"} gap={"2"}>
                <IconContext.Provider value={{ size: 20 }}>
                  <SiWindows />
                </IconContext.Provider>
                <Text fontSize={"12px"}>Manage</Text>
              </Flex>
            </Button>
            <Button
              colorScheme="white"
              height={"50px"}
              width={"50px"}
              color={"black"}
              _hover={{ color: "red", border: "white" }}
              onClick={() => {
                navigate("/manage/account");
              }}
            >
              <Flex flexDirection={"column"} alignItems={"center"} gap={"2"}>
                <IconContext.Provider value={{ size: 30 }}>
                  <SiWindows />
                </IconContext.Provider>
                <Text fontSize={"10px"}>Manage Account</Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Flex id="spaceBehindNavbar" height={"800px"} width={"70px"}></Flex>
    </Box>
  );
};
export default Navbar;
