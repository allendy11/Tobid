const info = (namespace: string, message: string) => {
  console.info(`[INFO] [${namespace}] ${message}`);
};
const error = (namespace: string, message: string, error?: object) => {
  if (error) {
    console.info(`[ERROR] [${namespace}] ${message}`);
    console.error(error);
  } else {
    console.info(`[ERROR] [${namespace}] ${message} `);
  }
};
const end = (namespace: string, message: string) => {
  console.info(`[END] [${namespace}] ${message}`);
};
export default {
  info,
  error,
  end,
};
