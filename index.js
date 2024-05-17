function parseMessage(isiPesan = '') {
  let message =
    '/input\nDate @ 20/05/2021 16:30\nTime @ 19:16\nXAUUSD sell now @ 2367\nwarning\nOther limit @ 2339\ntp : 2351\ntp   @ 2332\ntp 2333\ntp4@2334\ntpp : 2021\n\nTp5_________________2555\n\nSL @ 2377.88\nSL2 @ 2388'

  let message1 =
    '/input\nXAUUSD sell now @ 2367\ntp : 2351\ntp2   @ 2332\ntp3 2333\ntp4@2334\nTp5_________________1.26761\n\nSL @ 2377.88'

  let message2 = '/input\nXAUUSD sell now @ 2367\ntp : 2354\ntp2 @ 2334\n\nSL @ 2377.88'

  // pisahkan berdasarkan karakter enter
  const splitted = message.split('\n') // [/input, XAUUSD sell now @ 2367, tp @ 2354, tp2 @ 2334, , SL @ 2377]

  const data = {
    cmd: '', // lom
    account: null, // lom
    status: 'Pending', // lom
    date: null,
    direction: null,
    isWarning: false,
    entry: null,
    entry2nd: null,
    tp: [],
    tpp: null,
    sl: null,
    sl2: null,
    redNews: false, // lom
    timeFrame: null, // lom
    note: '', // lom
    linkPic: null, // lom
    date: null,
    time: null,
  }

  // data["tp1"] = 55555;

  const regAngka = /\d+\.?\d*/
  const regSymbol = /[_@:-\s]+/
  const regSymbol2 = /[@:-\s]+/
  let jam = null
  let tgl = null

  splitted.forEach((el) => {
    const dataSplit2 = el.toUpperCase()
    // console.log(dataSplit2);

    const dataSplit = el.toUpperCase().replace(regSymbol, '@')
    const splitAtt = dataSplit.split('@')
    // console.log(splitAtt);

    // direction
    if (dataSplit.includes('SELL')) {
      data.direction = dataSplit.includes('LIMIT') ? 'SELL LIMIT' : 'SELL NOW'
      let dataEntry = dataSplit.match(regAngka)[0]
      data.entry = Number(dataEntry)
    } else if (dataSplit.includes('BUY')) {
      data.direction = dataSplit.includes('LIMIT') ? 'BUY LIMIT' : 'BUY NOW'
    }

    //entry2nd
    if (dataSplit.includes('OTHER') || dataSplit.includes('ENTRY2')) {
      const otherLimit = dataSplit.match(regAngka)[0]
      data.entry2nd = Number(otherLimit)
    }

    //warning
    if (dataSplit.includes('WARNING')) {
      data.isWarning = true
    }

    // TP and TPP
    if (dataSplit.includes('TP')) {
      if (dataSplit.includes('TPP')) {
        data.tpp = Number(splitAtt[1])
      } else {
        splitAtt.forEach((r) => {
          if (r.includes('TP')) {
          } else if (r.match(regAngka)) {
            data.tp.push(r)
          } else {
            console.log('Tidak ditemukan data TP')
          }
        })
      }
    }

    // SL
    if (dataSplit.includes('SL')) {
      const slprice = Number(splitAtt[1])
      dataSplit.includes('SL2') ? (data.sl2 = slprice) : (data.sl = slprice)
    }

    // Date
    dataSplit.includes('DATE') ? (tgl = splitAtt[1]) : null
    dataSplit.includes('TIME') ? (jam = splitAtt[1]) : null
    let date = getDateTime(parseDate(tgl, jam))
    data.date = date.split(' ')[0]
    data.time = date.split(' ')[1]
  })

  // jika data kosong
  const isEmpty = !data.entry && data.tp.length < 1 && !data.sl

  return isEmpty ? false : data
  // hasilnya : 	{kodeBarang=satyu, nama=siapa, resi=resi234, alamat=}
}

console.log(parseMessage())

//---------------------------------------------

function parseDate(date = null, time = null) {
  const dateInputMentah = 'Date @ 20/05/2024 15:30'
  const dateInput = '20/05/2022 15:30'

  let d = new Date()

  if (date) {
    const dateSplit = date.split(' ')
    let alldate = dateSplit[0].split('/')
    d.setDate(alldate[0])
    d.setMonth(alldate[1] - 1)
    alldate.length >= 3 ? d.setFullYear(alldate[2]) : null

    if (dateSplit.length > 1) {
      let allTime = dateSplit[1].split(':')
      d.setHours(allTime[0])
      d.setMinutes(allTime[1])
    }
  }

  if (time) {
    let allTime = time.split(':')
    d.setHours(allTime[0])
    d.setMinutes(allTime[1])
  }

  return d
}

//============================================
//
function getDateTime(date) {
  const d = new Date(date)
  // const d = d;
  let yyyy = d.getFullYear()
  let mm = d.getMonth() + 1 // month is zero-based
  let dd = d.getDate()
  let HH = d.getHours()
  let m = d.getMinutes()
  let getTime = d.getTime()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  const formatted = dd + '/' + mm + '/' + yyyy + ' ' + HH + ':' + m
  return formatted
}
