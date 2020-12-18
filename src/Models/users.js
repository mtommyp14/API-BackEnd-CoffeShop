const db = require('../Configs/db');

class Users {
  async add(data) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO public.dbusers (email, "password", name, role) VALUES ('${data.email}', '${data.password}', '${data.name}', '${data.role}' )`)
        .then((res) => {
          if (res.rows.length == 0) {
            resolve(data);
          } else {
            resolve(`${data.name} Sudah di tambahkan`);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getAllData(data) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM public.dbusers ORDER BY id_user ASC')
        .then((res) => {
          if (res.rows.length == 0) {
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
  }

  async getDataByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.dbusers WHERE email='${email}'`)
        .then((res) => {
          resolve(res.rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = new Users();
