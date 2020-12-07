/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require('../Configs/db');

const histories = {};

histories.get = () => new Promise((resolve, reject) => {
  db.query(`
  SELECT 
  id_history,
  idproduct,
  name,
  price,
  cashier,
  ppn,
  totalprice,
  date
  FROM dbhistory
  INNER JOIN dbproduct ON dbhistory.idproduct = dbproduct.id
  ORDER BY id_history ASC 
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
  db.query(`INSERT INTO public.dbhistory ( cashier, ppn, totalprice, date, idproduct) 
  VALUES ('${data.cashier}', ${data.ppn}, ${data.totalprice}, '${data.date}', ${data.idproduct})
  
  `)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

histories.updateHistories = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE public.dbhistory 
  SET cashier = '${data.cashier}', ppn = ${data.ppn}, totalprice = ${data.totalprice}, date = '${data.date}', idproduct = ${data.idproduct} 
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
  db.query(`DELETE FROM public.dbhistory WHERE id = ${id_history} `)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = histories;
