/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require('../Configs/db');

const products = {};

products.get = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM public.dbproduct ORDER BY id ASC')
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

products.addProduct = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO public.dbproduct(name, price, image, idcategory) VALUES ('${data.name}' , ${data.price}, '${data.image}', ${data.idcategory})`)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

products.updateProduct = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE public.dbproduct SET name='${data.name}', price= ${data.price}, image= '${data.image}', idcategory = ${data.idcategory} WHERE id= ${data.id} `)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

products.deleteProduct = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM public.dbproduct WHERE id= ${id} `)
    .then((res) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

products.addFind = (orderby = '', sort = 'ASC') => new Promise((resolve, reject) => {
  db.query(`SELECT id,
  idcategory,
  name,
  type,
  price,
  image
  FROM dbproduct
  INNER JOIN dbcategory ON idcategory = id_category
  ORDER BY ${orderby} ${sort}
  `)
    .then((res) => {
      resolve(res.rows);
    })
    .catch((err) => {
      reject(err);
      // console.log(err);
    });
});

module.exports = products;
