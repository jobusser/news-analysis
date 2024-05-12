import React, { useState, useEffect } from "react";
import { useCountry } from "../context/countryProvider";

import NewsHeader from "./info/newsHeader";
import NewsOverview from "./info/newsOverview";

function News() {
  const { articles } = useCountry();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (articles) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [articles]);


  return (
    <>
      {isVisible && (
        <div>
          <NewsHeader />
          <NewsOverview />

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
      )}
    </>
  );


}

export default News;


