/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require('../Configs/db');

const histories = {};

histories.get = () => new Promise((resolve, reject) => {
  db.query(`
  SELECT 
  id_history,
  invoice, 
  namehis, 
  cashier, 
  ppn, 
  totalprice, 
  date
  FROM dbhistory
  `)
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({
          msg: 'Data Kosong',
        });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

histories.addHistories = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO public.dbhistory (invoice, namehis, cashier, ppn, totalprice, date) 
  VALUES ( ${data.invoice}, '${data.namehis}', '${data.cashier}', ${data.ppn}, ${data.totalprice}, '${data.date}')
  `)
    .then((res) => {
      console.log(res);
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

histories.updateHistories = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE public.dbhistory 
  SET invoice = ${data.invoice}, namehis = '${data.namehis}', cashier = '${data.cashier}', ppn = ${data.ppn}, totalprice = ${data.totalprice}, date = '${data.date}'
  WHERE id_history = ${data.id_history} 
  `)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

histories.deleteHistories = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM public.dbhistory WHERE id_history = ${id} `)
    .then((res) => {
      resolve(res.rows);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

module.exports = histories;
