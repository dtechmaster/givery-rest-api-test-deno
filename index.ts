// main.ts

interface Recipe {
  id: number;
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: string;
  created_at: string;
  updated_at: string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "チキンカレー",
    making_time: "45分",
    serves: "4人",
    ingredients: "玉ねぎ,肉,スパイス",
    cost: "1000",
    created_at: "2016-01-10 12:10:12",
    updated_at: "2016-01-10 12:10:12",
  },
  {
    id: 2,
    title: "オムライス",
    making_time: "30分",
    serves: "2人",
    ingredients: "玉ねぎ,卵,スパイス,醤油",
    cost: "700",
    created_at: "2016-01-11 13:10:12",
    updated_at: "2016-01-11 13:10:12",
  },
];

let nextId = 3;

const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });

const notFound = () =>
  new Response("Not Found", {
    status: 404,
  });

const now = () =>
  new Date()
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  //
  // POST /recipes
  //
  if (req.method === "POST" && pathname === "/recipes") {
    const body = await req.json().catch(() => ({}));

    const required = [
      "title",
      "making_time",
      "serves",
      "ingredients",
      "cost",
    ];

    const valid = required.every(
      (key) =>
        body[key] !== undefined &&
        body[key] !== null &&
        String(body[key]).trim() !== "",
    );

    if (!valid) {
      return json({
        message: "Recipe creation failed!",
        required: "title, making_time, serves, ingredients, cost",
      });
    }

    const timestamp = now();

    const recipe: Recipe = {
      id: nextId++,
      title: String(body.title),
      making_time: String(body.making_time),
      serves: String(body.serves),
      ingredients: String(body.ingredients),
      cost: String(body.cost),
      created_at: timestamp,
      updated_at: timestamp,
    };

    recipes.push(recipe);

    return json({
      message: "Recipe successfully created!",
      recipe: [recipe],
    });
  }

  //
  // GET /recipes
  //
  if (req.method === "GET" && pathname === "/recipes") {
    return json({
      recipes: recipes.map((r) => ({
        id: r.id,
        title: r.title,
        making_time: r.making_time,
        serves: r.serves,
        ingredients: r.ingredients,
        cost: r.cost,
      })),
    });
  }

  //
  // /recipes/:id
  //
  const match = pathname.match(/^\/recipes\/(\d+)$/);

  if (!match) {
    return notFound();
  }

  const id = Number(match[1]);
  const recipe = recipes.find((r) => r.id === id);

  //
  // GET /recipes/:id
  //
  if (req.method === "GET") {
    if (!recipe) {
      return json({
        message: "No Recipe found",
      });
    }

    return json({
      message: "Recipe details by id",
      recipe: [
        {
          id: recipe.id,
          title: recipe.title,
          making_time: recipe.making_time,
          serves: recipe.serves,
          ingredients: recipe.ingredients,
          cost: recipe.cost,
        },
      ],
    });
  }

  //
  // PATCH /recipes/:id
  //
  if (req.method === "PATCH") {
    if (!recipe) {
      return json({
        message: "No Recipe found",
      });
    }

    const body = await req.json().catch(() => ({}));

    if (body.title !== undefined) {
      recipe.title = String(body.title);
    }

    if (body.making_time !== undefined) {
      recipe.making_time = String(body.making_time);
    }

    if (body.serves !== undefined) {
      recipe.serves = String(body.serves);
    }

    if (body.ingredients !== undefined) {
      recipe.ingredients = String(body.ingredients);
    }

    if (body.cost !== undefined) {
      recipe.cost = String(body.cost);
    }

    recipe.updated_at = now();

    return json({
      message: "Recipe successfully updated!",
      recipe: [
        {
          title: recipe.title,
          making_time: recipe.making_time,
          serves: recipe.serves,
          ingredients: recipe.ingredients,
          cost: recipe.cost,
        },
      ],
    });
  }

  //
  // DELETE /recipes/:id
  //
  if (req.method === "DELETE") {
    const index = recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return json({
        message: "No Recipe found",
      });
    }

    recipes.splice(index, 1);

    return json({
      message: "Recipe successfully removed!",
    });
  }

  return notFound();
});