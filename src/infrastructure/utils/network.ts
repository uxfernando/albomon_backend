import os from "os";

export const getNetworkIp = (): string | null => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const ifaceList = interfaces[name];
    if (ifaceList) {
      for (const iface of ifaceList) {
        const { family, address, internal } = iface;
        if (family === "IPv4" && !internal) {
          return address;
        }
      }
    }
  }
  return null;
};