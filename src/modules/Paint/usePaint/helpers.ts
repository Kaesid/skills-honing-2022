const getCanvasParamsValues = (canvas: HTMLCanvasElement | null) => {
  const params = canvas ? { width: canvas.clientWidth, height: canvas.clientHeight } : { width: 0, height: 0 };
  return params;
};

export { getCanvasParamsValues };
