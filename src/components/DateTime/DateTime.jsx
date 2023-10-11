import { useState, useEffect } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import "./DateTime.css";

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div id="dateTime">
      <p> {date.toLocaleDateString("id-ID")}</p>

      <p> {date.toLocaleTimeString("id-ID")}</p>
    </div>
  );
};

export default DateTime;
