import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
import { getExchangeRate } from "./store/exchangeRate";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExchangeRate());
  }, [dispatch]);
  const data = useSelector((state) => state.rate);
  console.log(data)
  const currencyEl_one = document.getElementById("currency-one");
  const amountEl_one = document.getElementById("amount-one");
  const currencyEl_two = document.getElementById("currency-two");
  const amountEl_two = document.getElementById("amount-two");

  const onSelectOne = () => {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    if (currency_one === "UAH") {
      return (amountEl_one.value = (
        parseFloat(amountEl_two.value) * data[currency_two]
      ).toFixed(2));
    }
    const rate = data[currency_two] / data[currency_one];
    amountEl_one.value = (
      parseFloat(amountEl_two.value) * rate
    ).toFixed(2);
  };
  const onSelectTwo = () => {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    if (currency_two === "UAH") {
      return (amountEl_two.value = (
        parseFloat(amountEl_one.value) * data[currency_one]
      ).toFixed(2));
    }
    const rate = data[currency_one] / data[currency_two];
    amountEl_two.value = (
      parseFloat(amountEl_one.value) * rate
    ).toFixed(2);
  };
  return (
    <>
      <Header />
      <div className="main">
        <div className="formFirst">
          <div className="input">
            <input
              id="amount-one"
              autoFocus
              type="number"
              onInput={onSelectTwo}
              placeholder="Введіть число"
            />
          </div>
          <div className="select">
            <select id="currency-one" onClick={onSelectOne}>
              <option value="EUR">EUR</option>
              <option value="UAH" selected>
                UAH
              </option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <div className="formSecond">
          <div className="style.input">
            <input
              id="amount-two"
              autoFocus
              type="number"
              onInput={onSelectOne}
              placeholder="Введіть число"
            />
          </div>
          <div className="select">
            <select id="currency-two" onClick={onSelectTwo}>
              <option value="EUR">EUR</option>
              <option value="UAH" selected>
                UAH
              </option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
