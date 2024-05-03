import React, { useEffect, useState } from "react";
import { useCountry } from "../context/countryProvider";

function IntroText() {
  const fullText = "Select a country to start";
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const { selectedCountry } = useCountry();


  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;

      const interval = setInterval(() => {
        setText(fullText.substring(0, i));
        i++;

        if (i === fullText.length + 1) clearInterval(interval);

      }, 50);

    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (selectedCountry !== null) {
      setIsVisible(false);
    }
  }, [selectedCountry]
  );

  if (!isVisible) return null;

  return (
    <h1>
      {text}
    </h1>
  );


}

export default IntroText;
