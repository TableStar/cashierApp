import {
  Flex,
  Input,
  Image,
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
import { useState } from "react";

const SearchDrop = (props) => {
  return (
    <Card
      bg={"white"}
      _hover={{
        color: "white",
        bg: "red",
      }}
      height={"80px"}
      width={"200px"}
      onClick={props.button}
      color={"black"}
    >
      <CardBody
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Image src={props.gambar} alt={props.text} boxSize="50px" borderRadius={"30px"}/>
        <Flex flexDirection={"column"} alignItems={"center"} fontSize={12}>
          <Text>{props.text}</Text>
          <Text>Rp. {props.price.toLocaleString("id-ID")}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default SearchDrop;
