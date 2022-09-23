import ItemModel from '../models/ItemModel.js';

// Так сказать CR от CRUD :)

//Создание записи для таблицы
export const create = async (req, res) => {
  try {
    const doc = new ItemModel({
      name: req.body.name,
      amount: req.body.amount,
      distance: req.body.distance,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать записи',
    });
  }
};

// Получение всех записей
// Также прямо тут реализована фильтрация
// q - query
// c - column (name, amount, distance)
// l - logic (<, =, >)
export const getAllItems = async (req, res) => {
  try {
    const { q, c, l } = req.query;

    const Items = await ItemModel.find();
    const search = (data) => {
      return data.filter((item) => {
        if (c === 'name' || l === 'include') {
          return [c].some((key) =>
            item[key].toLowerCase().includes(q.toLowerCase())
          );
        } else {
          switch (l) {
            case 'less':
              return item[c] - q < 0;
            case 'equal':
              return item[c] == q;
            case 'greater':
              return item[c] - q > 0;
          }
        }
      });
    };

    q ? res.json(search(Items)) : res.json(Items);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить записи',
    });
  }
};
