# data/

This directory holds the seed data files used by `scripts/seedProducts.js`.

## Required file

Place the mentor-provided product list here:

```
server/data/products.json
```

Expected JSON format (array of product objects):

```json
[
  {
    "categories": ["1"],
    "weight": 100,
    "title": {
      "ua": "Молоко",
      "ru": "Молоко"
    },
    "calories": 60
  }
]
```

Once the file is in place, run:

```bash
cd server
node scripts/seedProducts.js
```
