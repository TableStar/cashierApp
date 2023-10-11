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

const BasketDrop = (props) => {
  return (
    <Card
      bg={"white"}
      _hover={{
        color: "white",
        bg: "red",
      }}
      height={"100px"}
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
        <Image src={props.gambar} alt={props.text} boxSize="40px" borderRadius={"30px"}/>
        <Flex flexDirection={"column"} alignItems={"center"} fontSize={12}>
          <Text>{props.text}</Text>
          <Text>Rp. {(`${props.price}`*`${props.quantity}`).toLocaleString("id-ID")}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default BasketDrop
