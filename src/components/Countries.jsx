import { Box, Input, Button, useToast, Heading } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Country from "./Country";
import Loader from "./Loader";
import Error from "./Error";

const Countries = () => {
  const [currency, setCurrency] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [countryflagcode,setCountryflagcode] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();
  const intervalIdRef = useRef(null)
  const handleSearchCountryByCurrency = async (currency) => {
    setLoading(true);
    try {
      let res = await fetch(
        `https://restcountries.com/v3.1/currency/${currency}`
      );
      let data = await res.json();
     
      setCountryData(data);


      const flagCodeRes = await fetch(`https://flagcdn.com/en/codes.json`)
      const flagcodeData = await flagCodeRes.json();

      setLoading(false);
      setError(false);
      setCountryflagcode(flagcodeData)


    } catch (error) {
      //   console.log(error);
      setError(true);
      setLoading(false);
      setCountryData([]);
    }
  };

  console.log(countryflagcode)
  console.log(countryData)
  // const handleDebounce = (val) => {
  //   clearTimeout(intervalIdRef.current);
  //   intervalIdRef.current = setTimeout(() => {
  //     handleSearchCountryByCurrency(val);
  //     console.log(currency);
  //     console.log(countryData);
  //   }, 1000);
  // };

  const handleChange = (e) => {
    const { value } = e.target;
    setCurrency(value);
    // handleDebounce(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currency) {
      return toast({
        title: "Please Enter currency",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    handleSearchCountryByCurrency(currency);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Box>
      <Heading color={"rgb(51, 105, 30)"}>CountrifyExplorer</Heading>
      <Box>
        <form onSubmit={handleSubmit}>
          <Input
            bg="rgb(178, 223, 219)"
            _hover={"none"}
            type="text"
            onChange={(e) => handleChange(e)}
            value={currency}
            w="70%"
            mt="40px"
            variant={"none"}
            placeholder="Search By Currency"
          />
          <Button type="submit" display={"none"}></Button>
        </form>
      </Box>
      {error ? (
        <Error />
      ) : countryData.length !== 0 ? (
        <Country countryData={countryData} countryflagcode={countryflagcode}/>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Countries;
