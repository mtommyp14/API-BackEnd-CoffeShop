/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const db = require('../Configs/db');

const categories = {};

categories.get = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM public.dbcategory ORDER BY id_category ASC')
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({ msg: 'Data Kosong' });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

categories.addCategories = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO public.dbcategory(type) VALUES ('${data.type}')`)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

categories.updateCategories = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE public.dbcategory SET type='${data.type}' WHERE id= ${data.id} `)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

categories.deleteCategories = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM public.dbcategory WHERE id= ${id} `)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = categories;
