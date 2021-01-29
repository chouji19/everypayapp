
  export const formatDate = (date) => {
    const d = new Date(date);
    let datepay =
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds());
    return datepay;
  };

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  export const formatDateNoTime = (date) => {
    const d = new Date(date);
    let datepay =
      d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    return datepay;
  };

