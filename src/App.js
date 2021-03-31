import { useState, useEffect } from "react";
import styled from "styled-components";

function App() {
  const emailValidation = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u; // Регулярное выражение для валидации почты
  const [formIsValid, setFormIsValid] = useState(false); // Флаг, говорящий о том, что форма валидна и можно отправлять
  const [canClear, setCanClear] = useState(false); // Флаг, говорящий о том, что в форме есть введенные поля и можно очистить их
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Проверка формы на валидность, все ли заполнено и верно ли заполнено
    if (
      emailValidation.test(form.email) &&
      form.name.length &&
      form.message.length
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
    // Проверка формы на наличие символов в инпутах
    if (form.email.length || form.name.length || form.message.length) {
      setCanClear(true);
    } else {
      setCanClear(false);
    }
  }, [form]);

  // Считывание данных с полей и запись в form
  function formHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  // Очистка инпутов
  function clearForm() {
    setForm({
      name: "",
      email: "",
      message: "",
    });
  }
  // Отправка формы с последующем отчищением инпутов
  function sendForm(event) {
    event.preventDefault();
    console.log(form);
    clearForm();
  }

  return (
    <Wrapper>
      <Form onSubmit={sendForm}>
        <Title>Отправить сообщение</Title>
        <SubTitle>Анонимные сообщения рассматриваются</SubTitle>
        <FormFieldset>
          <FormItem className="form__item">
            <FormInput
              type="text"
              required
              id="name"
              name="name"
              placeholder="Имя"
              onChange={formHandler}
              value={form.name}
              className="form__input"
            />
            <FormLabel htmlFor="name" className="form__label">
              Имя
            </FormLabel>
          </FormItem>
          <FormItem className="form__item">
            <FormInput
              type="email"
              required
              id="email"
              name="email"
              placeholder="Email"
              onChange={formHandler}
              value={form.email}
              className="form__input"
            />
            <FormLabel htmlFor="email" className="form__label">
              Email
            </FormLabel>
          </FormItem>
          <FormItem className="form__item">
            <FormInput
              type="text"
              required
              id="message"
              name="message"
              placeholder="Сообщение"
              onChange={formHandler}
              value={form.message}
              className="form__input"
            />
            <FormLabel htmlFor="message" className="form__label">
              Сообщение
            </FormLabel>
          </FormItem>
        </FormFieldset>
        <FormButtonsFiels>
          <FormButton
            type="button"
            onClick={clearForm}
            disabled={canClear ? false : true}
            className="clear"
          >
            Очистить
          </FormButton>
          <FormButton disabled={formIsValid ? false : true}>
            Отправить
          </FormButton>
        </FormButtonsFiels>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  font-family: "ProBa Light";
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  max-width: 600px;
  padding: 30px;
`;
const Title = styled.h1`
  font-size: 26px;
  line-height: 31px;
  color: #333333;
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;
const SubTitle = styled.p`
  font-size: 13px;
  line-height: 16px;
  color: #8f8f8f;
  margin-top: 5px;
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;
const FormFieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 500px) {
    margin-top: 20px;
  }
`;
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  margin-top: 30px;
  position: relative;
  &:last-child {
    width: 100%;
  }
  &.form__item .form__input:placeholder-shown + .form__label {
    opacity: 0;
    transform: translateY(-4px);
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 20px;
  }
`;
const FormLabel = styled.label`
  font-size: 13px;
  line-height: 16px;
  color: #8f8f8f;
  transform: translateY(-10px);
  opacity: 1;
  position: absolute;
  transition: 0.3s;
`;
const FormInput = styled.input`
  border: none;
  border-bottom: 1px solid #e2e2e2;
  padding: 5px 0;
  font-size: 18px;
  outline: none;
  font-family: "ProBa Light";
  transition: 0.3s;
  &:focus {
    border-bottom: 1px solid #4285f4;
  }
`;

const FormButtonsFiels = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 38px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

const FormButton = styled.button`
  font-family: "ProBa Light";
  font-size: 16px;
  padding: 15px 65px;
  margin: 10px;
  cursor: pointer;
  background-color: #4285f4;
  outline: none;
  color: white;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background-color: #3874d7;
  }
  &:disabled {
    color: #fafafa;
    opacity: 0.7;
    cursor: default;
    &:hover {
      background-color: #4285f4;
    }
  }
  &.clear {
    background-color: #e0e0e0;
    color: #262626;

    &:hover {
      background-color: #e9e9e9;
    }
    &:disabled {
      &:hover {
        background-color: #e0e0e0;
      }
    }
    @media screen and (max-width: 500px) {
      background-color: transparent;
    }
  }
  @media screen and (max-width: 500px) {
    margin: 5px 0;
  }
`;

export default App;
