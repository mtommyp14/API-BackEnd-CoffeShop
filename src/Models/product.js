const db = require('../Configs/db');

const products = {};

products.get = () => new Promise((resolve, reject) => {
  db.query(`SELECT id, idcategory, name, price, image, type
  FROM dbproduct
  INNER JOIN dbcategory ON dbproduct.idcategory = dbcategory.id_category
  ORDER BY id ASC`)
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
      resolve(`${data.name} Sudah di tambahkan`);
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
      resolve(res.rows);
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
    });
});

products.search = (name) => new Promise((resolve, reject) => {
  db.query(
    `
        SELECT dbproduct.id,
        dbproduct.name, 
        dbproduct.price, 
        dbproduct.image, 
        dbcategory.id_category,
        dbcategory.type
        FROM public.dbproduct 
        LEFT JOIN public.dbcategory 
        ON dbcategory.id_category = dbproduct.idcategory 
        WHERE dbproduct.name
          ILIKE '%${name}%'
      `,
  )
    .then((res) => {
      if (res.rows.length == 0) {
        resolve('tidak ada data di table product');
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = products;
