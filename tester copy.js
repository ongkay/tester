function parseMessage(isiPesan = "") {
  let message =
    "/input\nDate @ 20/05/2021 16:30\nTime @ 19:16\nXAUUSD sell now @ 2367\nwarning\nOther limit @ 2339\ntp : 2351\ntp   @ 2332\ntp 2333\ntp4@2334\ntpp : 2021\n\nTp5_________________2555\n\nSL @ 2377.88\nSL2 @ 2388";

  let message1 =
    "/input\nXAUUSD sell now @ 2367\ntp : 2351\ntp2   @ 2332\ntp3 2333\ntp4@2334\nTp5_________________1.26761\n\nSL @ 2377.88";

  let message2 =
    "/input\nXAUUSD sell now @ 2367\ntp : 2354\ntp2 @ 2334\n\nSL @ 2377.88";

  // pisahkan berdasarkan karakter enter
  const splitted = message.split("\n"); // [/input, XAUUSD sell now @ 2367, tp @ 2354, tp2 @ 2334, , SL @ 2377]

  const data = {
    account: null,
    status: "Pending",
    date: null,
    direction: null,
    isWarning: false,
    entry: null,
    entry2nd: null,
    tp1: null,
    tp2: null,
    tp3: null,
    tp4: null,
    tp5: null,
    tp6: null,
    tpp: null,
    sl: null,
    sl2: null,
    redNews: false,
    timeFrame: null,
    note: "",
    date: null,
    time: null,
  };

  // data["tp1"] = 55555;

  const regAngka = /\d+\.?\d*/;
  const regSymbol = /[_@:-\s]+/;
  const regSymbol2 = /[@:-\s]+/;
  const allTpPrice = [];
  const allTpName = [];
  let jam = null;
  let tgl = null;

  splitted.forEach((el) => {
    const dataSplit2 = el.toUpperCase();
    // console.log(dataSplit2);

    const dataSplit = el.toUpperCase().replace(regSymbol, "@");
    const splitAtt = dataSplit.split("@");
    console.log(splitAtt);

    // console.log(dataSplit);

    // direction
    if (dataSplit.includes("SELL")) {
      data.direction = dataSplit.includes("LIMIT") ? "SELL LIMIT" : "SELL NOW";
      console.log(dataSplit);
      let dataEntry = dataSplit.match(regAngka)[0];
      data.entry = Number(dataEntry);
    } else if (dataSplit.includes("BUY")) {
      data.direction = dataSplit.includes("LIMIT") ? "BUY LIMIT" : "BUY NOW";
    }

    //entry2nd
    if (dataSplit.includes("OTHER") || dataSplit.includes("ENTRY2")) {
      const otherLimit = dataSplit.match(regAngka)[0];
      data.entry2nd = Number(otherLimit);
    }

    //warning
    if (dataSplit.includes("WARNING")) {
      data.isWarning = true;
    }

    // TP and TPP
    if (dataSplit.includes("TP")) {
      if (dataSplit.includes("TPP")) {
        data.tpp = Number(splitAtt[1]);
      } else {
        splitAtt.forEach((r) => {
          if (r.includes("TP")) {
            allTpName.push(r);
          } else if (r.match(regAngka)) {
            allTpPrice.push(r);
          } else {
            console.log("Tidak ditemukan data TP");
          }
        });
      }
    }

    // SL
    if (dataSplit.includes("SL")) {
      const slprice = Number(splitAtt[1]);
      dataSplit.includes("SL2") ? (data.sl2 = slprice) : (data.sl = slprice);
    }

    // Date
    dataSplit.includes("DATE") ? (tgl = splitAtt[1]) : null;
    dataSplit.includes("TIME") ? (jam = splitAtt[1]) : null;
    let date = getDateTime(parseDate(tgl, jam));
    data.date = date.split(" ")[0];
    data.time = date.split(" ")[1];
    console.log(date);

    // //Jam
    // if (dataSplit.includes("TIME")) {
    //   let date = getDateTime(parseDate(null, splitAtt[1]));
    //   data.date = date.split(" ")[0];
    //   data.time = date.split(" ")[1];
    //   console.log(date);
    // }
  });

  // add to data
  allTpPrice.map((item) => {
    let price = Number(item);
    !data.tp1
      ? (data.tp1 = price)
      : !data.tp2
      ? (data.tp2 = price)
      : !data.tp3
      ? (data.tp3 = price)
      : !data.tp4
      ? (data.tp4 = price)
      : !data.tp5
      ? (data.tp5 = price)
      : !data.tp6
      ? (data.tp6 = price)
      : null;
  });

  // jika data kosong
  const isEmpty = data.entry === "" && data.tp1 === "" && data.sl === "";

  return isEmpty ? false : data;
  // hasilnya : 	{kodeBarang=satyu, nama=siapa, resi=resi234, alamat=}
}

console.log(parseMessage());

//---------------------------------------------

function parseDate(date = null, time = null) {
  const dateInputMentah = "Date @ 20/05/2024 15:30";
  const dateInput = "20/05/2022 15:30";

  let d = new Date();

  if (date) {
    const dateSplit = date.split(" ");
    let alldate = dateSplit[0].split("/");
    console.log(alldate);
    d.setDate(alldate[0]);
    d.setMonth(alldate[1] - 1);
    alldate.length >= 3 ? d.setFullYear(alldate[2]) : null;

    console.log(d.getFullYear());

    if (dateSplit.length > 1) {
      let allTime = dateSplit[1].split(":");
      d.setHours(allTime[0]);
      d.setMinutes(allTime[1]);
    }
  }

  if (time) {
    let allTime = time.split(":");
    d.setHours(allTime[0]);
    d.setMinutes(allTime[1]);
  }

  console.log(d);

  return d;
}
// console.log(parseDate("21/08/2021"));
// console.log(parseDate("21/08/2021", "19:30"));
// console.log(parseDate("21/08", "19:30"));
// console.log(parseDate(null, "19:30"));

//============================================
//
function getDateTime(date) {
  const d = new Date(date);
  // const d = d;
  let yyyy = d.getFullYear();
  let mm = d.getMonth() + 1; // month is zero-based
  let dd = d.getDate();
  let HH = d.getHours();
  let m = d.getMinutes();
  let mili = d.getTime();
  console.log(mili);

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formatted = dd + "/" + mm + "/" + yyyy + " " + HH + ":" + m;
  return formatted;
}

console.log(getDateTime(1395430135200)); // 20/03/2015
// console.log(getDateTime(parseDate("21/08/2021"))); // 21/08/2021 10:18
// console.log(getDateTime(parseDate(null, "19:30"))); // 15/05/2024/ 19:30
