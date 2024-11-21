const ports = JSON.parse(process.env.PORTS!);

export const getPort = (name: string) => {
  return ports[name];
};