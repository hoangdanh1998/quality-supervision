import config from "config";
import path from "path";
const separator = path.sep;
export default function init() {
  
  return (() => {
    const convert = (current: any) => {
      const result: { [key: string]: any } = Array.isArray(current) ? [] : {};

      Object.keys(current).forEach((name) => {
        let value = current[name];

        if (typeof value === "object" && value !== null) {
          value = convert(value);
        }

        if (typeof value === "string") {
          if (value.indexOf("\\") === 0) {
            value = value.replace("\\", "");
          } else {
            if (process.env[value]) {
              value = process.env[value];
            }
            if (value.indexOf("./") === 0 || value.indexOf("../") === 0) {
              // Make relative paths absolute
              value = path.resolve(
                path.join(config.util.getEnv("NODE_CONFIG_DIR")),
                value.replace(/\//g, separator)
              );
            }
          }
        }

        result[name] = value;
      });
      return result;
    };

    const conf = convert(config);
	return conf;
  })();
}
