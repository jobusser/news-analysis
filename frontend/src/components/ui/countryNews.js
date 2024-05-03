import React, { useState, useEffect } from "react";
import { useCountry } from "../context/countryProvider";

function CountryNews() {
  const [isVisible, setIsVisible] = useState(true);
  const { selectedCountry } = useCountry();

  const [countryName, setCountryName] = useState("");
  const [countryISO, setCountryISO] = useState("");


  useEffect(() => {
    if (selectedCountry !== null) {
      setIsVisible(true);
      setCountryName(selectedCountry.name);
      setCountryISO(selectedCountry.iso_a2);

    } else {
      setIsVisible(false);
    }

  }, [selectedCountry]
  );


  if (!isVisible) return null;

  return (
    <div>
      <h2> {countryName} </h2>
      <h3> {countryISO} </h3>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        <br />
        <br />
        Interdum velit laoreet id donec ultrices. Dui vivamus arcu felis bibendum ut.
        Gravida cum sociis natoque penatibus et magnis dis parturient montes.
        Amet porttitor eget dolor morbi non. Neque sodales ut etiam sit amet nisl purus.
        Amet purus gravida quis blandit turpis cursus in hac. Enim neque volutpat ac tincidunt vitae.
        Dolor magna eget est lorem ipsum dolor sit.
        <br />
        <br />
        Velit aliquet sagittis id consectetur purus ut.
        Congue mauris rhoncus aenean vel elit scelerisque.
        Venenatis a condimentum vitae sapien.
        Pharetra magna ac placerat vestibulum lectus mauris ultrices.
        Porttitor massa id neque aliquam vestibulum morbi blandit cursus risus.
        Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.
      </p>
    </div>
  );
}

export default CountryNews;
