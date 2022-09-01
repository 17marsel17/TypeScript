export const error = (req: any, res: any) => {
  res.status(404);
  res.json({
    error: "Страница не найдена",
    status: 404,
  });
};
