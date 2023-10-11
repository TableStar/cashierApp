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
  Spacer,
} from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

const CategoryButton = (props) => {
  return (
    <Card
      bg={"white"}
      _hover={{ color: "red" }}
      height={"130px"}
      width={"70px"}
      
    >
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
        color={"black"}
        
        _hover={{ color: "white", bg: "red", borderRadius: "6px", fontWeight:"bold" }}
      >
        <IconContext.Provider value={{ size: 30 }}>
          <IconButton
            aria-label={props.label}
            icon={props.icon}
            bg={"white"}
            _hover={{ color: "white", bg: "red", borderColor:"transparent"}}
            onClick={props.button}
          />
        </IconContext.Provider>
        <Text alignItems={"center"} width={"200%"} fontSize={"12px"}>
          
          {props.text}
        </Text>
      </CardBody>
    </Card>
  );
};

export default CategoryButton;
