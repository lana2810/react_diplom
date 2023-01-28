export default function validateForm({ phone, address }) {
  const errors = {};
  if (phone === "") {
    errors.phone = "Необходимо заполнить поле телефон";
  }
  if (address === "") {
    errors.address = "Необходимо заполнить поле адреса";
  }
  if (phone !== "") {
    const telWithoutSpace = phone.trim().match(/\S/g).join("");
    // "+7(000)000-00-00" pattern tel
    const regexpTel = /\+?[0-9]?\(?[0-9]{3}\)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}/g;
    const tmp = regexpTel.test(telWithoutSpace);
    if (!tmp) {
      errors.phone = "Некорректное значение телефона";
    }
  }
  return errors;
}
