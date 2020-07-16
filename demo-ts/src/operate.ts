type Data = {
  data?: {
    name: string;
    age: number;
  };
};

const data: Data = {
  data: {
    name: "hy",
    age: 100,
  },
};
console.log(data.data?.name);
console.log(data.data!.name);
